import jwt from 'jsonwebtoken';
import {ENV} from '../lib/env.js'

export const generateToken = (userId, res) => {
    if(!ENV.JWT_SECRET) throw new Error("JWT secret not configured");
    const token = jwt.sign({userId:userId}, ENV.JWT_SECRET,{
      expiresIn: "7d",
    });
    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // milli second
        httpOnly: true, // prevent xss attacks (cross site scripting)
        sameSite: "strict", // this will prevent CSRF attacks
        secure: ENV.NODE_ENV === "development" ? false : true,
    });
    return token;
}

// http:localhost then it would be false
// https: then it would be true as it already has ssl layer.
