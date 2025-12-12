import jwt from 'jsonwebtoken';
import {ENV} from '../lib/constants.js'
import userModel from '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
  try{
     const token = req.cookies.token;
     if(!token){
        return res.status(401).json({
            message: "🔑 Unauthorized No token provided"
        });
     }
     const decoded = jwt.verify(token, ENV.JWT_SECRET);
     if(!decoded){
        return res.status(401).json({
        message: "🔑 Unauthorized- Invalid Token"
      });
    }
    const user = await userModel.findById(decoded.userId).select("-password");
    console.log("Decoded user", user);
    req.user = user;
    next();
  }catch(error){
    console.log(" Error in auth middleware; ", error);
    res.status(500).json({message: "Internal server error ❌"});
  }
}