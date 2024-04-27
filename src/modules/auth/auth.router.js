import { Router } from "express";
const router = Router()
import * as authController from './auth.controller.js'
import { validation } from "../../../middlewares/validation.js";
import * as validators from "./auth.validation.js"

router.get("/" , (req,res,next)=>{
    res.json({message:"Auth API"})
})
router.post('/signup' , validation(validators.signup) , authController.signup)
router.get('/login' , validation(validators.login) , authController.login)

export default router