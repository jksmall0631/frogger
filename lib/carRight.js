var canvas = document.getElementById("frogger");
var ctx = canvas.getContext("2d");
var rightCarImg = document.getElementById("right-car-img");

function CarRight(x, y, vx, width){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.height = 50;
  this.width = width;
}



CarRight.prototype.draw = function () {
  ctx.fillStyle = 'transparent';
  ctx.drawImage(rightCarImg, this.x, this.y, this.width, this.height);
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
