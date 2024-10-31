import UserModel from "../models/user.model.js";

export const getUserForSidebar=async (req,res)=>{
    try {
    const loggedInUserId=req.user._id;     
    const filtredUsers =await UserModel.find({_id:{$ne:loggedInUserId}}).select("-password");//every users in the data base but not us
    res.status(200).json(filtredUsers);



    } catch (error) {
        console.error("Error in getUserForSide controller:",error.message)
        res.status(500).json({error:"internal server error"})
    }
}