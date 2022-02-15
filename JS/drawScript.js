let isDrawing = false;

let currX;
let currY;

let previousX = null;
let previousY = null;

let c = document.getElementById('myCanvas');
let context = c.getContext('2d');



let currColor = "black";

c.width = window.innerWidth-innerWidth*0.015;
c.height = window.innerHeight-innerHeight*0.2;


var slider = document.getElementById("strokeSlider");

context.fillStyle = "white";
context.fillRect(0,0,c.width,c.height);

setInterval(periodic, 33);
function periodic(){
    context.lineWidth = slider.value;
    document.getElementById("slideValue").innerHTML = slider.value;

   selectButton();

}


window.addEventListener("mousedown", (e)=>{
  isDrawing=true;
})

window.addEventListener("mouseup", (e)=>{
  isDrawing=false;

})

window.addEventListener("mousemove", (e)=>{
console.log("clientY: " + e.clientY);
  console.log("clientX: " + e.clientX);

console.log("Height of Canvas: " + c.height);
console.log("offSetY: " + e.offsetY);
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
