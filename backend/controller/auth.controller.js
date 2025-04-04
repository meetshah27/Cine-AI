import {User} from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateTokens.js";
export async function signup(req, res) {
    try {
        const{email, password,username} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const ExistingUser = await User.findOne({username: username});
        const ExistingUserEmail = await User.findOne({email: email});
        const ProfileImage=["/avatar1.jpg","/avatar2.jpg","/avatar3.jpg"]
        const image=ProfileImage[Math.floor(Math.random() * ProfileImage.length)];
        const salt= await bcrypt.genSalt(10);
        if(!email||!password||!username)
        {
            return res.status(400).json({success:false,message:"All signup fields are required!"});
        }
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false,message:"Invalid email format"});
        }
        if(password.length<6){
            return res.status(400).json({success:false,message:"Password should be at least 6 characters long"});
        }
        if (ExistingUser)
        {
            return res.status(400).json({success:false,message:"Username already exists"})  ;
        }
        if (ExistingUserEmail)
        {
            return res.status(400).json({success:false,message:"Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username:username, 
            email:email, 
            password:hashedPassword,
            profilePic:image
        });
        if (newUser)
        {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({success:true,user:{
                ...newUser._doc,
                password:null // Remove password from response
            }});
        }
    } 
    catch (error) {
        res.status(500).send(error.message);
    }
}
export async function login(req, res) 
{
    try 
    {
        const { email, password } = req.body;
        if (!email ||!password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const user = await User.findOne({ email:email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        generateToken(user._id, res);
        res.status(200).json({ success: true, user:{
            ...user._doc,
            password:null // Remove password from response
        } });
    }
    catch (error) 
    {
        res.status(500).send(error.message);
    }
}
export async function logout(req, res) {
    try {
        res.clearCookie("jwt-token");
        res.status(200).json({success:true, message:"Logged out successfully"});
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export async function authcheck(req, res) 
{
    try 
    {
        res.status(200).json({success:true,user:req.user});
    } catch (error) 
    {
        res.status(500).send(error.message);     
        console.log(error.message);   
    }
}