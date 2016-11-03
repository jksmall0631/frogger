var canvas = document.getElementById("frogger");
var ctx = canvas.getContext("2d");
var Frog = require('./frog.js');
var CarLeft = require('./carLeft.js');
var CarRight = require('./carRight.js');
var Log = require('./logs.js');
var Turtle = require('./turtles.js');

var width = canvas.width;
var height = canvas.height;
var rightCarImg = document.getElementById("right-car-img");
var leftCarImg = document.getElementById("left-car-img");
var frogImg = document.getElementById("frog-img");
var turtleImg = document.getElementById("turtle-img");
var thinLogImg = document.getElementById("thin-log-img");
var width = canvas.width;
var height = canvas.height;
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var frog = new Frog((width -50)/2, height -100, 45, 50)





requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, width, height);
  allCars.forEach(function(car){
    car.draw(ctx, leftCarImg).move();
  });
  allCars.forEach(function(car){
    car.draw(ctx, rightCarImg).move(width);
  });
  allLogs.forEach(function(log){
    log.draw(ctx, thinLogImg).move(width);
  });
  allTurtles.forEach(function(turtle){
    turtle.draw(ctx, turtleImg).move();
  });
  frog.drawFrog(ctx, frogImg);
  carCollision();
  logCollusion();
  turtleCollusion();
  frog.frogMovement(width, height, leftPressed, rightPressed, upPressed, downPressed);
  requestAnimationFrame(gameLoop);
});

document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('keydown', keyDownHandler, false);

function keyDownHandler(e){
  if(e.keyCode == 37){
    if(!leftPressed) {
      leftPressed = true;
     }
  }
  else if(e.keyCode == 38){
    if(!upPressed) {
    upPressed = true;
  }
  }
  else if(e.keyCode == 39){
    if(!rightPressed) {
    rightPressed = true;
  }
  }
  else if(e.keyCode == 40){
    if(!downPressed) {
    downPressed = true;
  }
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



var allCars = [];

allCars.push(new CarLeft(50, 550, 1, 50));
allCars.push(new CarLeft(250, 550, 1, 50));
allCars.push(new CarLeft(450, 550, 1, 50));
allCars.push(new CarRight(600, 500, -1, 50));
allCars.push(new CarRight(400, 500, -1, 50));
allCars.push(new CarRight(50, 500, -1, 50));
allCars.push(new CarLeft(0, 450, 1, 50));
allCars.push(new CarLeft(100, 450, 1, 50));
allCars.push(new CarLeft(400, 450, 1, 50));
allCars.push(new CarRight(400, 400, -1, 50));
allCars.push(new CarRight(150, 400, -1, 50));
allCars.push(new CarLeft(300, 350, 1, 50));
allCars.push(new CarLeft(100, 350, 1, 50));

var allLogs = [];

allLogs.push(new Log(-200, 200, 1, 100));
allLogs.push(new Log(50, 200, 1, 100));
allLogs.push(new Log(450, 200, 1, 100));
allLogs.push(new Log(350, 150, 2, 200));
allLogs.push(new Log(0, 150, 2, 200));
allLogs.push(new Log(-200, 50, 1.5, 150));
allLogs.push(new Log(100, 50, 1.5, 150));
allLogs.push(new Log(450, 50, 1.5, 150));

var allTurtles = [];

allTurtles.push(new Turtle(-100, 251, -1, 150));
allTurtles.push(new Turtle(250, 251, -1, 150));
allTurtles.push(new Turtle(600, 251, -1, 150));
allTurtles.push(new Turtle(-150, 100, -1.5, 150));
allTurtles.push(new Turtle(50, 100, -1.5, 150));
allTurtles.push(new Turtle(350, 100, -1.5, 150));
allTurtles.push(new Turtle(650, 100, -1.5, 150));






//filler cars
// allCars.push(new CarLeft(50, 550, 1, 50));
// allCars.push(new CarLeft(250, 550, 1, 50));
// allCars.push(new CarLeft(450, 550, 1, 50));




function carCollision(){
  allCars.forEach(function(car, i){
  if (frog.x < car.x + car.width &&
   frog.x + frog.width > car.x &&
   frog.y < car.y + car.height &&
   frog.height + frog.y > car.y) {
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
  if (frog.x < log.x + log.width &&
   frog.x + frog.width > log.x &&
   frog.y < log.y + log.height &&
   frog.height + frog.y > log.y) {
     (frog.x = log.x + 1);
     (frog.y = log.y + 1);
     }
});
}

function turtleCollusion(){
  allTurtles.forEach(function(turtle, i){
  if (frog.x < turtle.x + turtle.width &&
   frog.x + frog.width > turtle.x &&
   frog.y < turtle.y + turtle.height &&
   frog.height + frog.y > turtle.y) {
     (frog.x = turtle.x + 1);
     (frog.y = turtle.y + 1);
}
});
}
