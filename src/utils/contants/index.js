import dotenv from 'dotenv'

dotenv.config('../../.env')

const {SERVER_NAME,SERVER_PREFIX,SERVER_SUFFIX,PORT,API_PREFIX,MONGOURL,SECRET_KEY} = process.env

export const x = SERVER_NAME
export const xPrefix = SERVER_PREFIX
export const xSuffix = SERVER_SUFFIX
export const port = PORT || 10000
export const prefix = API_PREFIX
export const mongoUrl = MONGOURL
export const secretKey = SECRET_KEY
