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
  y: height -75,
  height: 10,
  radius: 10,
  width: 10
};

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, width, height);
  allCars.forEach(function(car){
    car.draw().move();
  });
  allLogs.forEach(function(log){
    log.draw().move();
  });
  drawFrog();
  frogMovement();
  carCollision();
  logCollusion();
  requestAnimationFrame(gameLoop);
});

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
  ctx.fillStyle = "#00ff00";
  ctx.fill();
  ctx.closePath();
}


function frogMovement(){
  if(leftPressed && frog.x > 0 + frog.radius
  ){
    frog.x -= 10;
  }
  else if(rightPressed && frog.x < width - frog.radius
  ){
    frog.x += 10;
  }
  else if(upPressed && frog.y > 0 + frog.radius
  ){
    frog.y -= 10;
  }
  else if(downPressed && frog.y < height - frog.radius){
    frog.y += 10;
  }
}

function CarRight(x, y, vx){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.height = 50;
  this.width = 50;
}

function CarLeft(x, y, vx){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.height = 50;
  this.width = 50;
}


CarLeft.prototype.draw = function () {
  ctx.fillStyle = '#000000';
  ctx.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

CarRight.prototype.draw = function () {
  ctx.fillStyle = '#000000';
  ctx.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

CarLeft.prototype.move = function () {
  this.x += this.vx;
  if(this.x > width + 50){
    this.x = -50;
  return this;
  }
};

CarRight.prototype.move = function () {
  this.x += this.vx;
  if(this.x < -50){
    this.x = 650;
  return this;
  }
};

function Log(x, y, vx, width){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.height = 50;
  this.width = width;
}

Log.prototype.draw = function () {
  ctx.fillStyle = '#A0522D';
  ctx.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Log.prototype.move = function () {
  this.x += this.vx;
  if(this.x > width + 50){
    this.x = -50;
  return this;
  }
};


var allCars = [];

allCars.push(new CarLeft(50, 550, 1));
allCars.push(new CarLeft(250, 550, 1));
allCars.push(new CarLeft(450, 550, 1));
allCars.push(new CarRight(600, 500, -1));
allCars.push(new CarRight(400, 500, -1));
allCars.push(new CarRight(50, 500, -1));
allCars.push(new CarLeft(0, 450, 1));
allCars.push(new CarLeft(100, 450, 1));
allCars.push(new CarLeft(400, 450, 1));
allCars.push(new CarRight(400, 400, -1));
allCars.push(new CarRight(150, 400, -1));
allCars.push(new CarLeft(300, 350, 1));
allCars.push(new CarLeft(100, 350, 1));


var allLogs = [];

allLogs.push(new Log(-50, 250, 1, 100));
allLogs.push(new Log(-250, 250, 1, 100));
allLogs.push(new Log(-450, 150, 1, 150));
allLogs.push(new Log(-550, 150, 1, 150));



function carCollision(){
  allCars.forEach(function(car, i){
  if (frog.x < allCars[i].x + allCars[i].width &&
   frog.x + frog.width > allCars[i].x &&
   frog.y < allCars[i].y + allCars[i].height &&
   frog.height + frog.y > allCars[i].y) {
    alert("GAME OVER");
    document.location.reload();
  }
  if (frog.y <= 300) {
    alert("GAME OVER");
    document.location.reload();
  }
});
}

function logCollusion(){
  allLogs.forEach(function(log, i){
  if (frog.x < allLogs[i].x + allLogs[i].width &&
   frog.x + frog.width > allLogs[i].x &&
   frog.y < allLogs[i].y + allLogs[i].height &&
   frog.height + frog.y > allLogs[i].y) {
     (frog.x = log.x + log.height/2);
     (frog.y = log.y + log.width/2);
     }
});
}
