//username and password page info:
//Username and password entered into 2 dimensional array on website startup and saved in server data
//Login and sign up are same page BECAUSE if username and password attempted and account exists, it will say invalid Password
//and if its a new account, we'll put a message saying new account created




var socket = io();

let currentColor = "blue";

let username = prompt("Enter username");
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

document.getElementById("welcomeMessage").innterHTML = "";
document.getElementById("welcomeMessage").innerHTML = "Welcome,&nbsp;" +"<span id='blue'>"+username+"</span>";

let output = document.getElementById("output");

let theme = "light"; //light, dark

//enter text into box w/enter key

let input = document.getElementById("input").addEventListener("keyup", function(event) {
  event.preventDefault();
  if( event.keyCode == 13) {
    let input = document.getElementById("input").value;
        input = input.trim();
        if(input != ""){

          sendToServer(input); //sending in the input to the server before resetting the value

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

function sendToServer(message){
  socket.emit('new message',message);
  socket.emit('username',username);
}
socket.on('new message', (msg)=>{
  message = msg;

});
socket.on('username',(user)=>{
  printMessage(user, message);
})

function printMessage(user, message){
  if(currentColor == "blue"){
    output.innerHTML += "<pre><span id='blue'>"+user+": </span>" + message + "</pre>";
  }else if(currentColor == "green"){
    output.innerHTML += "<pre><span id='green'>"+user+": </span>" + message + "</pre>";
  }else{
    output.innerHTML += "<pre><span id='red'>"+user+": </span>" + message + "</pre>";
  }

  output.scrollTop = output.scrollHeight;
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



//For HTML code "<input type="text" autocomplete="off" id = "input"> </input>" we can experiment with <textarea> blocks I saw them online

//Username Input Box "<input type="text" autocomplete="off" id = "usernameInput"> </input>"
