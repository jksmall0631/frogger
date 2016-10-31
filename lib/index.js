var canvas = document.getElementById("frogger");
var ctx = canvas.getContext("2d");

var x = canvas.height;
var y = canvas.width;


function drawFrog() {
  ctx.beginPath();
  ctx.arc(y/2, x-10, 10, 0, Math.PI*2);
  ctx.fillStyle = "000000";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawFrog();
  x += dx;
  y += dy;
}

setInterval(draw, 10);
