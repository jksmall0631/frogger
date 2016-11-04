

var Frog = function(x, y, height, width) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
};


Frog.prototype.drawFrog = function(ctx, frogImg) {
  ctx.beginPath();
  ctx.drawImage(frogImg, this.x, this.y, this.width, this.height);
  ctx.fillStyle = "transparent";
  ctx.fill();
  ctx.closePath();
};



Frog.prototype.frogLeft = function(){
  this.x -= 50;
};

Frog.prototype.frogRight = function(){
  this.x += 50;

};

Frog.prototype.frogUp = function(){
  this.y -= 50;

};

Frog.prototype.frogDown = function(){
  this.y += 50;

};


module.exports = Frog;
