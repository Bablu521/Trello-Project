import { Schema , model} from "mongoose";

const userSchema = new Schema ({
    userName:{
        type:String,
        required:true
            },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    age:Number,
    gender:{
        type:String,
        enum:["male","female"],
        default:"male"
    },
    phone:{
        type:String,
        required:true
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const userModel = model("user",userSchema)

export default userModel