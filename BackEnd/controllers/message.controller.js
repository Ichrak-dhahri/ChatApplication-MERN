import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js";

export const sendMessage =async(req,res)=>{
    try {
        const{message}=req.body;//getting the message from the user as an input
        const {id:receiverId}=req.params;
        const senderId =req.user._id ;//we added it by the middlware protect routes 
       let conversation= await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })
        if(!conversation){
            conversation=await  Conversation.create({
                participants:[senderId,receiverId]
            })
        }
        const newMessage= new Message({ 
            senderId ,
            receiverId,
            message,
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);//put the message in the msgs array in the conversation
        }

      //this will run in parallel
        await Promise.all([conversation.save(),newMessage.save()]);
        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage controller:",error.message)
        res.status(500).json({error:"internal server error"})
    }
};
export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;
        const conversation =await Conversation.findOne({
            participants:{ $all:[senderId,userToChatId]},
        }).populate("messages");//not the refrence but the actual message 
        if(!conversation)return res.status(200).json([]);
        const messages =conversation.messages;
        res.status(200).json(messages); 
        
    } catch (error) {
        console.log("Error in getMessage controller:",error.message)
        res.status(500).json({error:"internal server error"})
    }
}