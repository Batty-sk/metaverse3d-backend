"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var socket_io_1 = require("socket.io");
var server = http.createServer();
var io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://metaverse3d-pzxi.vercel.app"], 
        methods: ["GET", "POST"], 
        credentials: true, 
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
    socket.on('send-message', function (args) {
        socket.to(args.to).emit('chat-messages', { from: socket.id, msg: args.msg });
    });
    socket.on("sendVideoUrl", function (videoURL) {
        socket.broadcast.emit("video-url", videoURL);
        console.log("sending the video url to all the other peers", videoURL);
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

    socket.on("disconnect", function (reason) {
        console.log('socket with socket.id has been disconnected!', socket.id);
        console.log("reason is whatever!");
        socket.broadcast.emit("someone-leaves", socket.id);
    });
});
const PORT = process.env.PORT || 8080; 
io.listen(PORT);
console.log(`Server is running on port ${PORT}`);
