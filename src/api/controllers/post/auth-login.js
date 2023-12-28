import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import AuthScheme from '../../models/auth.js'
import {secretKey} from '../../../utils/contants/index.js'

export const controllerLogin = async (req,res) => {
    try {
        let time = new Date().getTime()

        const { username,email,password } = req.body
        
        if((username === undefined && email === undefined) || password === undefined){
                return res.status(400).json({
                    status:'ERROR',
                    message:'bilgiler eksik.',
                    time:'0'
                })
        }

        const user = await AuthScheme.findOne(
                {
                        $or: [
                                { username: username },  
                                { email: email }         
                              ]
                }
            )

        if(!user){
                return res.status(400).json({
                    status:'ERROR',
                    message:'böyle bir kullanıcı bulunmuyor',
                    time:'0'
                })
        }

        if(!(await bcrypt.compare(password,user.password))){
            return res.status(400).send({
                status:'ERROR',
                message:'şifreler uyuşmuyor',
                time:'0'
            })   
        }

        const token = jwt.sign({id:user._id},secretKey,{expiresIn:'1h'})
        
        res.status(200).json({
            status:'OK',
            message:user,
            token,
            time:'0'
        }).end()
    } catch (error) {
        res.status(500).json({
            status:'ERROR',
            message:error.message,
            time:'0'
        })
    }
}
