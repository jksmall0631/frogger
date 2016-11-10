var turtleImg = document.getElementById("turtle-img");

function Turtle(x, y, vx, width, ctx){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.height = 48;
  this.width = width;
  this.ctx = ctx;
}


Turtle.prototype.draw = function () {
  this.ctx.drawImage(turtleImg, this.x, this.y, this.width, this.height);
  this.ctx.fillStyle = 'transparent';
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
