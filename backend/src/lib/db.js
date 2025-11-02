import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        const {MONGODB_URI} = ENV;
        if(!ENV.MONGODB_URI) throw new Error("MONGODB URI in not defined");
        const conn = await mongoose.connect(ENV.MONGODB_URI);
        console.log("MONGODB Connected Successfully: ", conn.connection.host);
    }catch(error){
        console.log("Database Connection Failed",error);
        process.exit(1); // 1 for failed, 0 for Success
    }
}
