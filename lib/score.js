

function Score(){

}

Score.prototype.draw = function(ctx, updateScore) {
  ctx.fillStyle = "white";
  ctx.font = ('30px Krungthep');
  ctx.fillText(updateScore, 112, 686);
  return this;
};

module.exports = Score;
