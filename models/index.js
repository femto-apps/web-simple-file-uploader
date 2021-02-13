"use strict";
import Sequelize from 'sequelize';

import initItem from './item.js'
import initUser from './user.js'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'store/sqlite/database.sqlite'
});

const models = {
    Item: initItem(sequelize),
    User: initUser(sequelize),
}

models.Item.belongsTo(models.User)
models.User.hasMany(models.Item)

export default {
    sequelize,
    Sequelize,
    ...models
}