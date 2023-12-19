// project dependencies
import express from 'express'

// app dependencies
import loader from '../loader/index.js'
import * as _ from '../utils/contants/index.js'

const X_APP_START = () => {
    const app = express()

    // app loaders initialization
        loader(app)
    //

    app.listen(_.port, (err) => {
        if(err){console.log(err); process.exit(1)}
        console.log(`Server Opened Port: ${_.port}`)
    })
}

export default X_APP_START