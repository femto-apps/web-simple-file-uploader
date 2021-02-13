import database from './models/index.js'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { v4 as uuidv4 } from 'uuid'

const { Item, User } = database

yargs(hideBin(process.argv))
    .command('user [operation]', 'manage users', () => { }, async argv => {
        switch (argv.operation) {
            case 'add':
                await User.create({
                    username: argv.username,
                    password: argv.password,
                    apikey: uuidv4()
                })
                break
            case 'get':
                const user = await User.findOne({
                    where: { username: argv.username }
                })

                console.log(user.toJSON())
                break
            default:
                console.log('Operation not found, select one of [add, get]')
        }
    })
    .demandCommand(1)
    .argv