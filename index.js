"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var socket_io_1 = require("socket.io");
var server = http.createServer();
var io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Allow your frontend's origin
        methods: ['GET', 'POST'], // Specify allowed methods
        credentials: true, // If using cookies or authentication
    },
});
io.on('connection', function (socket) {
    console.log("A socket has been connected ! with socket id ", socket.id);
    socket.on('onMessage', function (args) {
        console.log('message we recievvneing ...', args);
        console.log("socket who has sent this messgge is", socket.id);
    });
});
io.listen(8080);
