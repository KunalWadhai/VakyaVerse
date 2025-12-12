import User from '../models/user.model.js';
import  Message  from "../models/message.model.js";
import cloudinary from '../lib/cloudinary.js';

export const getAllContacts = async (req, res) =>{
    try{
        const isLoggedInUser = req.user._id;
        console.log("user details: ", req.user);
        const filteredUsers = await User.find({_id: { $ne: isLoggedInUser}}).select('-password');

        return res.status(200).json({
            status: 200,
            suceess: true,
            data: filteredUsers
        });
    }
    catch(error){
        console.log("Failed to get contacts", error.message);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getChatPartners = async (req, res) =>{
    try{
        const isLoggedInUser = req.user._id;
        console.log("Logged in user : ", isLoggedInUser);

        const messages = await Message.find({
            $or:[
                {senderId: isLoggedInUser},
                {receiverId: isLoggedInUser}
            ]
        });
        console.log("Messages : ", messages);
        const chatPartnersIds = [
            ...new Set(messages.map((msg) =>
                msg.senderId.toString() === isLoggedInUser.toString()
                    ? msg.receiverId.toString()
                    : msg.senderId.toString()
            ))
        ];
        console.log("Chat Partner Ids : ", chatPartnersIds);
        
        const chatPartners = await User.find({_id: {$in: chatPartnersIds}}).select('-password');
        return res.status(200).json({
            success: true,
            message: "Chat partners fetch successfully",
            data: chatPartners
        });
    }catch(error){
        console.log("Failed to get chat partners", error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}
export const getMessageByUserId = async (req, res)=>{
    try{
        const myId = req.user._id;
        const {id: userToChat} = req.params;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChat},
                {senderId: userToChat, receiverId: myId}
            ]
        });

        return res.status(200).json({
            status:200,
            suceess: true,
            messages: messages
        }) 
    }catch(error){
        console.log("Failed to send or receive messages, ", error.message);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}
export const sendMessage = async (req, res)=>{
    try{
        const {text, image} = req.body;
        const senderId = req.user._id;
        const {id: receiverId} = req.params;

        let imageUrl;
        if(image){
            const cloudinaryResponse = await cloudinary.uploader.upload(image);
            imageUrl = cloudinaryResponse.secure_url;
        }
        const msg = await Message.create({
            senderId,
            receiverId,
            text: text,
            image: imageUrl
        });
        // send message in real time if user is online #socket.io
        return res.status(201).json({
            success: true,
            message: msg
        });
    }catch(error){
        console.log("fail to send message, ", error.message);
        res.status(500).json({
            message: "Internal server error"
        }); 
    }
}