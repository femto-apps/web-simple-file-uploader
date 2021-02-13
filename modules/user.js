import database from '../models/index.js'

const { User } = database

export function getUserByUsername({ username }) {
    return User.findOne({ where: { username } })
}