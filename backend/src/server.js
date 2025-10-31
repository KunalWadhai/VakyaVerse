import express from 'express';
import {createServer} from 'http';
//---------Router Files-----------
import authRoutes from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';

import dotenv from 'dotenv';
dotenv.config(); 

const app = express(); 
const server = createServer(app);


//---------Routes--------------
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);

const port = process.env.PORT;
const startServer = () =>{
   server.listen(port, ()=> {
      console.log(`🚀 Server running on port ${port}`);
   })
}

startServer();