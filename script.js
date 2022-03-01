//username and password page info:
//Username and password entered into 2 dimensional array on website startup and saved in server data
//Login and sign up are same page BECAUSE if username and password attempted and account exists, it will say invalid Password
//and if its a new account, we'll put a message saying new account created

// console.log("test");

var socket = io();


if( document.getElementById("outputTitle") != null ) {

var username;

var loginQuery = false;

let currentColor = "blue";

console.log(localStorage.getItem("Login"));
if(localStorage.getItem("Login") == "true") {
  loginQuery = true;
  localStorage.setItem("Login", "false");
}


// console.log(username);

if( username == null ) {
  username = "Guest";
}
socket.emit('user connected',loginQuery);
socket.on('user connected', (connectionInfo)=>{
  output.innerHTML += "<pre><span style=color:green>"+connectionInfo.onlineUsers[connectionInfo.onlineUsers.length-1]+" has connected</span></pre>";
  updateOnlineUsers(connectionInfo.onlineUsers);
  output.scrollTop = output.scrollHeight;
  username = connectionInfo.user;
  document.getElementById("welcomeMessage").innerHTML = "";
  document.getElementById("welcomeMessage").innerHTML = "Welcome,&nbsp;" +"<span id='blue'>"+username+"</span>";

});
socket.on('user disconnected',(disconnectInfo)=>{//not working idk why
  updateOnlineUsers(disconnectInfo.onlineUsers);
  output.innerHTML += "<pre><span style=color:red>"+ disconnectInfo.user + " has disconnected</span></pre>";
  output.scrollTop = output.scrollHeight;
});



let styleDoc = document.getElementById("styleLink");


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
      if(messageInfo.message.includes("https://") || messageInfo.message.includes("base64")){

      var img = new Image();
      img.src = messageInfo.message;
      img.onload = function(){
      if(img.width>img.height){
        let ratio = 300/img.width;
        img.height*=ratio;
        img.width=300;
      } else if(img.height>img.width){
        let ratio = 300/img.height;
        img.width*=ratio;
        img.height=300;
      } else{
        img.height = 300; img.width = 300;
      }

      output.innerHTML += "<pre><span id="+currentColor+">"+user+": </span></pre><img src=" + messageInfo.message+" width="+img.width+" height="+img.height+"></img>";
      output.scrollTop = output.scrollHeight;
}
}

  } else{

      output.innerHTML += "<pre><span id="+currentColor+">"+user+": </span>" + messageInfo.message + "</pre>";
      output.scrollTop = output.scrollHeight;
  }


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

  var validLogin;


  function login() {
    let u1 = document.getElementById("inputUsername").value;
    let p1 = document.getElementById("inputPassword").value;
    console.log(u1);
    let userInfo = new UserExportInfo(u1, p1);
    socket.emit('New Login', userInfo);
    socket.on('New Login', (accInfo)=>{

      if(accInfo.isTaken) {
        if(accInfo.accCheck == false) {
          document.getElementById("takenOutput").innerHTML = "Incorrect Password";
        }
        else {
          document.getElementById("takenOutput").innerHTML = "Login Success";
          var delayInMilliseconds = 250;

          localStorage.setItem("Login", "true");

          setTimeout(function() {
            location.href="../index.html";
          }, delayInMilliseconds);
        }
      }
      else {
        document.getElementById("takenOutput").innerHTML = "New Account Created";
        var delayInMilliseconds = 250;

        localStorage.setItem("Login", "true");

        setTimeout(function() {
          location.href="../index.html";
        }, delayInMilliseconds);


      }


    });

  }

}

else if(document.getElementById("postButton") != null) {

  var socket = io();

  let isDrawing = false;

  let currX;
  let currY;

  let previousX = null;
  let previousY = null;

  let c = document.getElementById('myCanvas');
  let context = c.getContext('2d');

  let imageURL;

  let currColor = "black";

  c.width = window.innerWidth-innerWidth*0.015;
  c.height = window.innerHeight-innerHeight*0.2;


  var slider = document.getElementById("strokeSlider");

  context.fillStyle = "white";
  context.fillRect(0,0,c.width,c.height);

  setInterval(periodic, 33);
  function periodic(){

   document.getElementById("slideValue").innerHTML = slider.value;

  if(currColor == "white")
    context.lineWidth = slider.value*10;
  else
    context.lineWidth = slider.value;



     selectButton();

  }


  window.addEventListener("mousedown", (e)=>{
    isDrawing=true;
  })

  window.addEventListener("mouseup", (e)=>{
    isDrawing=false;

  })

  window.addEventListener("mousemove", (e)=>{
  // console.log("clientY: " + e.clientY);
  //   console.log("clientX: " + e.clientX);

  // console.log("Height of Canvas: " + c.height);
  // console.log("offSetY: " + e.offsetY);
  if(isDrawing && e.clientY-8<=c.height){
      if(previousX == null){
            previousX = e.clientX-8;
            previousY = e.clientY-8;
        }

         currX = e.clientX-8;
         currY = e.clientY-8;

        context.beginPath();
        context.moveTo(previousX, previousY);
        context.lineTo(currX, currY);
        context.stroke();

    }
      previousX = e.clientX-8;
      previousY = e.clientY-8;
  })

  function redButton(){
    context.strokeStyle = 'red';
    currColor = "red";

  }
  function blueButton(){
    context.strokeStyle = 'blue';
    currColor = "blue";
  }
  function greenButton(){
    context.strokeStyle = 'green';
    currColor = "green";

  }
  function blackButton(){
    context.strokeStyle = 'black';
    currColor = "black";

  }
  function yellowButton(){
    context.strokeStyle = 'yellow';
    currColor = "yellow";

  }
  function eraserButton(){
    context.strokeStyle = 'white';
    currColor = "white";


  }
  function clearButton(){
    context.fillStyle = 'white';
    context.fillRect(0,0,c.width,c.height);
  }

  function modifyButton(x){
    document.getElementById(x).style.opacity = "100%";
    document.getElementById(x).style.width = "35px";
    document.getElementById(x).style.height = "35px";
  }

  function removeModification(x){
     document.getElementById(x).style.opacity = "25%";
    document.getElementById(x).style.width = "30px";
    document.getElementById(x).style.height = "30px";
  }

  function removeOtherButtons(){
    if(currColor!="red"){
      removeModification("redBtn");
    }
     if(currColor!="blue"){
      removeModification("blueBtn");
    }
     if(currColor!="green"){
      removeModification("greenBtn");
    }
     if(currColor!="yellow"){
      removeModification("yellowBtn");
    }
     if(currColor!="black"){
      removeModification("blackBtn");
    }
     if(currColor!="white"){
      removeModification("whiteBtn");
    }
  }

  function selectButton(){
    if(currColor=="red"){
       modifyButton("redBtn");
     }else if(currColor=="blue"){
       modifyButton("blueBtn");
     }else if(currColor=="green"){
       modifyButton("greenBtn");
     }else if(currColor=="yellow"){
       modifyButton("yellowBtn");
     }else if(currColor=="black"){
       modifyButton("blackBtn");
     }else if(currColor=="white"){
       modifyButton("whiteBtn");
     }
     removeOtherButtons();

  }

  function postImage(){

    // location.href = '../index.html';
    imageURL = c.toDataURL();
    let copyText = imageURL.toString();
    navigator.clipboard.writeText(copyText);
    console.log(copyText);
    socket.emit('Drawing',imageURL);

  }



}

function UserExportInfo( username, password) {
  this.username = username;
  this.password = password;
}
