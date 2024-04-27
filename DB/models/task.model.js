import { Schema , model , Types } from "mongoose";

const taskSchema = new Schema ({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["toDo" , "doing" , "done"],
        default:"toDo",
        required:true
    },
    creatorId:{
        type:Types.ObjectId,
        ref:"user",
        required:true
    },
    assignTo:{
        type:Types.ObjectId,
        ref:"user",
        required:true
    },
    deadline:{
        type:Date,
        required:true
    }
},{timestamps:true})

const taskModel = model ("task",taskSchema)

export default taskModel