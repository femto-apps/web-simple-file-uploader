import hjson from 'hjson'
import fs from 'fs'

let config
export default config = hjson.parse(fs.readFileSync('./config.hjson', { encoding: 'utf-8' }))