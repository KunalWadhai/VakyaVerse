import userModel from '../models/user.model.js'
import bcrypt from 'bcrypt';
import { generateToken } from '../lib/utils.js';
import { sendWelcomeEmail } from '../emails/emailHandlers.js';
import 'dotenv/config'
// instead of above 
import {ENV} from '../lib/env.js'

export const signup = async (req, res) => {
    try{
        let {fullname, email, password} = req.body;

        if(!fullname || !email || !password){
            return res.status(400).json({
                message: "All field are required"
            });
        }
        if(password.length < 6){
            return res.status(400).json({
                message: "Password must be atleast 6 character"
            })
        }
        // email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/
        if(!emailRegex.test(email)){
            return res.status(400).json({
                message: "Invalid email format."
            })
        }

        // Normalize email to lowercase for case-insensitive uniqueness
        email = email.toLowerCase();

        console.log(`Checking for existing user with email: ${email}`);
        const isUserExist = await userModel.findOne({email: email});
        console.log(`User exists: ${!!isUserExist}`);
        if(isUserExist){
            return res.status(400).json({
                message: "User already exist"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            fullname, 
            email, 
            password:hashedPassword
        });
        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            // const savedUser = await newUser.save();
            // generateToken(savedUser._id, res);

            res.status(201).json({
                message: "User created successfully", 
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic
            });
            try{
                await sendWelcomeEmail(newUser.email, newUser.fullname, ENV.CLIENT_URL);
            }catch(error){
                console.log("Failed to send welcome email", error);
            }
        }else{
            return res.status(400).json({message: "Invalid user data"});
        }
        
    }catch(error){
        console.log("Error in user signup controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const login = async (req, res) => {
   try{
        let {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Normalize email to lowercase for case-insensitive lookup
        email = email.toLowerCase();

        let user = await userModel.findOne({email: email});
        if(!user){
            return res.status(404).json({
                message: "User not exists"
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }else{
           generateToken(user._id, res);
           res.status(200).json({
              meesage: "User logged in successfully",
              fullname: user.fullname,
              email:user.email,
           });
        }
   }catch(error){
        console.log("Error in login controller");
        res.status(500).json({message: "Internal server error"});
   } 
}

export const logout = async (req, res) => {
   res.cookie("token", "", {maxAge:0});
   res.status(200).json({message: "User logged out successfully"});
}