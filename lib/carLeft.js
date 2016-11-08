function CarLeft(x, y, vx, width){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.height = 50;
  this.width = width;
}

CarLeft.prototype.draw = function (ctx, leftCarImg) {
  ctx.fillStyle = 'transparent';
  ctx.drawImage(leftCarImg, this.x, this.y, this.width, this.height);
  return this;
};

CarLeft.prototype.move = function (width) {
  this.x += this.vx;
  if(this.x > width + 50){
    this.x = -50;
  return this;
  }
};

module.exports = CarLeft;
