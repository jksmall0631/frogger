function StartScreen(){
  this.x = 0;
  this.y = 0;
  this.width = 600;
  this.height = 700;
}

StartScreen.prototype.draw = function(ctx, startScreenImg, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(startScreenImg, this.x, this.y, this.width, this.height);
  ctx.fillStyle = 'transparent';
};


module.exports = StartScreen;
