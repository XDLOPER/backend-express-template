import { fileURLToPath } from 'url';
import express from 'express'
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router()

router.get('/', function(req, res){
     res.sendFile(path.resolve(__dirname,'../static/public/index.html'))
})

export default router