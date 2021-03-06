var frogImg = document.getElementById("frog-img");

var Frog = function(x, y, height, width, ctx) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.ctx = ctx;
};

Frog.prototype.drawFrog = function() {
  this.ctx.beginPath();
  this.ctx.drawImage(frogImg, this.x, this.y, this.width, this.height);
  this.ctx.fillStyle = "transparent";
  this.ctx.fill();
  this.ctx.closePath();
};

Frog.prototype.frogLeft = function(){
  if(this.x >= 0 + this.width) {
    this.x -= 50;
  }
};

Frog.prototype.frogRight = function(){
  if(this.x + this.width <= 600 - this.width) {
    this.x += 50;
  }
};

Frog.prototype.frogUp = function(){
  this.y -= 50;
};

Frog.prototype.frogDown = function(){
  if(this.y <= 550) {
  this.y += 50;
 }
};

Frog.prototype.resetFrog = function(){
  this.x = (600-50)/2;
  this.y = 700 -100;
};

module.exports = Frog;
