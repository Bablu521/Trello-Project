import mongoose from "mongoose"

const connectDB = ()=>{
   return mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("DB CONNECTED")
}).catch((error)=>{
    console.log("Failed to connect" , error)
})}

export default connectDB