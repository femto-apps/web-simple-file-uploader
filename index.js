import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import multer from 'multer'
import contentDisposition from 'content-disposition'
import sendRanges from 'send-ranges'
import fs from 'fs'
import http from 'http'
import next from 'next'

import database from './models/index.js'

import { createAvailableShort } from './modules/short.js'
import { scanFromStream, isFileVirus } from './modules/scan.js'
import { decodeURLBodies, parseSessions, parseCookies, addConfigToLocals } from './routes/middleware.js'
import config from './modules/config.js'
import { getIndex, logout } from './routes/admin.js'
import { createItem, itemFromShort } from './modules/item.js'
import { passportGithubStrategyAuthenticate, passportGithubStrategyAuthenticateCallback, setupPassport, initializePassport, passportSession } from './modules/passport.js'

const { Item, User } = database

const server = express()
server.set('view engine', 'pug')
server.use(express.static('public'))

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './frontend' })
const handle = app.getRequestHandler()

async function main() {
    // await database.sequelize.sync({ alter: true })
    await app.prepare()

    const router = express.Router()

    setupPassport()

    router.use(decodeURLBodies())
    router.use(addConfigToLocals())
    router.use(parseCookies())
    router.use(parseSessions())
    router.use(initializePassport())
    router.use(passportSession())

    // router.get('/', getIndex)

    router.get('/auth/github', passportGithubStrategyAuthenticate())
    router.get('/auth/github/callback', passportGithubStrategyAuthenticateCallback(), (req, res) => {
        res.cookie('user', req.user.username, { expires: req.session.cookie._expires })
        res.redirect('/')
    })
    router.get('/logout', logout)

    // server.use(['/auth/github', '/auth/github/callback', '/logout'], router)
    server.use((req, res, next) => {
        if (!req.originalUrl.startsWith('/_next')) {
            router(req, res, next)
        } else {
            next()
        }
    })

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

    server.post('/upload', singleUpload, async (req, res) => {
        if (!req.file) {
            return res.status(415).send("Invalid file.")
        }

        let user = {}
        if (req.body.apikey) {
            user = await User.findOne({ where: { apikey: req.body.apikey } })

            if (!user) {
                return res.status(401).send("Invalid API Key")
            }
        }

        const short = await createAvailableShort()

        const item = await createItem({
            short,
            name: req.file.originalname,
            mime: req.file.mimetype,
            size: req.file.size,
            store: req.file.path,
            userId: user && user.id
        })

        res.json({ short })

        if (req.file.size < 32 * 1000 * 1000 && config.virustotal.enable) {
            const scanResults = await scanFromStream({
                fileStream: fs.createReadStream(req.file.path),
                size: req.file.size,
                apiKey: config.virustotal.key
            })

            item.virusTotalID = scanResults.data.id
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

    // server.get('/:short', async (req, res, next) => {
    //     const { short } = req.params
    //     const item = await itemFromShort({ short })

    //     if (!item) {
    //         return res.status(404).send("File not found")
    //     }

    //     if (item.virus) {
    //         return res.send("This file was detected as a virus and removed.")
    //     }

    //     res.set('Content-Disposition', contentDisposition(item.name, { type: 'inline' }))
    //     res.set('Content-Type', item.mime)
    //     res.set('Cache-Control', 'public, max-age=604800, immutable')

    //     if (config.virustotal.enable && item.virusTotalID && item.virus === null) {
    //         const { complete, suspicious } = await isFileVirus({
    //             virusTotalID: item.virusTotalID,
    //             apiKey: config.virustotal.key
    //         })

    //         if (complete) {
    //             item.virus = suspicious
    //             await item.save()
    //         }
    //     }

    //     req.item = item

    //     next()
    // }, sendRanges(retrieveFile), (req, res) => {
    //     const item = req.item

    //     res.set('Content-Length', item.size)
    //     res.set('Accept-Ranges', 'bytes')
    //     res.writeHead(200)

    //     fs.createReadStream(item.store).pipe(res)
    // })

    server.get('*', handle)

    http.createServer(server).listen(8080, () => {
        console.log('listening on port 8080')
    })
}

main()