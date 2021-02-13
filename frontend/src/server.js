import express from 'express'
import http from 'http'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: '../' })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.get('/api/test', (req, res) => {
        res.json({ hello: 'world' })
    })

    server.get('*', handle)

    http.createServer(server).listen(process.env.PORT || 3000, () => {
        console.log(`listening on port ${process.env.port || 3000}`)
    })
})