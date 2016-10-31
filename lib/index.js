var canvas = document.getElementById("frogger");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var frogX = (width -10)/2;
var frogY = height - 10;
var frogRadius = 10;

document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('keydown', keyDownHandler, false);

function keyDownHandler(e){
    if(e.keyCode == 37){
      leftPressed = true;
    }
    else if(e.keyCode == 38){
      upPressed = true;
    }
    else if(e.keyCode == 39){
      rightPressed = true;
    }
    else if(e.keyCode == 40){
      downPressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 37){
      leftPressed = false;
    }
    else if(e.keyCode == 38){
      upPressed = false;
    }
    else if(e.keyCode == 39){
      rightPressed = false;
    }
    else if(e.keyCode == 40){
      downPressed = false;
    }
}

function drawFrog() {
  ctx.beginPath();
  ctx.arc(frogX, frogY, frogRadius, 0, Math.PI*2);
  ctx.fillStyle = "000000";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawFrog();
  frogMovement();

  width += dx;
  height += dy;
}

function frogMovement(){
  if(leftPressed && frogX > 0 + frogRadius){
    frogX -= 2;
  }
  if(rightPressed && frogX < width - frogRadius){
    frogX += 2;
  }
  if(upPressed && frogY > 0 + frogRadius){
    frogY -= 2;
  }
  if(downPressed && frogY < height - frogRadius){
    frogY += 2;
  }
}


setInterval(draw, 10);
