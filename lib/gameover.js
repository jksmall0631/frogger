function GameOver(){
  this.x = 0;
  this.y = 0;
  this.width = 600;
  this.height = 700;
}

GameOver.prototype.draw = function(ctx, deadFrogImg, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(deadFrogImg, this.x, this.y, this.width, this.height);
  ctx.fillStyle = 'transparent';
};


module.exports = GameOver;
