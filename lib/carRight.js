var rightCarImg = document.getElementById("right-car-img");

function CarRight(x, y, vx, width, ctx){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.height = 50;
  this.width = width;
  this.ctx = ctx;
}

CarRight.prototype.draw = function () {
  this.ctx.fillStyle = 'transparent';
  this.ctx.drawImage(rightCarImg, this.x, this.y, this.width, this.height);
  return this;
};

CarRight.prototype.move = function () {
  this.x += this.vx;
  if(this.x < -50){
    this.x = 650;
  return this;
  }
};

module.exports = CarRight;
