import joi from "joi";


export const signup = joi.object({
        userName:joi.string().min(3).max(20).required() , 
        email:joi.string().email().required() ,
        password:joi.string().required() ,
        cpassword:joi.string().valid(joi.ref("password")).required(),
        age:joi.number().positive().integer().min(13).required() ,
        gender:joi.string().required() ,
        phone:joi.string().required()
        }).required()

export const login = joi.object({
        email:joi.string().email().required() ,
        password:joi.string().required()
}).required()        