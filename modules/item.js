import database from '../models/index.js'

const { Item } = database

export async function createItem({ short, name, mime, size, store, user }) {
    return Item.create({
        short,
        name,
        mime,
        size,
        store,
        userId: user && user.id
    })
}

export function itemFromShort({ short }) {
    return Item.findOne({ where: { short } })
}