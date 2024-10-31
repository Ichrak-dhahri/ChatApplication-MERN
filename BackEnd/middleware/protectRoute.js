
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js"
import dotenv from "dotenv";


const protectRoute = async (req, res, next) => {
    try {
      dotenv.config();
      // Log the cookies to check if they are being received correctly
   console.log("Cookies received in protectRoute:", req.cookies);
  
      const token = req.cookies.jwt;
      if (!token) {
        return res.status(401).json({ error: "Unauthorized - No token Provided" });
      }
  
      const JWT_SECRET = "AyB6Irq39OPxMV+M4VNYuDR4XDsaLAIqUMSfn5i2pTw=";
      const decoded = jwt.verify(token, JWT_SECRET);
  
      // Check if decoding the token was successful
      console.log("Decoded JWT:", decoded);
  
      if (!decoded) {
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
      }
  
      const user = await UserModel.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Log user info to ensure it’s being set in req.user
      console.log("Authenticated User:", user);
      req.user = user;
      next();
    } catch (error) {
      console.log("Error in protectRoute middleware:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
export default protectRoute;  