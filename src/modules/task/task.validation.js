import joi from "joi"

export const addTask = joi.object({
    title:joi.string().required() ,
    description:joi.string().required() ,
    status:joi.string().required() ,
    assignTo:joi.required() , 
    deadline:joi.date().required()
}).required()

export const updateTask = joi.object({
    _id:joi.required(),
     title:joi.string().required() ,
     description:joi.string().required() ,
     status:joi.string().required() ,
     assignTo:joi.required()
}).required()