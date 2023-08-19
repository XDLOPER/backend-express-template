import mongoose from 'mongoose'

const databaseConnect = ()=>{

          mongoose.connect(process.env.MONGOURL,{
               useNewUrlParser: true,
               useUnifiedTopology:true
          }).then(
              ()=>{
                    console.log('database successfully connected')
              }
          ).catch((error)=>{
               console.log(error);
          })
     
}

export default databaseConnect