import Router from "express"
const router = Router()
import * as taskController from "./task.controller.js"
import { auth } from "../../../middlewares/authentication.js"
import { validation } from './../../../middlewares/validation.js';
import * as validators from "./task.validation.js"

router.get("/" , (req,res,next)=>{
    res.json({message:"Task API"})
})
router.post ("/addTask" , auth , validation(validators.addTask) , taskController.addTask)
router.put("/updateTask" , auth , validation(validators.updateTask) , taskController.updateTask)
router.delete("/deleteTask" , auth , taskController.deleteTask)
router.get('/getAllTasks' , auth , taskController.getAllTasks)
router.get('/getCreatedTasks' , auth , taskController.getCreatedTasks)
router.get('/myTasksAssignToMe' , auth , taskController.myTasksAssignToMe)
router.get('/getTasksAssignToAnyUser' , auth , taskController.getTasksAssignToAnyUser)
router.get('/getLateTasks' , auth , taskController.getLateTasks)

export default router