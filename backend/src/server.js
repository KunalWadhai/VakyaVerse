import express from 'express';
import {createServer} from 'http';
import path from 'path';
//---------Router Files-----------
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import {connectDB} from './lib/db.js';

import dotenv from 'dotenv';
dotenv.config(); 

export const app = express(); 
const __dirname = path.resolve();
const server = createServer(app);

// --- Middlewares-----
app.use(express.json()); // for accessing req.body content that sent by user (fields)
app.use(express.urlencoded({extended:true})); 


//---------Routes--------------
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// -- Make ready for the deployment
if(process.env.NODE_ENV === "production"){
   app.use(express.static(path.join(__dirname, "../frontend/dist")));

   app.get("", (req, res)=> {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
   }); 
}

const port = process.env.PORT;
const startServer = () =>{
   server.listen(port, ()=> {
      console.log(`🚀 Server running on port ${port}`);
   });
   connectDB();
}

startServer();