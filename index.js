const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

let onlineUsers = new Array(0);

let users = new Array(0);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static('.'));

io.on('connection', (socket) =>{
  var user = "Guest";


  // console.log("Entrance");

  socket.on('user connected', (loginQuery)=>{
    if( loginQuery) {
      user = users[users.length-1].username;
    }
    onlineUsers[onlineUsers.length]=user;
    // console.log(onlineUsers);
    var connectionInfo = new ExportInfo(onlineUsers, user);
    io.emit('user connected',connectionInfo);
  });

  socket.on('new message', (messageInfo)=>{
    io.emit('new message',messageInfo);
  });
  socket.on('username', (username)=>{
    io.emit('username',username);
  });
  socket.on('New Login', (userInfo)=>{
    // console.log(userInfo);
    var isTaken = true;
    var accCheck = false;
    var accSearch = users.find(({ username }) => username == userInfo.username);
    if( (typeof accSearch) == "undefined") {
      isTaken = false;
    }
    if(isTaken == false ) {
      users[users.length]=userInfo;
      user = userInfo.username;
      // console.log(userInfo.username);
    }
    // console.log(userInfo);
    // console.log(accSearch);
    if( isTaken == true) {
      if(accSearch.username == userInfo.username && accSearch.password == userInfo.password) {
        // console.log("!!!!!");
        accCheck = true;
      }
    }
    console.log(isTaken);
    console.log(users);
    var accInfo = new ExportIsTakenAccCheck(isTaken, accCheck);
    io.emit('New Login', accInfo);
  });
  socket.on('Drawing', (imageURL)=>{
    io.emit('Drawing', imageURL);
    console.log(imageURL);
  });

  socket.on('disconnect', ()=>{
    const index = onlineUsers.indexOf(user);
    if (index > -1) {
      onlineUsers.splice(index, 1); // 2nd parameter means remove one item only
    }
    var disconnectInfo = new ExportInfo(onlineUsers, user);

    io.emit('user disconnected',disconnectInfo);
    //I wanna say onlineUsers.splice(indexOf(user), 1); but user is undefined for some random reason
    //https://github.com/bradtraversy/chatcord/blob/master/server.js
  });
});




function ExportInfo( onlineUsers, user) {
  this.onlineUsers = onlineUsers;
  this.user = user;

}

function ExportIsTakenAccCheck( isTaken, accCheck) {
  this.isTaken = isTaken;
  this.accCheck = accCheck;
}


// Use the server.listen(3000) when testing locally



// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
server.listen(port);
