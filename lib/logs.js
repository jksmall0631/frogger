var canvas = document.getElementById("frogger");
var ctx = canvas.getContext("2d");
var thinLogImg = document.getElementById("thin-log-img");


function Log(x, y, vx, width){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.height = 48;
  this.width = width;
}

Log.prototype.draw = function () {
  ctx.drawImage(thinLogImg, this.x, this.y, this.width, this.height);
  ctx.fillStyle = "transparent";
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
