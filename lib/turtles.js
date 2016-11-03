function Turtle(x, y, vx, width){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.height = 48;
  this.width = width;
}


Turtle.prototype.draw = function (ctx, turtleImg) {
  ctx.fillStyle = 'transparent';
  ctx.drawImage(turtleImg, this.x, this.y, this.width, this.height);
  return this;
};



Turtle.prototype.move = function () {
  this.x += this.vx;
  if(this.x < -200){
    this.x = 800;
  return this;
  }
};



module.exports = Turtle;
