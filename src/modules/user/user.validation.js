import joi from "joi"

export const changePassword = joi.object({
    currentPassword:joi.string().required() ,
    newPassword:joi.string().required() ,
    cNewPassword:joi.string().valid(joi.ref("newPassword")).required()
}).required()


export const updateUser = joi.object({
    age:joi.number().integer().positive().min(13).required() , 
    phone:joi.string().required()
}).required()