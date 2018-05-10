const path = require('path')
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const PORT = process.env.PORT || 1331;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected..');

    socket.emit('newMessage', {
        from: 'varun',
        text: 'Yepp...',
        createdAt: 1233232
    });

    socket.on('createMessage', (createMessage) => {
        console.log('createMessage', createMessage);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected..');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
});