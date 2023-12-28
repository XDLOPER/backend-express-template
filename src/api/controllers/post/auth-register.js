
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import uniqid from 'uniqid';

import AuthScheme from '../../models/auth.js'
import {checkSpecialRegexControl} from '../../../utils/helpers/regexControl.js' 
import {xPrefix,xSuffix,secretKey} from '../../../utils/contants/index.js'

const message = {
     main:"Bişeyler ters gitti. ",
     0:"Bilgiler Eksik.",
     1:"Yanlış Format Tespit Edildi.",
     2:"Bu Kullanıcı Zaten Bulunuyor.",
     3:"Bu Email Geçerli Değil Lütfen Gerçek Bir Email Girin"
}

export const controllerRegister = async (req,res) => {
    try {
          const { name , surname , date , username , password , email , contract} = req.body
          if(name === undefined || surname === undefined || date === undefined || username === undefined || email === undefined || password === undefined || contract === undefined){
                  return res.status(400).json({message:message['0']})
          }

          const user =  await AuthScheme.findOne(
               {
                       $or: [
                               { username: username },  
                               { email: email }         
                             ]
               }
          )

          // data spesific controls

               if(user){
                    return res.status(400).json({message:message['2']})
               }

               if(!checkSpecialRegexControl(name,/^[a-zA-ZçğıiöşüĞİÖŞÜÇ]+(\s[a-zA-ZçğıiöşüĞİÖŞÜÇ]+)?$/) || !checkSpecialRegexControl(surname,/^[a-zA-ZçğıiöşüĞİÖŞÜÇ]+[a-zA-ZçğıiöşüĞİÖŞÜÇ]*$/)){
                    return res.status(400).json({message:message['1']})
               }

               if(!date.day || !date.moon || !date.year){
                    return res.status(400).json({message:message['1']})
               }

               if(!checkSpecialUsernameAndEmailCharacters([username,email])){
                    //console.log(checkSpecialCharacters([username,email])
                    return res.status(400).json({message:message['1']})
               }

               if(username.length < 2 || password.length < 6 || password.length > 30){
                    return res.status(200).json({message:message['1']})
               }
               
               if(!checkSpecialRegexControl(email,/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
                    return res.status(400).json({message:message['3']})
               }

               if(!contract.infoCheck1 || !contract.infoCheck1 || !contract.infoCheck1){
                    return res.status(400).json({message:message['1']})
               }

          //

          const ID = uniqid(xPrefix + "-" , "-" + xSuffix)
          const passwordHash = await bcrypt.hash(password,10)
          const userCreate = await AuthScheme.create({ID,...req.body,password:passwordHash})
          const token = jwt.sign({ID:userCreate.ID},secretKey,{expiresIn:'1h'})

          res.status(201).json({
               status:'OK',
               message:userCreate,
               token
          }).end()
  
       } catch (error) {
          res.status(500).json({
               status:'ERROR',
               message:message.main + " " + error.message
          }).end()
       }
}

function checkSpecialUsernameAndEmailCharacters(arr) {
     const regex = /^(?=(?:[^.]*\.){0,3}[^.]*$)(?=(?:[^-]*-){0,3}[^-]*$)(?=(?:[^_]*_){0,3}[^_]*$)(?=(?:[^@]*@){0,3}[^@]*$)[a-zA-Z0-9._@-]+$/;
     return arr.some(element => element && regex.test(element));
}

