import bodyParser from 'body-parser'
import session from 'express-session'
import SequelizeSessionStore from 'connect-session-sequelize'
import cookieParser from 'cookie-parser'

import config from '../modules/config.js'
import Database from '../models/index.js'

const { sequelize } = Database

export function decodeURLBodies() {
    return bodyParser.urlencoded({
        extended: false
    })
}

export function addConfigToLocals() {
    return (req, res, next) => {
        res.locals.config = config
        next()
    }
}

export function parseCookies() {
    return cookieParser()
}

export function parseSessions() {
    const SequelizeStore = SequelizeSessionStore(session.Store)

    const store = new SequelizeStore({
        db: sequelize
    })

    // store.sync()

    return session({
        store,
        secret: config.cookie.secret,
        cookie: {
            maxAge: 4 * 7 * 24 * 60 * 60 * 1000 // 28 days
        },
        resave: false,
        saveUninitialized: false
    })
}