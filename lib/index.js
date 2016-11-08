var World = require('./world.js');
var canvas = document.getElementById("frogger");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var world = new World(canvas, ctx, width, height);

canvas.focus();


requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, width, height);
  world.objectLoops();
  world.drawings();
  world.leftCarCollision();
  world.rightCarCollision();
  world.frogCollision();
  world.logCollusion();
  world.turtleCollusion();
  world.lilyPadCollusion();
  world.waterDeath();
  world.checkLives();
  world.startTheScreen();
  world.winScreen();
  requestAnimationFrame(gameLoop);
});
