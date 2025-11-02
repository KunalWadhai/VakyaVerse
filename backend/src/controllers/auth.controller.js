import userModel from '../models/user.model.js'
import bcrypt from 'bcrypt';
import { generateToken } from '../lib/utils.js';

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

        const isUserExist = await userModel.findOne({email: email});
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

            res.status(201).json({
                message: "User created successfully", 
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic
            });
        }else{
            return res.status(400).json({message: "Invalid user data"});
        }
        
    }catch(error){
        console.log("Error in user signup controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const login = async () => {
   let {email, password} = req.body;
   
}

export const logout = async () => {
   cookies.clear();
}