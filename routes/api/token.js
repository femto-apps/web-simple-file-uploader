import database from '../../models/index.js'
import { v4 as uuidv4 } from 'uuid'

const { User } = database

export function getToken(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'user not logged in' })
    }

    return res.json({ data: { token: req.user.apikey } })
}

export async function resetToken(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'user not logged in' })
    }

    const key = uuidv4()

    await User.update({
        apikey: key
    }, {
        where: {
            id: req.user.id
        }
    })

    return res.json({
        data: {
            apikey: key
        }
    })
}