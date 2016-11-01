var canvas = document.getElementById("frogger");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;


var frog = {
  x: (width -10)/2,
  y: height -10,
  height: 10,
  radius: 10,
  width: 10
};

var car = {
  x: -50,
  y: 550,
  vx: 2,
  height: 50,
  width: 50
};


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
  ctx.arc(frog.x, frog.y, frog.radius, 0, Math.PI*2);
  ctx.fillStyle = "000000";
  ctx.fill();
  ctx.closePath();
}

function drawCar(){
  ctx.beginPath();
  ctx.fillRect(car.x, car.y, car.height, car.width);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
  car.x += car.vx;
  if(car.x > width + 50){
    car.x = -50;
  }
}

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawFrog();
  frogMovement();
  drawCar();
  carCollision();
  // width += dx;
  // height += dy;
}

function frogMovement(){
  if(leftPressed && frog.x > 0 + frog.radius
  ){
    frog.x -= 2;
  }
  else if(rightPressed && frog.x < width - frog.radius
  ){
    frog.x += 2;
  }
  else if(upPressed && frog.y > 0 + frog.radius
  ){
    frog.y -= 2;
  }
  else if(downPressed && frog.y < height - frog.radius){
    frog.y += 2;
  }
}


function carCollision(){
  if (frog.x < car.x + car.width &&
   frog.x + frog.width > car.x &&
   frog.y < car.y + car.height &&
   frog.height + frog.y > car.y) {
    alert("GAME OVER");
    document.location.reload();
  }
  if (frog.y <= 300) {
    alert("GAME OVER");
    document.location.reload();
  }
}

setInterval(draw, 10);
