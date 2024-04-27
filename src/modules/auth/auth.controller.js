import userModel from './../../../DB/models/user.model.js';
import { asyncHandler } from './../../../utilis/errorHandling.js';
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"




//signup
export const signup = asyncHandler(async(req,res,next)=>{
    const {userName , email , password , cpassword , age , gender , phone} = req.body;
    const checkUser = await userModel.findOne({email})
    if(checkUser) return next(new Error("Email Already Exist" , {cause:409}))
    if (password != cpassword) {
        return next(new Error("Password miss match" , {cause:400}))
    }
    const hashPassword = bcrypt.hashSync(password , parseInt(process.env.SALTROUND))
const user = await userModel.create({userName , email , password:hashPassword , age , gender , phone})
return res.status(201).json({Message : 'Done' , user})
})

//login
export const login = asyncHandler(async(req,res,next)=>{
    const {email , password}=req.body
    const user = await userModel.findOne({email})
    if(!user){
        return next(new Error("Email Not Exist" , {cause:404}))
    }
    const checkPassword = bcrypt.compareSync (password , user.password)
    if(!checkPassword){
        return next(new Error("In Correct Password" , {cause:400}))
    }
    const loggedUser = await userModel.findByIdAndUpdate({_id:user._id},
       {isOnline:true,isDeleted:false},
       {new:true}
    )
    const token = jwt.sign({id:user._id , email:user.email},
         process.env.LOGIN_SIGNATURE,
        {expiresIn:60*60})
    return res.status(200).json({message:"Done", user , token})
})