import userModel from "../DB/models/user.model.js";
import { asyncHandler } from "../utilis/errorHandling.js";
import jwt from "jsonwebtoken"

export const auth = asyncHandler(async(req,res,next)=>{
    const {authorization} = req.headers
    if (!authorization?.startsWith(process.env.BEARER_KEY)){
        return next(new Error("authorization is required or In-Valid Bearer Key",{cause:404}))
    }
    const token = authorization.split(process.env.BEARER_KEY)[1]
    const decoded = jwt.verify(token , process.env.LOGIN_SIGNATURE)
    if (!decoded?.id){
        return next(new Error("In Valid Token Payload"),{cause:400})
    }
    const user = await userModel.findById(decoded.id)
    if (!user.isOnline|| user.isDeleted){
        return next(new Error("Please Log In",{cause:403}))
    }
    req.user = user
    return next()
})