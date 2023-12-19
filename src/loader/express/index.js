
import express from 'express';
import cors from 'cors'
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser'

import * as _ from '../../utils/contants/index.js'
import router from '../../api/routes/index.js'

export default function expressLoader(instance){
    // bazı özel hata mesajlarını yakalayıp işlem yapıyoruz
        process.on('uncaughtException', async (error) => {
            console.log(error);
            //logger('00001', '', error.message, 'Uncaught Exception', '');
        });
        
        process.on('unhandledRejection', async (error) => {
            console.log(error);
            //logger('00002', '', ex.message, 'Unhandled Rejection', '');
        });
    //

    //instance.use(express.static(path.resolve('src/static/public')))
    instance.enable('trust proxy');
    instance.use(cors())
    instance.use(bodyParser.json({ limit: '30mb', extended: true }))
    instance.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
    
    // app security and optimation configrations
    instance.use(morgan('dev')); // konsola loglama yapmaya yarar
    instance.use(helmet()); // güvenlik sağlar bazı https istekelrine karşı
    instance.use(compression()); // verileri sıkıştırır

    // app main page view folder initialization
    instance.use(express.static('src/api/static/public'));  

    //app.use(rateLimiter);

    // app route configuration => add api prefix to routes
    instance.use('/' + _.prefix + '/', router)
    
}