var World = require('./world.js');
var Collision = require('./collision.js');
var Frog = require('./frog.js');
var canvas = document.getElementById("frogger");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var world = new World(canvas, ctx, width, height);
var collision = new Collision();

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, width, height);
  collision.logLoops();
  world.drawings();
  world.collisionCheck();
  world.checkLives();
  world.startTheScreen();
  world.winScreen();
  requestAnimationFrame(gameLoop);
});
