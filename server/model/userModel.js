const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:20
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String,
        max:20,
        min:8
    },
    isAvatarImageSet : {
        type : Boolean,
        default : false,
    },
    AvatarImage : {
        type : String,
        default : "",
    }
}) 

module.exports = mongoose.model("Users",userSchema)