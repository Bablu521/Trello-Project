import { isValidObjectId } from 'mongoose';
import taskModel from '../../../DB/models/task.model.js';
import userModel from '../../../DB/models/user.model.js';
import { asyncHandler } from './../../../utilis/errorHandling.js';



export const addTask = asyncHandler(async(req,res,next)=>{
    const {title , description , status , assignTo , deadline} = req.body
    const checkAssignTo = await userModel.findById({_id:req.body.assignTo})
    console.log(checkAssignTo)
    if (!checkAssignTo){
        return next(new Error("This user You want to assign this task not exist", {status:404}))
    }
    const currentDate = new Date()
    const taskdeadline = new Date(deadline)
    if (currentDate>taskdeadline){
        return next(new Error("Enter Valid Deadline", {status:400}))
    }
    const task = await taskModel.create({title , description , status ,
         creatorId:req.user._id , assignTo , deadline:taskdeadline})
    return res.status(201).json({message:"Done" ,task})
})


//updateTask
export const updateTask = asyncHandler(async(req,res,next)=>{
    const {_id, title , description , status , assignTo} = req.body
    const task = await taskModel.findById({_id})
    if(!task) {
        return next(new Error("Task Not Found") , {casue : 404})
    }
    if(task.creatorId.toString() != req.user._id) {
        return next(new Error("You Are Not Allowed to Edit this Task" , {status:400}))
    }
    const checkAssignedTo = await userModel.findById(assignTo)
    if(!checkAssignedTo) {
        return next(new Error("This user You want to assign this task not exist" , {cause:404}))
    }
    const updatedTask = await taskModel.findByIdAndUpdate({_id} , {title,description,status,assignTo} 
     , {new : true})
    return res.status(200).json({message : 'Done' , updatedTask})
})


//deleteTask
export const deleteTask = asyncHandler(async(req,res,next)=>{
    const {_id} = req.body
    const task = await taskModel.findById({_id})
    if(!task) {
        return next(new Error("Task Not Found") , {cause : 404})
    }
    if(task.creatorId.toString() != req.user._id) {
        return next(new Error("You Are Not Allowed to Edit this Task",{cause:400}))
    }
    const deletedTask = await taskModel.findByIdAndDelete({_id})
    return res.status(200).json({messsage : 'Done' , deletedTask})
})


//getAllTasks
export const getAllTasks = asyncHandler(async(req,res,next)=>{
    const tasks = await taskModel.find().populate([
        {
        path : "creatorId" , 
        select : "userName email phone"
    },{
        path : "assignTo",
        select : "userName email phone"
    }
])
  return res.status(200).json({message : 'Done' , tasks})
})


// getCreatedTasks
export const getCreatedTasks = asyncHandler(async(req,res,next)=>{
    const tasks = await taskModel.find({creatorId : req.user._id}).populate([
        {
            path : "creatorId",
            select : "userName email phone"
        },
        {
            path : "assignTo",
            select : "userName email phone"
        }
    ])
    return res.status(200).json({message : 'Done' , tasks})
})


// myTasksAssignToMe
export const myTasksAssignToMe = asyncHandler(async(req,res,next)=>{
    const tasks = await taskModel.find({assignTo : req.user._id}).populate([
        {
            path : "creatorId",
            select :  "userName email age"
        },
        {
            path : "assignTo",
            select : "userName email age"
        }
    ])
    return res.status(200).json({message : "Done" , tasks})
})


//getTasksAssignToAnyUser
export const getTasksAssignToAnyUser = asyncHandler(async(req,res,next)=>{
    const {assignTo} = req.body
    const checkAssignTo = await userModel.findById({_id :assignTo})
    if(!checkAssignTo) {
        return next(new Error("User you want to assignTo is Not Found" , {status:404}))
    }
    const tasks = await taskModel.find({assignTo})
    return res.status(200).json({message : "Done" , tasks})
})


// getLateTasks
export const getLateTasks = asyncHandler(async(req,res,next)=>{
    const currentDate = new Date()
    const lateTasks = await taskModel.find({deadline : {$lt : currentDate}}).populate([
        {
            path : "assignTo",
            select : "userName email phone"
        }
    ])
    return res.status(200).json({message : 'Done' , lateTasks})
})