var socket = io();



let username = prompt("Enter username");


let currentColor = "blue";

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
          output.scrollTop = output.scrollHeight;
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

var message = "";

function sendToServer(message){
  socket.emit('new message',message);
  socket.emit('username',username);
}
socket.on('new message', (msg)=>{
  message = msg;

});
socket.on('username',(user)=>{
  output.innerHTML += "<pre><span id=blue>"+user+": </span>" + message + "</pre>";
})










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

    styleDoc.href = "styleDARK.css"

    theme = "dark";
  }
  else if(theme == "dark") {

    styleDoc.href = "styleLIGHT.css";

    theme = "light";
  }

}



//For HTML code "<input type="text" autocomplete="off" id = "input"> </input>" we can experiment with <textarea> blocks I saw them online

//Username Input Box "<input type="text" autocomplete="off" id = "usernameInput"> </input>"
