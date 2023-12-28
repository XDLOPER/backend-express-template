import mongoose from 'mongoose'
import muv from 'mongoose-unique-validator'

const dateSchema = new mongoose.Schema({
     day: Number,
     moon: String,
     year: Number
});

const contractSchema = new mongoose.Schema({
     infoCheck1: Boolean,
     infoCheck2: Boolean,
     infoCheck3: Boolean
});

const AuthScheme  = new mongoose.Schema({
     // this private area => ID,entry,...
     ID:{
          type:String,
          required:true,
          trim:true,
          unique:true
     },
     entry:{
          type:Date,
          default:new Date()
     },
     //

     name:{
          type:String,
          required:true,
          trim:true
     },
     surname:{
          type:String,
          required:false,
          trim:true
     },
     date: {
          type: dateSchema,
          required: true,
          trim:true
     },
     gender:{
          type:String,
          required:true,
          trim:true
     },
     username:{
          type:String,
          required:true,
          trim:true,
          unique:true
     },
     email:{
          type:String,
          required:false, // burası sonradan değişecek true olacak
          trim:true,
          unique:true
     },
     password:{
          type:String || Number,
          required:true,
          trim:true
     },
     contract:{
          type:contractSchema,
          required:true,
          trim:true
     }
})

AuthScheme.plugin(muv) // ID kabul etmiyordu plugin ile çözüldü

export default mongoose.model('users',AuthScheme) 