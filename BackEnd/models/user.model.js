import mongoose  from "mongoose";
const userSchema =new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    gender:{
        type:String,
        required:true,
       enum:["male","female"],

    },
    profilePic:{
        type:String,
        default:"",
    },
//createdAt & UpdatedAt
},{timestamps:true});
const UserModel =mongoose.model("User",userSchema);
export default UserModel;