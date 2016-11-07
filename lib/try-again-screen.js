function TryAgain(){
  this.x = 0;
  this.y = 0;
  this.width = 600;
  this.height = 700;
}

TryAgain.prototype.draw = function(ctx, tryAgainImg, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(tryAgainImg, this.x, this.y, this.width, this.height);
  ctx.fillStyle = 'transparent';
};


module.exports = TryAgain;
