const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

let onlineUsers = new Array(0);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static('.'));

io.on('connection', (socket) =>{
  var user = null;

  socket.on('user connected', (username)=>{
    user = username;
    onlineUsers[onlineUsers.length]=user;
    io.emit('user connected',onlineUsers);
  });

  socket.on('new message', (message)=>{
    io.emit('new message',message);
  });
  socket.on('username', (username)=>{
    io.emit('username',username);
  });
  socket.on('disconnect', (user)=>{
    io.emit('user disconnected',user)
    //I wanna say onlineUsers.splice(indexOf(user), 1); but user is undefined for some random reason
    //https://github.com/bradtraversy/chatcord/blob/master/server.js
  });
});


//Use the server.listen(3000) when testing locally
server.listen(3000, () => {
  console.log('listening on *:3000');
});


// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
// }
// server.listen(port);
