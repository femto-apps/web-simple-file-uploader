"use strict";
import Sequelize from 'sequelize';

import initItem from './item.js'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'store/sqlite/database.sqlite'
});

const models = {
    Item: initItem(sequelize)
}

export default {
    sequelize,
    Sequelize,
    ...models
}