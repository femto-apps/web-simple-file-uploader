import sequelize from 'sequelize'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
const { DataTypes } = sequelize;

export default (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        apikey: {
            type: DataTypes.STRING,
            unqiue: true,
            allowNull: false,
            defaultValue: () => {
                return uuidv4()
            }
        }
    })

    return User;
}