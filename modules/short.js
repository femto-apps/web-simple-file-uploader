import database from '../models/index.js'

const { Item } = database

const alphabet = '23456789abcdefghijkmnpqrstuvwxyz'

export function createRandomShort({ length = 4 }) {
    let short = ''

    for (let i = 0; i < length; i++) {
        short += alphabet[Math.floor(Math.random() * Math.floor(alphabet.length))]
    }

    return short
}

export async function createAvailableShort() {
    while (true) {
        const short = createRandomShort({ length: 4 })

        if (await Item.findOne({ where: { short } })) {
            continue
        }

        return short
    }
}