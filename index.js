const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static('.'));

io.on('connection', (socket) =>{

  socket.on('user connected', (username)=>{
    io.emit('user connected',username);
  });

  socket.on('new message', (message)=>{
    io.emit('new message',message);
  });
  socket.on('username', (username)=>{
    io.emit('username',username);
  });
  socket.on('disconnect', ()=>{
    io.emit('disconnect',)
  });
});


 // Use the server.listen(3000) when testing locally
server.listen(3000, () => {
  console.log('listening on *:3000');
});

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
// }
// server.listen(port);
