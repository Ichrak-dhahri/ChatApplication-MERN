import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genrateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await UserModel.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!user||!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    genrateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout" });
  } catch (error) {
    console.log("error in login controller ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
export const signUp = async (req, res) => {
  try {
    const { fullName, userName, password, confimPassword, gender } = req.body;
    if (password !== confimPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }
    const user = await UserModel.findOne({ userName }); //check if user exist
    if (user) {
      return res.status(400).json({ error: "username already exists" });
    }
    //Hash password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //determinethe profile picture using api
    const boyProfilPic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilPic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    const newUser = new UserModel({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilPic : girlProfilPic,
    });
    if (newUser) {
      //genrate JWT tpken
      genrateTokenAndSetCookie(newUser._id, res);
      await newUser.save(); //save new user to the db
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log("error in signup controller ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
