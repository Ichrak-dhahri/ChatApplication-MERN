import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import userRoutes from "./routes/user.routes.js"
const app = express();
const PORT = process.env.PORT || 5000;
// Replace this line with your MongoDB URI
const MONGO_DB_URI = "mongodb+srv://ichrak1dhahri:4h7rNTIMDn3vjtrj@cluster0.lfcw0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use(express.json());
app.use(cookieParser());  // to parse the incommong requests with json playloads(ftom req.bodt) 
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
//connect to db 
app.listen(PORT, () => {
    connectToMongoDB(MONGO_DB_URI); // Pass MONGO_DB_URI directly here
    console.log(`Server running on port ${PORT}`);
});
