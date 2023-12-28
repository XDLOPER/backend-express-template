import express from 'express'

// pages import
import authRoute from './urls/auth.js'

const router = express.Router()

router.use((req, res, next) => { // => CORS için özel bir konfigrasyon tam anlayamadım
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
     res.header('Content-Security-Policy-Report-Only', 'default-src: https:');
     if (req.method === 'OPTIONS') {
          res.header('Access-Control-Allow-Methods', 'PUT POST PATCH DELETE GET');
          return res.status(200).json({});
     }
     next();
});

router.get('/', function(req, res){ // => api main route 'localhost:1000/'
     return res.status(200).json({
          message: {
            en: 'Project is successfully working...',
            tr: 'Proje başarılı bir şekilde çalışıyor...'
          },
          code: '00004'
        }).end();
});

// define the routes 
     router.use('/auth/',authRoute)
//
// router private error handlers
     router.use((_req, _res, next) => { // sadece alttaki middleware için bir ara katman aslında kodu bölmek için silinerek kod küçültülebilir bence
          const error = new Error('Endpoint could not find!');
          error.status = 404;
          next(error);
     });
 
     router.use((error, req, res, _next) => {
          res.status(error.status || 500);
          let resultCode = '00015';
          let level = 'External Error';
          if (error.status === 500) {
               resultCode = '00013';
               level = 'Server Error';
          } else if (error.status === 404) {
               resultCode = '00014';
               level = 'Client Error';
          }
          //logger(resultCode, req?.user?._id ?? '', error.message, level, req);
          return res.json({
               message: {
                    en: 'Error: ' + level,
                    tr: 'Hata:' + level
                  },
               code: resultCode,
          }).end();
     });
// 

export default router