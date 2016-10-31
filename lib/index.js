var canvas = document.getElementById("frogger");
var ctx = canvas.getContext("2d");



function draw() {
  ctx.beginPath();
  ctx.arc(50, 50, 10, 0, Math.PI*2);
  ctx.fillStyle = "000000";
  ctx.fill();
  ctx.closePath();
}

setInterval(draw, 10);
