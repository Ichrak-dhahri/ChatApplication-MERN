import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    },
    message:{
        type:String,
        
        required:true
    }}
    //created at and updated at =>message.createdAt function offred by mongoose
        ,{timestamps:true}
    

);
const Message= mongoose.model("Message",messageSchema);
export default Message;