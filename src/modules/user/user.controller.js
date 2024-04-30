import userModel from "../../../DB/models/user.model.js"
import { asyncHandler } from "../../../utilis/errorHandling.js"
import bcrypt from "bcryptjs"

//getUsers
export const getUsers = asyncHandler(async(req,res,next)=>{
    const users = await userModel.find()
    return res.json({message:'DONE',users})
})

//changePassword
export const changePassword = asyncHandler(async(req,res,next)=>{
    const {_id} = req.user._id
    const {currentPassword , newPassword , cNewPassword } = req.body
    if (newPassword != cNewPassword){
        return next(new Error("Mis Match Password" ,{cause:400}))
    }
    const checkPassword = bcrypt.compareSync(currentPassword , req.user.password)
    console.log(checkPassword)
    if (!checkPassword){
        return next(new Error("Wrong Password",{cause:400}))
    }
    const hashPassword = bcrypt.hashSync(newPassword , parseInt(process.env.SALTROUND))
    const updatedPassword = await userModel.findByIdAndUpdate({_id},{password:hashPassword},{new:true})
    return res.status(200).json({message:"Done",updatedPassword})
})


//updateUser
export const updateUser = asyncHandler(async(req,res,next)=>{
    const {age , phone} = req.body
    const user = await userModel.findByIdAndUpdate({_id:req.user._id},{age,phone},{new:true})
    return res.status(200).json({message:"Done" , user})
})


//deleteUser
export const deleteUser = asyncHandler(async(req,res,next)=>{
    const user = await userModel.findByIdAndDelete({_id:req.user._id})
    return res.status(200).json({message:"Done" , user})
})


//softDelete
export const softDelete = asyncHandler(async(req,res,next)=>{
    const user = await userModel.findByIdAndUpdate({_id:req.user._id},{isDeleted:true},{new:true})
    return res.status(200).json({message:"Done" , user})
})


//logout
export const logout = asyncHandler(async(req,res,next)=>{
    const user = await userModel.findByIdAndUpdate({_id:req.user._id},{isOnline:false},{new:true})
    return res.status(200).json({message:"Done" , user})
})