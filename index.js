// app depends
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

// page and private depends
import routerMain from './routes/index.js'
import routerAuth from './routes/auth.js'
import dbConnect from './config/database.js'

// app necessary functions or instances
dotenv.config('./')
dbConnect()

// app variables and inheritenses
const PORT = process.env.PORT || 3000
const app = express()

// app middlewares
app.use(cors())
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))

// app routers
app.use('/',routerMain)
app.use('/auth',routerAuth)

app.listen(PORT, () => {
     console.log(`Example app listening on port  ${PORT}`)
})