
var leftCarImg = document.getElementById("left-car-img");


function CarLeft(x, y, vx, width, ctx){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.height = 50;
  this.width = width;
  this.ctx = ctx;
}

CarLeft.prototype.draw = function () {
  this.ctx.fillStyle = 'transparent';
  this.ctx.drawImage(leftCarImg, this.x, this.y, this.width, this.height);
  return this;
};

CarLeft.prototype.move = function () {
  this.x += this.vx;
  if(this.x > 600 + 50){
    this.x = -50;
  return this;
  }
};




module.exports = CarLeft;
