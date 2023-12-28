// project dependencies
import express from 'express'

// app dependencies
import projectLoader from '../loader/index.js'
import * as _ from '../utils/contants/index.js'

const X_SERVER_START = () => {
    const app = express()

    // app loaders initialization
        projectLoader(app)
    //

    app.listen(_.port, (error) => {
        if(error){
            console.log('listen error : ' + error);
            process.exit(1)
        }
        console.log(`Server Opened Port: ${_.port}`)
    })
}

export default X_SERVER_START