

function Score(){

}

Score.prototype.draw = function(ctx) {
  var updateScore = 0;
  ctx.fillStyle = "black";
  ctx.font = ('30px Arial');
  ctx.fillText(updateScore.value, 450, 690);
  return this;
}

module.exports = Score;
