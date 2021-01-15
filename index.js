import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import multer from 'multer'
import contentDisposition from 'content-disposition'
import sendRanges from 'send-ranges'
import fs from 'fs'
import fetch from 'node-fetch'
import hjson from 'hjson'
import FormData from 'form-data'

import database from './models/index.js'

const { Item } = database
const config = hjson.parse(fs.readFileSync('./config.hjson', { encoding: 'utf-8' }))

const app = express()

const alphabet = '23456789abcdefghijkmnpqrstuvwxyz'
async function createShort(options = {}) {
    while (true) {
        let short = ''

        for (let i = 0; i < options.length; i++) {
            short += alphabet[Math.floor(Math.random() * Math.floor(alphabet.length))]
        }

        if (await Item.findOne({ where: { short } })) {
            continue
        }

        return short
    }
}

async function main() {
    await database.sequelize.sync({ alter: true })

    const singleUpload = multer({
        limits: {
            fileSize: config.limits.maxSize
        },
        storage: multer.diskStorage({
            destination: 'store/items/',
            filename: (req, file, cb) => {
                cb(null, uuidv4())
            }
        }),
        fileFilter: (req, file, cb) => {
            console.log(file)

            const extension = file.originalname.split('.').pop()

            for (let banned of config.limits.bannedExtensions) {
                if (banned.toLowerCase() === extension.toLowerCase()) {
                    return cb(undefined, false)
                }
            }

            for (let banned of config.limits.bannedMimeTypes) {
                if (banned.toLowerCase() === file.mimetype.toLowerCase()) {
                    return cb(undefined, false)
                }
            }

            cb(undefined, true)
        }
    }).single('upload')

    app.post('/upload', singleUpload, async (req, res) => {
        if (!req.file) {
            return res.status(415).send("Invalid file.")
        }

        const short = await createShort({ length: 4 })

        const item = await Item.create({
            short,
            name: req.file.originalname,
            mime: req.file.mimetype,
            size: req.file.size,
            store: req.file.path
        })

        res.json({ short })

        if (req.file.size < 32 * 1000 * 1000 && config.virustotal.enable) {
            const formData = new FormData()
            formData.append('file', fs.createReadStream(req.file.path))

            const virusResponse = await fetch('https://www.virustotal.com/api/v3/files', {
                method: 'POST',
                headers: {
                    'x-apikey': config.virustotal.key,
                    'content-length': req.file.size
                },
                body: formData
            })
                .then(res => res.json())

            item.virusTotalID = virusResponse.data.id
            await item.save()
        }
    })

    function retrieveFile(req) {
        const item = req.item

        return {
            getStream: range => fs.createReadStream(item.store, range),
            type: item.mime,
            size: item.size
        }
    }

    app.get('/:short', async (req, res, next) => {
        const item = await Item.findOne({ where: { short: req.params.short } })

        if (!item) {
            return res.status(404).send("File not found")
        }

        if (item.virus) {
            return res.send("This file was detected as a virus and removed.")
        }

        res.set('Content-Disposition', contentDisposition(item.name, { type: 'inline' }))
        res.set('Content-Type', item.mime)
        res.set('Cache-Control', 'public, max-age=604800, immutable')

        if (config.virustotal.enable && item.virusTotalID && item.virus === null) {
            const virusResponse = await fetch(`https://www.virustotal.com/api/v3/analyses/${item.virusTotalID}`, {
                headers: {
                    'x-apikey': config.virustotal.key,
                },
            })
                .then(res => res.json())

            if (virusResponse.data.attributes.status === 'completed') {
                if (virusResponse.data.attributes.stats.suspicious + virusResponse.data.attributes.malicious > 3) {
                    item.virus = true
                } else {
                    item.virus = false
                }
                await item.save()
            }
        }

        req.item = item

        next()
    }, sendRanges(retrieveFile), (req, res) => {
        const item = req.item

        res.set('Content-Length', item.size)
        res.set('Accept-Ranges', 'bytes')
        res.writeHead(200)

        fs.createReadStream(item.store).pipe(res)
    })

    app.listen(8080, () => console.log('listening on port 8080'))
}

main()