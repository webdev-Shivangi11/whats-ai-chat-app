import "dotenv/config";  
import http from "http"
import app from "./app.js";
import { Server} from "socket.io";
// dotenv.config()
const port=process.env.PORT ||3000
const server=http.createServer(app)
// const server = require('http').createServer();
const io = new Server(server);
io.on('connection', socket=> {
    console.log('a user connected');
    
  socket.on('event', data => { /* … */});
  socket.on('disconnect', () => { /* … */ });
});

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})