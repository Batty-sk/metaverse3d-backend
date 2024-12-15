"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var socket_io_1 = require("socket.io");
var server = http.createServer();
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow your frontend's origin
        methods: ["GET", "POST"], // Specify allowed methods
        credentials: true, // If using cookies or authentication
    },
});
io.on("connection", function (socket) {
    console.log("A socket has been connected ! with socket id ", socket.id);
    socket.on("onMessage", function (args) {
        console.log("message we recievvneing ...", args);
        console.log("socket who has sent this messgge is", socket.id);
        // on recieveing the message from the client we can send this to all the users / or we can say its
        // friends yeah... using the io instance
        io.emit(""); // emit the onFriendsMessage ,so that only the friends of his will reicienve the messag......
    });
    socket.on("registerMe", function (args) {
        console.log("registerMe is called from the socket:", args.peerID);
        socket.broadcast.emit("someone-joins", args.peerID);
    });
    socket.on("send-coordinates", function (args) {
        console.log('sending coordinates from socket', args, socket.id);
        socket.broadcast.emit("someone-coordinates", {
            socketId: socket.id,
            x: args.x,
            y: args.y,
            z: args.z,
        });
    });
    socket.on("exchangeIceCandidates", function (iceCandidateData) {
        // on recieivng the ice candidate data we have to send the avaialabe users's ice candiate data to him and to all the connected user , so that they can talk with each other if they ever come in the radius .
    });
});
io.listen(8080);
