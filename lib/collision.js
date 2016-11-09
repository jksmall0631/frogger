var Log = require('./logs.js');
var Turtle = require('./turtles.js');
var CarLeft = require('./carLeft.js');
var CarRight = require('./carRight.js');
var Frog = require('./frog.js');
var LilyPad = require('./lily-pad.js');
var canvas = document.getElementById("frogger");
var ctx = canvas.getContext("2d");




var Collision = function(ctx) {
  this.ctx = ctx;
  this.collide = false;
  this.lives = 3;
  this.counter = 0;
}


Collision.prototype.logLoops = function(ctx, thinLogImg, turtleImg, leftCarImg, rightCarImg, frogImg, width) {
  allLogs.forEach(function(log){
    log.draw(ctx, thinLogImg).move(width);
  });
  allTurtles.forEach(function(turtle){
    turtle.draw(ctx, turtleImg).move();
  });
  leftCar.forEach(function(car){
    car.draw(ctx, leftCarImg).move(width);
  });
  rightCar.forEach(function(car){
    car.draw(ctx, rightCarImg).move(width);
  });
  frogs.forEach(function(frogs){
    frogs.drawFrog(ctx, frogImg);
  });
  allLilyPads.forEach(function(lilypad){
    lilypad.draw(ctx);
  });
}


Collision.prototype.logCollusion = function(frog) {
  var self = this;
    allLogs.forEach(function(item, i){
      logAndTurtleCollision(item, frog, self);
    });
  };

Collision.prototype.turtleCollusion = function(frog) {
  var self = this;
  allTurtles.forEach(function(item, i){
    logAndTurtleCollision(item, frog, self);
  });
};

function logAndTurtleCollision(item, frog, self){
  if(frog.x < item.x + item.width - 25 &&
  frog.x + frog.width > item.x + 25 &&
  frog.y < item.y + item.height &&
  frog.height + frog.y > item.y) {
    (frog.x = frog.x + item.vx);
    (frog.y = item.y + 1);
    self.collide = true;
  }
}

function frogAndCarCollision(item, frog, self){
  if(frog.x < item.x + item.width &&
   frog.x + frog.width > item.x &&
   frog.y < item.y + item.height &&
   frog.height + frog.y > item.y) {
    frog.resetFrog();
    self.lives--;
    }
}

Collision.prototype.frogCollision = function(frog){
  var self = this;
  frogs.forEach(function(item, i){
  frogAndCarCollision(item, frog, self);
  });
};

Collision.prototype.leftCarCollision = function(frog){
  var self = this;
  leftCar.forEach(function(item, i){
  frogAndCarCollision(item, frog, self);
  });
};

Collision.prototype.rightCarCollision = function(frog) {
  var self = this;
  rightCar.forEach(function(item, i){
frogAndCarCollision(item, frog, self);
  });
};



Collision.prototype.lilyPadCollusion = function(frog, updateScore, lives) {
    var self = this;
    allLilyPads.forEach(function(lilypad, i){
    if (frog.x < lilypad.x + lilypad.width &&
      frog.x + frog.width > lilypad.x &&
      frog.y < lilypad.y + lilypad.height &&
      frog.height + frog.y > lilypad.y) {
        (frog.x = lilypad.x -15);
        (frog.y = lilypad.y + 1);
        self.collide = true;
        frog.resetFrog();
        self.counter ++;
        if(self.counter === 1) {
          frogs[0].x = lilypad.x-15;
          incrementSpeeds();
        }
        else if(self.counter === 2) {
          frogs[1].x = lilypad.x-15;
         incrementSpeeds();
        }
        else if(self.counter === 3) {
          frogs[2].x = lilypad.x-15;
          incrementSpeeds();
        }
        else if(self.counter === 4) {
          frogs[3].x = lilypad.x-15;
          incrementSpeeds();
        }

      return updateScore += 90;
    }
  });
};

Collision.prototype.waterDeath = function (frog, lives) {
  var self = this;
  if(frog.y < 300) {
  if(self.collide === false){
    frog.resetFrog();
    self.lives--;
    }
  else if(self.collide === true){
    self.collide = false;
    }
  }
};

Collision.prototype.resetPlaceholders = function(){
  frogs.forEach(function(frogs, i){
    frogs.x = -5000;
  });
}

function incrementSpeeds(){
  rightCar.forEach(function(car){
    car.vx = car.vx - 0.5;
  });
  leftCar.forEach(function(car){
    car.vx = car.vx + 0.5;
  });
}

Collision.prototype.resetSpeeds = function(){
  rightCar.forEach(function(car){
    car.vx = -1;
  });
  leftCar.forEach(function(car){
    car.vx = +1;
  });
}



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

var frogs = [];
frogs.push(new Frog(-5000, 0, 45, 50));
frogs.push(new Frog(-5000, 0, 45, 50));
frogs.push(new Frog(-5000, 0, 45, 50));
frogs.push(new Frog(-5000, 0, 45, 50));

var allLilyPads = [];
allLilyPads.push(new LilyPad(90, 0));
allLilyPads.push(new LilyPad(190, 0));
allLilyPads.push(new LilyPad(290, 0));
allLilyPads.push(new LilyPad(390, 0));
allLilyPads.push(new LilyPad(490, 0));





module.exports = Collision;
