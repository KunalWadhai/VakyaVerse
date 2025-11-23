import express from 'express';
import {createServer} from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
//---------Router Files-----------
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import {connectDB} from './lib/db.js';
import {ENV} from './lib/env.js'

import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import dotenv from 'dotenv';
import { uptime } from 'process';
dotenv.config(); 

export const app = express(); 
const __dirname = path.resolve();
const server = createServer(app);

// --- Middlewares-----
app.use(express.json()); // for accessing req.body content that sent by user (fields)
app.use(express.urlencoded({extended:true})); 
app.use(cookieParser()); // to parse the cookies.

app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// -----------Rate Limiter
const limiter = new rateLimit({
   windowMs: 15 * 60 * 1000,
   max:100,
   statusCode:429,
   message: "Too many requests from this IP, Please try after some time"
});

app.use("/api", limiter);

//---------Routes--------------
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Health Check
app.get("/health", (req, res) => {
   res.status(200).json({
      status:'OK',
      Timestamp: new Date().toISOString(),
      uptime: process.uptime(),
   });
});

// 404 Handler
app.get("*", (req,res) => {
   res.status(404).json({
      success: false,
      message:"Router Not Found"
   })
});

// -- Make ready for the deployment
if(ENV.NODE_ENV === "production"){
   app.use(express.static(path.join(__dirname, "../frontend/dist")));

   app.get("", (req, res)=> {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
   }); 
}

const port = ENV.PORT || 3000;
const startServer = () =>{
   server.listen(port, ()=> {
      console.log(`🚀 Server running on port ${port}`);
   });
   connectDB();
}

startServer();