import PassportGithub from 'passport-github'
import passport from 'passport'
import config from './config.js'
import database from '../models/index.js'

const { User } = database
const { Strategy: GitHubStrategy } = PassportGithub

export function setupPassport() {
    passport.serializeUser((user, cb) => {
        cb(null, user)
    })

    passport.deserializeUser((obj, cb) => {
        cb(null, obj)
    })

    passport.use(passportGithubStrategySetup())
}

export function initializePassport() {
    return passport.initialize()
}

export function passportSession() {
    return passport.session()
}

export function passportGithubStrategySetup() {
    return new GitHubStrategy({
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: "http://127.0.0.1:8080/auth/github/callback"
    },
        async function (accessToken, refreshToken, profile, cb) {
            const { id, username } = profile

            const [user, created] = await User.findOrCreate({
                where: { id },
                defaults: { username }
            })

            cb(null, user.toJSON())
        }
    )
}

export function passportGithubStrategyAuthenticate() {
    return passport.authenticate('github')
}

export function passportGithubStrategyAuthenticateCallback() {
    return passport.authenticate('github', { failureRedirect: '/login' })
}