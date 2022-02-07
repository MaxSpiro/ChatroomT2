var socket = io();

let currentColor = "blue";

let username = prompt("Enter username");
socket.emit('user connected',username);
socket.on('user connected', (onlineUsers)=>{
  output.innerHTML += "<pre><span style=color:green>"+onlineUsers[onlineUsers.length-1]+" has connected</span></pre>";
  updateOnlineUsers(onlineUsers);
});
socket.on('user disconnected',(onlineUsers)=>{//not working idk why
  updateOnlineUsers(onlineUsers);
  output.innerHTML += "<pre><span style=color:red>a user has disconnected</span></pre>";
});



let styleDoc = document.getElementById("styleLink");

document.getElementById("welcomeMessage").innerHTML = "Welcome, " +"<span id=blue>"+username+"</span>";

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
/*document.addEventListener("keyup", enterKey);
  function enterKey(event){
      if(event.key == 'Enter'){
        let input = document.getElementById("input").value;
        input = input.trim();
        if(input != ""){
          output.innerHTML += "<pre><span id=blue>"+username+": </span>" + input + "</pre>";
          document.getElementById("input").value = "";
          changeColor();
          //autoscroll vvv
          output.scrollTop = output.scrollHeight;
    }
  }
}*/


function updateOnlineUsers(onlineUsers){
  var ul = document.getElementById("onlineUsers");
  ul.innerHTML = "";
  for(let i=0;i<onlineUsers.length;i++){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(""+onlineUsers[i]));
    ul.appendChild(li);
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
    output.innerHTML += "<pre><span id=blue>"+user+": </span>" + message + "</pre>";
  }else if(currentColor == "green"){
    output.innerHTML += "<pre><span id=green>"+user+": </span>" + message + "</pre>";
  }else{
    output.innerHTML += "<pre><span id=red>"+user+": </span>" + message + "</pre>";
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
