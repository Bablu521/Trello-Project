import { Router } from "express";
const router = Router()
import * as userController from './user.controller.js'
import {auth} from "../../../middlewares/authentication.js"
import { validation } from "../../../middlewares/validation.js";
import * as validators from "./user.validation.js"

router.get("/" , (req,res,next)=>{
    res.json({message:"User API"})
})
router.get("/getUsers", auth , userController.getUsers)
router.patch("/changePassword" , auth , validation(validators.changePassword) , userController.changePassword)
router.put("/updateUser" , auth , validation(validators.updateUser) , userController.updateUser)
router.delete("/deleteUser" , auth , userController.deleteUser)
router.patch("/softDelete" , auth , userController.softDelete)
router.patch("/logout" , auth , userController.logout)

export default router