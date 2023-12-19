import * as constants from '../utils/contants/index.js'

import databaseConnect from "./database/database.js"
import expressLoader from "./express/index.js"

export default async (expressInstance) => {
    databaseConnect(constants.mongoUrl) // şuan asenkron işliyor ilerde sorun çıkarabilir
    expressInstance ? expressLoader(expressInstance) : null // express ayarlarını config ediyor
}