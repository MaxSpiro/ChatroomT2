//username and password page info:
//Username and password entered into 2 dimensional array on website startup and saved in server data
//Login and sign up are same page BECAUSE if username and password attempted and account exists, it will say invalid Password
//and if its a new account, we'll put a message saying new account created

console.log("test");

var socket = io();


if( document.getElementById("outputTitle") != null ) {



let currentColor = "blue";

let username;

console.log(username);

if( username == null ) {
  username = "Guest";
}
socket.emit('user connected',username);
socket.on('user connected', (onlineUsers)=>{
  output.innerHTML += "<pre><span style=color:green>"+onlineUsers[onlineUsers.length-1]+" has connected</span></pre>";
  updateOnlineUsers(onlineUsers);
  output.scrollTop = output.scrollHeight;

});
socket.on('user disconnected',(disconnectInfo)=>{//not working idk why
  updateOnlineUsers(disconnectInfo.onlineUsers);
  output.innerHTML += "<pre><span style=color:red>"+ disconnectInfo.user + " has disconnected</span></pre>";
  output.scrollTop = output.scrollHeight;
});



let styleDoc = document.getElementById("styleLink");

document.getElementById("welcomeMessage").innerHTML = "";
document.getElementById("welcomeMessage").innerHTML = "Welcome,&nbsp;" +"<span id='blue'>"+username+"</span>";

let output = document.getElementById("output");

let theme = "dark"; //light, dark

function MessageInfo(message, isImage){
  this.message = message;
  this.isImage = isImage;
}

//enter text into box w/enter key
var inputBox = document.getElementById("input");
let input = document.getElementById("input").addEventListener("keyup", function(event) {
  event.preventDefault();
  if( event.keyCode == 13) {
    let input = document.getElementById("input").value;
        input = input.trim();
        if(input != ""){
          let serverInput = new MessageInfo(input,imageMode);
          sendToServer(serverInput); //sending in the input to the server before resetting the value

          document.getElementById("input").value = "";

          //autoscroll vvv

    }}})


function updateOnlineUsers(onlineUsers){
  var nameOutput = document.getElementById("onlineUsersBox");
  nameOutput.innerHTML = "";
  for(let i=0;i<onlineUsers.length;i++){
    if(currentColor == "blue"){
      nameOutput.innerHTML += "<pre><span id=blue>"+onlineUsers[i] + "</span></pre>";
    }else if(currentColor == "green"){
      nameOutput.innerHTML += "<pre><span id=green>"+onlineUsers[i]+"</span></pre>";
    }else{
      nameOutput.innerHTML += "<pre><span id=red>"+onlineUsers[i]+": </span></pre>";
    }
  }
}


var message = "";

function sendToServer(serverInput){
  socket.emit('new message',serverInput);
  socket.emit('username',username);
}


socket.on('new message', (messageInfo)=>{
  this.messageInfo = messageInfo;

});
socket.on('username',(user)=>{
  printMessage(user, this.messageInfo);
})

function printMessage(user, messageInfo){
  if(messageInfo.isImage){
      if(messageInfo.message.includes("https://") || messageInfo.message.includes("base64"))
      output.innerHTML += "<pre><span id="+currentColor+">"+user+": </span></pre><img src=" + messageInfo.message+" width=300 height=300></img>";


  } else{

      output.innerHTML += "<pre><span id="+currentColor+">"+user+": </span>" + messageInfo.message + "</pre>";
    }

  output.scrollTop = output.scrollHeight;
}





var imageMode = false;
function toggleImage(){
  imageMode=!imageMode;
  if(imageMode) inputBox.placeholder = "Enter an image link";
  else inputBox.placeholder = "Enter a message";
}


function colorOfName(){

  if(currentColor == "blue"){
    currentColor = "red";
  }else if(currentColor == "red"){
    currentColor = "green";
  }else{
    currentColor = "blue";
  }
  changeColor();
}
function changeColor(){

  if(currentColor!="blue"){
   while(document.getElementById("blue")!=null){
  document.getElementById("blue").id=currentColor;
   }
  }
  if(currentColor!="green"){
  while(document.getElementById("green")!=null){
  document.getElementById("green").id=currentColor;
   }
  }
  if(currentColor!="red"){
  while(document.getElementById("red")!=null){
  document.getElementById("red").id=currentColor;
    }
  }
}


function changeTheme() {
  if( theme == "light") {

    styleDoc.href = "CSS/styleDARK.css"

    theme = "dark";
  }
  else if(theme == "dark") {

    styleDoc.href = "CSS/styleLIGHT.css";

    theme = "light";
  }

}

}

else if(document.getElementById("titleLoginBox") != null) {


  // console.log("test");

  function login() {
    let username7 = document.getElementById("inputUsername").value;
    socket.emit('New Login', username7);
    location.href="../index.html";
  }

}
