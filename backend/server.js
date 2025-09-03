import "dotenv/config";  
import http from "http"
import app from "./app.js";
import { Server} from "socket.io";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
// dotenv.config()
const port=process.env.PORT ||3000
const server=http.createServer(app)
// const server = require('http').createServer();
const io = new Server(server,{
  cors:{
    origin:"*"
  }
});
io.use((socket,next)=>{
  try{
const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[ 1 ];
        const projectId = socket.handshake.query.projectId;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error('Invalid projectId'));
        }


        socket.project =  projectModel.findById(projectId);


        if (!token) {
            return next(new Error('Authentication error'))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return next(new Error('Authentication error'))
        }


        socket.user = decoded;

        next();
    }catch(err){
    next(err)
    }
})
io.on('connection', socket=> {
    console.log('a useris connected');
    
    socket.join(socket.project._id)

    socket.on("project-message",data=>{
      socket.broadcast.to(socket.project._id).emit("project-message",data)
      console.log(data);
      
    })

  socket.on('disconnect', () => { 
    console.log('user disconnected');

   });
});

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})