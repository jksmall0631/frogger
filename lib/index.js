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

function keyUpHandler(e){
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
    frog.x -= 50;
  }
  else if(rightPressed && frog.x < width - frog.radius
  ){
    frog.x += 50;
  }
  else if(upPressed && frog.y > 0 + frog.radius
  ){
    frog.y -= 50;
  }
  else if(downPressed && frog.y < height - frog.radius){
    frog.y += 50;
  }
}

function Car(x, y, vx){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.height = 50;
  this.width = 50;
}

function Log(x, y, vx, height, width){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.height = 50;
  this.width = 50;
}

Car.prototype.draw = function () {
  ctx.fillStyle = '#000000';
  ctx.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Car.prototype.move = function () {
  this.x += this.vx;
  if(this.x > width + 50){
    this.x = -50;
  return this;
  }
};

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

Car.prototype.collision = function() {
 if (frog.x < this.x + this.width &&
  frog.x + frog.width > this.x &&
  frog.y < this.y + this.height &&
  frog.height + frog.y > this.y) {
   alert("GAME OVER");
   document.location.reload();
 }
 if (frog.y <= 300) {
   alert("GAME OVER");
   document.location.reload();
 }
};

var allCars = [];

allCars.push(new Car(-50, 550, 1));
allCars.push(new Car(-250, 550, 1));
allCars.push(new Car(-450, 550, 1));
allCars.push(new Car(-550, 550, 1));

var allLogs = [];

allLogs.push(new Log(-50, 250, 1, height, 100));
allLogs.push(new Log(-250, 250, 1, height, 100));
allLogs.push(new Log(-450, 150, 1, height, 150));
allLogs.push(new Log(-550, 150, 1, height, 150));



function carCollision(){
  allCars.forEach(function(car, i){
  if (frog.x < allCars[i].x + allCars[i].width &&
   frog.x + frog.width > allCars[i].x &&
   frog.y < allCars[i].y + allCars[i].height &&
   frog.height + frog.y > allCars[i].y) {
    alert("GAME OVER");
    document.location.reload();
  }
  // if (frog.y <= 300) {
  //   alert("GAME OVER");
  //   document.location.reload();
  // }
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
