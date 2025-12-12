import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    fullname: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String, 
        required: true,
        minLength: 6
    },
    profilePic:{
        type: String, 
        default: ""
    }
}, { 
    timestamps:true
});
