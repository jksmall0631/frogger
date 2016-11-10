
var thinLogImg = document.getElementById("thin-log-img");


function Log(x, y, vx, width, ctx){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.height = 48;
  this.width = width;
  this.ctx = ctx;
}

Log.prototype.draw = function () {
  this.ctx.drawImage(thinLogImg, this.x, this.y, this.width, this.height);
  this.ctx.fillStyle = "transparent";
  return this;
};

Log.prototype.move = function() {
  this.x += this.vx;
  if(this.x > 600 + 50){
    this.x = -200;
  return this;
  }
};


module.exports = Log;
