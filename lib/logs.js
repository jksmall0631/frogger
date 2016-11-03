function Log(x, y, vx, width){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.height = 48;
  this.width = width;
}

Log.prototype.draw = function (ctx, thinLogImg) {
  ctx.drawImage(thinLogImg, this.x, this.y, this.width, this.height);
  ctx.fillStyle = "transparent";
  return this;
};

Log.prototype.move = function (width) {
  this.x += this.vx;
  if(this.x > width + 50){
    this.x = -200;
  return this;
  }
};

function logCollusion(){
  allLogs.forEach(function(log, i){
  if (frog.x < log.x + log.width &&
   frog.x + frog.width > log.x &&
   frog.y < log.y + log.height &&
   frog.height + frog.y > log.y) {
     (frog.x = log.x + 1);
     (frog.y = log.y + 1);
     }
});
}


module.exports = Log;
