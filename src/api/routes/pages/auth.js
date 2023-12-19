import express from 'express'

import {register,login} from '../../controllers/auth.js'
import authVerifyMiddleware from '../../middlewares/auth.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.get('/auth-verify',authVerifyMiddleware, function(req, res){
     res.json({
          message:req.userID
     }).status(200)
})
export default router