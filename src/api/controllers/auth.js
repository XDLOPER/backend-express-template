import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import {isValidEmail} from '../../utils/helpers/index.js' 
import AuthScheme from '../../models/auth.js'

export const register = async (req,res) => {
        try {
                const { username , password , email } = req.body

                if(username === undefined || email === undefined || password === undefined){
                        return res.status(400).json({message:'bilgiler eksik.'})
                }
      
                const user =  await AuthScheme.findOne(
                        {
                                $or: [
                                        { username: username },  
                                        { email: email }         
                                      ]
                        }
                )
                
                if(user){
                     return res.status(400).json({ message:'böyle bir kullanıcı zaten var' }) 
                }
                if(password.length < 6){
                     res.status(400).json({message:'şifreniz altı karakterden küçük olamaz'})
                }
                
                const passwordHash = await bcrypt.hash(password,10)
      
                if(!isValidEmail(email)){
                     return res.status(400).json({message:'bu email geçerli değil lütfen gerçek bir email girin'})
                }
      
                const userCreate = await AuthScheme.create({username,email,password:passwordHash})
      
                const token = jwt.sign({id:userCreate._id},process.env.SECRET_KEY,{expiresIn:'1h'})
                res.status(201).json({
                     status:'OK',
                     message:userCreate,
                     token
                })
      
           } catch (error) {
                res.status(500).json({message:error.message + ' ' + 'Bişeyler ters gitti. '})
           }
}

export const login = async (req,res) => {
        try {
                const { username,email,password } = req.body

                if((username === undefined && email === undefined) || password === undefined){
                        return res.status(400).json({message:'bilgiler eksik.'})
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
                        return res.status(400).json({message:'böyle bir kullanıcı bulunmuyor'})
                }
                if(!(await bcrypt.compare(password,user.password))){
                      return res.status(400).send({message:'şifreler uyuşmuyor'})   
                }

                const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'1h'})

        res.status(200).json({
                status:'OK',
                message:user,
                token
        })
        } catch (error) {
                res.status(500).send({message:error.message + " " + 'Birşeyler ters gitti. '})
        }
}
