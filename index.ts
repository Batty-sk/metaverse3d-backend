import * as http from "http";
import { Server } from "socket.io";

const server = http.createServer();

type connectedUsersProps = {
    socketId:string,
    iceCandidatesData:{}

}

const connectedUsers:connectedUsersProps = {
    socketId:'',
    iceCandidatesData:{}
}

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow your frontend's origin
    methods: ["GET", "POST"], // Specify allowed methods
    credentials: true, // If using cookies or authentication
  },
});

io.on("connection", (socket) => {
  console.log("A socket has been connected ! with socket id ", socket.id);

  socket.on("onMessage", (args) => {
    console.log("message we recievvneing ...", args);
    console.log("socket who has sent this messgge is", socket.id);

    // on recieveing the message from the client we can send this to all the users / or we can say its
    // friends yeah... using the io instance
    io.emit(""); // emit the onFriendsMessage ,so that only the friends of his will reicienve the messag......
  });

  socket.on("exchangeIceCandidates", (iceCandidateData) => {
    // on recieivng the ice candidate data we have to send the avaialabe users's ice candiate data to him and to all the connected user , so that they can talk with each other if they ever come in the radius .
    
});
});

io.listen(8080);
