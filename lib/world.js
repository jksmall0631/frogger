var Frog = require('./frog.js');
var CarLeft = require('./carLeft.js');
var CarRight = require('./carRight.js');
var Log = require('./logs.js');
var Turtle = require('./turtles.js');
var LilyPad = require('./lily-pad.js');
var Score = require('./score.js');
var GameOver = require('./gameover.js');
var StartScreen = require('./startscreen.js');
var WinScreen = require('./winscreen.js');
var Music = require('./music.js');
var Collision = require('./collision.js');

var canvas = document.getElementById("frogger");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;


var frogImg = document.getElementById("frog-img");
var deadFrogImg = document.getElementById("dead-frog-img");
var startScreenImg = document.getElementById("start-screen-img");
var winImg = document.getElementById("win-img");
var froggerMusic = document.getElementById("main-audio");
var froggerIntro = document.getElementById("intro-audio");
var deathMusic = document.getElementById("death-audio");
var winMusic = document.getElementById("win-audio");
var hopMusic = document.getElementById("hop-audio");


var World = function(width, height, canvas, ctx){
  this.canvas = canvas;
  this.ctx = ctx;
  this.width = width;
  this.height = height;
};

var frog = new Frog((width-50)/2, height -100, 45, 50, ctx);
var collision = new Collision();
var carLeft = new CarLeft();
var carRight = new CarRight();


var frogA = new Frog(550, 650, 45, 50, ctx);
var frogB = new Frog(500, 650, 45, 50, ctx);
var frogC = new Frog(450, 650, 45, 50, ctx);

var score = new Score();
var gameover = new GameOver();
var startScreen = new StartScreen();
var win = new WinScreen();
var music = new Music();

var updateScore = 0;
var counter = 0;
var lives = collision.lives;
var start = false;
var collide = false;
var death = false;

World.prototype.collisionCheck = function () {
  collision.logCollusion(frog);
  collision.turtleCollusion(frog);
  collision.leftCarCollision(frog, lives);
  collision.rightCarCollision(frog, lives);
  collision.frogCollision(frog, lives);
  collision.lilyPadCollusion(frog);
  collision.waterDeath(frog, lives);
  collide = collision.collide;
};

World.prototype.drawings = function() {
  frog.drawFrog(ctx, frogImg);
  score.draw(ctx, updateScore);
  frogA.drawFrog(ctx, frogImg);
  frogB.drawFrog(ctx, frogImg);
  frogC.drawFrog(ctx, frogImg);
};

document.addEventListener('keydown', function(e) {
  if(e.keyCode == 37) {
    e.preventDefault();
    frog.frogLeft();
    music.playHop(hopMusic);
  }
  if(e.keyCode == 38) {
    e.preventDefault();
    frog.frogUp();
    music.playHop(hopMusic);
    return updateScore += 10;

  }
  if(e.keyCode == 39) {
    e.preventDefault();
    frog.frogRight();
    music.playHop(hopMusic);
  }
  if(e.keyCode == 40) {
    e.preventDefault();
    frog.frogDown();
    music.playHop(hopMusic);
    return updateScore > 0 ? updateScore -=10 : updatescore -=0;
  }
});

// World.prototype.waterDeath = function () {
//   if(frog.y < 300) {
//   if(collide === false){
//       console.log('this is our collision', self.collide)
//     frog.resetFrog();
//     lives--;
//     }
//   else if(collide === true){
//     collide = false;
//     }
//   }
// };

function spaceBarReload(){
  document.addEventListener('keydown', function(e) {
    if(e.keyCode == 32) {
      e.preventDefault();
      resetDefaults();
    }
  });
}

function resetDefaults(){
  collision.lives = 3;
  frogA.width = 50;
  frogB.width = 50;
  frogC.width = 50;
  collision.resetPlaceholders();
  updateScore = 0;
  frog.resetFrog();
  collision.resetSpeeds();
  start = true;
  death = false;
  collision.counter = 0;
  music.playMain(winMusic, deathMusic, froggerIntro, froggerMusic);
}

World.prototype.startTheScreen = function(){
    if(start === false){
      startScreen.draw(ctx, startScreenImg, width, height);
      music.playIntro(froggerIntro);
      spaceBarReload();
    }
};

World.prototype.checkLives = function(){
    if(collision.lives === 2){
      frogC.width = 0;
    }
    else if(collision.lives === 1){
      frogB.width = 0;
    }
    else if(collision.lives <=0){
      death = true;
      frogA.width = 0;
      music.playDeath(froggerMusic, deathMusic);
      gameover.draw(ctx, deadFrogImg, width, height);
      spaceBarReload();
    }
};

World.prototype.winScreen = function() {
    if(collision.counter === 5){
          // console.log('this is our collision count', collision.counter);
    music.playWin(winMusic, froggerMusic);
    win.draw(ctx, winImg, this.width, this.height);
    spaceBarReload();
    }
};


module.exports = World;
