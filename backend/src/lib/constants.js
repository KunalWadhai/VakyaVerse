import dotenv from 'dotenv'
dotenv.config();


export const ENV = {
    PORT:process.env.PORT || 3000,
    MONGODB_URI:process.env.MONGODB_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    NODE_ENV:process.env.NODE_ENV,
    EMAIL_FROM:process.env.EMAIL_FROM,
    EMAIL_FROM_NAME:process.env.EMAIL_FROM_NAME,
    CLIENT_URL:process.env.CLIENT_URL,
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET_KEY:process.env.CLOUDINARY_SECRET_KEY,
    ARCJET_KEY:process.env.ARCJET_KEY,
    ARCJET_ENV:process.env.ARCJET_ENV,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASS:process.env.EMAIL_PASS,
    EMAIL_USER_NAME:process.env.EMAIL_USER_NAME,
}