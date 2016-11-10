function LilyPad(x, y, ctx){
  this.x = x;
  this.y = y;
  this.height = 50;
  this.width = 20;
  this.ctx = ctx;
}

LilyPad.prototype.draw = function(){
  this.ctx.fillStyle = "transparent";
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = LilyPad;
