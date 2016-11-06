var canvas = document.getElementById("frogger");
var ctx = canvas.getContext("2d");
var Frog = require('./frog.js');
var CarLeft = require('./carLeft.js');
var CarRight = require('./carRight.js');
var Log = require('./logs.js');
var Turtle = require('./turtles.js');
var LilyPad = require('./lily-pad.js');
var Score = require('./score.js');
var GameOver = require('./gameover.js');
var MainAudio = require('./mainaudio.js');
var IntroAudio = require('./introaudio.js');
var StartScreen = require('./startscreen.js');


var width = canvas.width;
var height = canvas.height;
var rightCarImg = document.getElementById("right-car-img");
var leftCarImg = document.getElementById("left-car-img");
var frogImg = document.getElementById("frog-img");
var turtleImg = document.getElementById("turtle-img");
var thinLogImg = document.getElementById("thin-log-img");
var deadFrogImg = document.getElementById("dead-frog-img");
var startScreenImg = document.getElementById("start-screen-img");
var froggerMusic = document.getElementById("main-audio");
var froggerIntro = document.getElementById("intro-audio");
var frog = new Frog((width -50)/2, height -100, 45, 50);
var score = new Score();
var gameover = new GameOver();
var startScreen = new StartScreen();
var updateScore = 0;
var mainAudio = new MainAudio(froggerMusic);
var introAudio = new IntroAudio(froggerIntro);
var death = false;
var start = false;

document.addEventListener('keydown', function(e) {
  if(e.keyCode == 37) {
    e.preventDefault();
    frog.frogLeft();
  }
  if(e.keyCode == 38) {
    e.preventDefault();
    frog.frogUp();
    return updateScore += 10;
  }
  if(e.keyCode == 39) {
    e.preventDefault();
    frog.frogRight();
  }
  if(e.keyCode == 40) {
    e.preventDefault();
    frog.frogDown();
  }
});

function spaceBarReload(){
  document.addEventListener('keydown', function(e) {
    if(e.keyCode == 32) {
      e.preventDefault();
      // document.location.reload();
      updateScore = 0;
      frog.x = (width -50)/2;
      frog.y = height -100;
      start = true;
      death = false;
      playMain(mainAudio);
    }
});
}


function playMain(mainAudio) {
  froggerMusic.play();
}

function playIntro(introAudio) {
  froggerIntro.play();
}

// playMain(mainAudio);

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, width, height);
  leftCar.forEach(function(car){
    car.draw(ctx, leftCarImg).move(width);
  });
  rightCar.forEach(function(car){
    car.draw(ctx, rightCarImg).move(width);
  });
  allLogs.forEach(function(log){
    log.draw(ctx, thinLogImg).move(width);
  });
  allTurtles.forEach(function(turtle){
    turtle.draw(ctx, turtleImg).move();
  });
  allLilyPads.forEach(function(lilypad){
    lilypad.draw(ctx);
  });
  frog.drawFrog(ctx, frogImg);
  leftCarCollision();
  rightCarCollision();
  logCollusion();
  turtleCollusion();
  lilyPadCollusion();
  waterDeath();
  score.draw(ctx, updateScore);
  deathScreen();
  startTheScreen();
  requestAnimationFrame(gameLoop);

});




var leftCar = [];
var rightCar = [];

leftCar.push(new CarLeft(50, 550, 1, 50));
leftCar.push(new CarLeft(250, 550, 1, 50));
leftCar.push(new CarLeft(450, 550, 1, 50));
rightCar.push(new CarRight(600, 500, -1, 50));
rightCar.push(new CarRight(400, 500, -1, 50));
rightCar.push(new CarRight(50, 500, -1, 50));
leftCar.push(new CarLeft(0, 450, 1, 50));
leftCar.push(new CarLeft(100, 450, 1, 50));
leftCar.push(new CarLeft(400, 450, 1, 50));
rightCar.push(new CarRight(400, 400, -1, 50));
rightCar.push(new CarRight(150, 400, -1, 50));
leftCar.push(new CarLeft(300, 350, 1, 50));
leftCar.push(new CarLeft(100, 350, 1, 50));

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

var allLilyPads = [];

allLilyPads.push(new LilyPad(90, 0));
allLilyPads.push(new LilyPad(190, 0));
allLilyPads.push(new LilyPad(290, 0));
allLilyPads.push(new LilyPad(390, 0));
allLilyPads.push(new LilyPad(490, 0));



function leftCarCollision(){
  leftCar.forEach(function(car, i){
  if (frog.x < car.x + car.width &&
   frog.x + frog.width > car.x &&
   frog.y < car.y + car.height &&
   frog.height + frog.y > car.y) {
    // alert("GAME OVER");
    gameover.draw(ctx, deadFrogImg, width, height);
    death = true;
  }
});
}

function rightCarCollision(){
  rightCar.forEach(function(car, i){
  if (frog.x < car.x + car.width &&
   frog.x + frog.width > car.x &&
   frog.y < car.y + car.height &&
   frog.height + frog.y > car.y) {
    // alert("GAME OVER");
    gameover.draw(ctx, deadFrogImg, width, height);
    death = true;
  }
});
}

var collide = false;

function logCollusion(){
  allLogs.forEach(function(log, i){
  if (frog.x < log.x + log.width - 30 &&
   frog.x + frog.width > log.x + 30 &&
   frog.y < log.y + log.height &&
   frog.height + frog.y > log.y) {
     (frog.x = frog.x + log.vx);
     (frog.y = log.y + 1);
     collide = true;
     }
});
}

function turtleCollusion(){
  allTurtles.forEach(function(turtle, i){
  if (frog.x < turtle.x + turtle.width -30 &&
   frog.x + frog.width > turtle.x + 30 &&
   frog.y < turtle.y + turtle.height &&
   frog.height + frog.y > turtle.y) {
     (frog.x = frog.x + turtle.vx);
     (frog.y = turtle.y + 1);
     collide = true;
   }
});
}

function lilyPadCollusion(){
  allLilyPads.forEach(function(lilypad, i){
  if (frog.x < lilypad.x + lilypad.width &&
   frog.x + frog.width > lilypad.x &&
   frog.y < lilypad.y + lilypad.height &&
   frog.height + frog.y > lilypad.y) {
     (frog.x = lilypad.x -15);
     (frog.y = lilypad.y + 1);
     collide = true;
     updateScore += 100;
   }
});
}

function waterDeath(){
  if(frog.y < 300) {
  if(collide === false){
    gameover.draw(ctx, deadFrogImg, width, height);
    death = true;
  }
  else if(collide === true){
    collide = false;
  }
}
}

function startTheScreen(){
  if(start === false){
  startScreen.draw(ctx, startScreenImg, width, height);
  playIntro(introAudio);
  spaceBarReload();
}
}

function deathScreen(){
  if(death === true){
    gameover.draw(ctx, deadFrogImg, width, height);
    spaceBarReload();
  }
}
