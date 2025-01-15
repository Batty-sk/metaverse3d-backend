import * as http from "http";
import { Server } from "socket.io";

const server = http.createServer();

interface connectedUsersProps {
  socketId: string;
  iceCandidatesData: {};
}

interface coordinates {
  x: number;
  y: number;
  z: number;
}
interface registerMeProp {
  peerID: string;
}

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://metaverse3d-pzxi.vercel.app"], 
    methods: ["GET", "POST"], // Specify allowed methods
    credentials: true, // If using cookies or authentication
  },
});

io.on("connection", (socket) => {
  console.log("A socket has been connected ! with socket id ", socket.id);

  socket.on("onMessage", (args) => {
    // on recieveing the message from the client we can send this to all the users / or we can say its
    // friends yeah... using the io instance
    io.emit(""); // emit the onFriendsMessage ,so that only the friends of his will reicienve the messag......
  });

  socket.on("registerMe", (args: registerMeProp) => {
    console.log("registerMe is called from the socket:", args.peerID);
    socket.broadcast.emit("someone-joins", args.peerID);
  });
  socket.on('send-message',(args:{msg:string,to:string})=>{
    socket.to(args.to).emit('chat-messages',{from:socket.id,msg:args.msg})
  })
  socket.on("sendVideoUrl",(videoURL:string)=>{
    socket.broadcast.emit("video-url", videoURL);
    console.log("sending the video url to all the other peers",videoURL)
  })
  socket.on("send-coordinates", (args: coordinates) => {
    socket.broadcast.emit("someone-coordinates", {
      socketId: socket.id,
      x: args.x,
      y: args.y,
      z: args.z,
    });
  });

  socket.on("exchangeIceCandidates", (iceCandidateData) => {
    // on recieivng the ice candidate data we have to send the avaialabe users's ice candiate data to him and to all the connected user , so that they can talk with each other if they ever come in the radius .
  });

  socket.on("disconnect",(reason)=>{
    console.log('socket with socket.id has been disconnected!',socket.id)
    console.log("reason is whatever!")
    socket.broadcast.emit("someone-leaves",socket.id)
  })
});

const PORT:any = process.env.PORT || 8080; 
io.listen(PORT);
console.log(`Server is running on port ${PORT}`);
