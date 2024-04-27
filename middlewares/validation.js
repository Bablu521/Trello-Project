export const validation = (joiSchema)=>{
    return(req,res,next)=>{
        const dataFromAllMethods = { ...req.body , ...req.query , ...req.params}
        const validationResult = joiSchema.validate(dataFromAllMethods , {abortEarly:false})
        if (validationResult.error){
            return res.json({message:"validationError" , validationErr:validationResult.error.details})
        }
        return next()
    }
}