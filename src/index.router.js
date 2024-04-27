import connectDB from '../DB/connection.js'
import { globalErrorHandling } from '../utilis/errorHandling.js'
import authRouter from './modules/auth/auth.router.js'
import userRouter from "./modules/user/user.router.js"
import taskRouter from "./modules/task/task.router.js"
import cors from "cors"

const bootstrap = (app,express)=>{
    app.use(cors())
    app.use(express.json())
    connectDB()
    app.get("/" , (req,res,next)=>{
        res.json({message:"Welcome Trello Project"})
    })
    app.use('/auth' , authRouter)
    app.use('/user' , userRouter)
    app.use('/task' , taskRouter)
    app.use('*',(req,res,next)=>{
        return res.json("IN VALID ROUTING")
    })
    app.use(globalErrorHandling)
}

export default bootstrap