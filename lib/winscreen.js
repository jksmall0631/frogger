function WinScreen(){
  this.x = 0;
  this.y = 0;
  this.width = 600;
  this.height = 700;
}

WinScreen.prototype.draw = function(ctx, winImg, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(winImg, this.x, this.y, this.width, this.height);
  ctx.fillStyle = 'transparent';
};


module.exports = WinScreen;
