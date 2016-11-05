function LilyPad(x, y){
  this.x = x;
  this.y = y;
  this.height = 50;
  this.width = 50;
}

LilyPad.prototype.draw = function(ctx){
  ctx.fillStyle = "black";
  ctx.fillRect(this.x, this.y, this.width, this.height);
 };

module.exports = LilyPad;
