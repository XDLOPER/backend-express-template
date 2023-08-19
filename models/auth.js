import mongoose from 'mongoose'

const AuthScheme  = new mongoose.Schema({
     username:{
          type:String,
          required:true,
          trim:true
     },
     email:{
          type:String,
          required:true,
          unique:true
     },
     password:{
          type:String || Number,
          required:true,
          trim:true
     },
     date:{
          type:Date,
          default:new Date()
     }
})

export default mongoose.model('Auth',AuthScheme) 