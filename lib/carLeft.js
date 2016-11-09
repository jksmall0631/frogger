var canvas = document.getElementById("frogger");
var ctx = canvas.getContext("2d");
var leftCarImg = document.getElementById("left-car-img");


function CarLeft(x, y, vx, width){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.height = 50;
  this.width = width;
}

CarLeft.prototype.draw = function () {
  ctx.fillStyle = 'transparent';
  ctx.drawImage(leftCarImg, this.x, this.y, this.width, this.height);
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
