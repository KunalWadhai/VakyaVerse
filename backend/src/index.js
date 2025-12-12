import {app} from './app.js';
import {ENV} from './lib/constants.js';
import { connectDB } from './lib/db.js';

const port = ENV.PORT || 3000;

const startServer = () =>{
   connectDB();
   app.listen(port, ()=> {
      console.log(`🚀 Server running on port ${port}`);
   });
   connectDB();
}

startServer();