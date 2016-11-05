

function Score(){

}

Score.prototype.draw = function(ctx, updateScore) {
  ctx.fillStyle = "black";
  ctx.font = ('30px Krungthep');
  ctx.fillText(updateScore, 538, 682);
  return this;
};

module.exports = Score;
