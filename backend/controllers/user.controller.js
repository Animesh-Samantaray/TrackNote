import User from "../models/User.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Note from "../models/Note.model";

export const signin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User Does not exist , plz register" });
    }
    const check = bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      sameSite: "none",
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    const sendingUser = user.toObject();
    delete sendingUser.password;

    res.status(200).json({ message: "User signed in successfully",user: sendingUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = bcrypt.genSalt(10);
    const newPassword = bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: newPassword,
    });
    awaituser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });
    const sendingUser = user.toObject();
    delete sendingUser.password;
    res.status(201).json({ message: "User created successfully", user: sendingUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });
    return res.status(200).json({ message: "Logged out successsfully" });
  } catch (error) {}
};

export const giveMyDetails = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Un authorized" });
    }
    const myTotalNotes = user.notes.length;
    return res.status(200).json({ isLoggedIn: true, user: user, totalNotes:myTotalNotes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const deleteAccount=async(req,res)=>{
  try {
    const user = req.user;
    if(!user){
      return res.status(401).json({ message: "Un authorized" });
    }
   await User.findByIdAndDelete(user._id);
   await  Note.deleteMany({ user: user._id });
   res.clearCookie("token", {
  httpOnly: true,
  sameSite: "lax",
  secure: false
});
   req.user=null;
   return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
