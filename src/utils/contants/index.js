import dotenv from 'dotenv'

dotenv.config('../../.env')

const {APPNAME,PORT,API_PREFIX,MONGOURL,SECRET_KEY} = process.env

export const appName = APPNAME
export const port = PORT || 10000
export const prefix = API_PREFIX
export const mongoUrl = MONGOURL
export const secretKey = SECRET_KEY
