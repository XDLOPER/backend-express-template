import express from 'express'

import {controllerUsers} from '../../controllers/get/auth-users.js'

import {controllerLogin} from '../../controllers/post/auth-login.js'
import {controllerRegister} from '../../controllers/post/auth-register.js'

import authVerifyMiddleware from '../../middlewares/auth.js'

const router = express.Router()

// get
router.get('/users',controllerUsers)
router.get('/auth-verify',authVerifyMiddleware, function(req, res){
     res.json({
          message:req.userID
     }).status(200)
})

// post
router.post('/login', controllerLogin)
router.post('/register', controllerRegister)

export default router