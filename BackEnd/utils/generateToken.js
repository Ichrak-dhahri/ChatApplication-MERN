import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
const NODE_ENV="development";
const genrateTokenAndSetCookie =(userId , res )=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    res.cookie('jwt',token,{
        maxAge:15*24*60*1000,//MS ma age that cookie could live
        httpOnly:true, //prevent Xss attacks cross-site scripting attacks
        sameSite:"strict",
        secure :NODE_ENV!=="development",
    })
}
export default genrateTokenAndSetCookie;