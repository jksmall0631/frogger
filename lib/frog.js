

var Frog = function(x, y, height, width) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
}


Frog.prototype.drawFrog = function(ctx, frogImg) {
  ctx.beginPath();
  ctx.drawImage(frogImg, this.x, this.y, this.width, this.height);
  ctx.fillStyle = "transparent";
  ctx.fill();
  ctx.closePath();
}

Frog.prototype.frogMovement = function(width, height, leftPressed, rightPressed, upPressed, downPressed){
  if(leftPressed && this.x > 0){
    this.x -= 50;
    leftPressed = false;
  }
  else if(rightPressed && this.x < width - this.width){
    this.x += 50;
    rightPressed = false;
  }
  else if(upPressed && this.y > 0){
    this.y -= 50;
    upPressed = false;
  }
  else if(downPressed && this.y < height - 100){
    this.y += 50;
    downPressed = false;
  }
}


module.exports = Frog;
