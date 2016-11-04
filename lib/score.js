

function Score(){

}

Score.prototype.draw = function(ctx, updateScore) {

  ctx.fillStyle = "black";
  ctx.font = ('30px Arial');
  ctx.fillText(updateScore, 450, 690);
  return this;
}

module.exports = Score;
