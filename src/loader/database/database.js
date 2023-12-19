import mongoose from 'mongoose'

const databaseConnect = (MONGO_URL)=>{

          mongoose.connect(MONGO_URL,{
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