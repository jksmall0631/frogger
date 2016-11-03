

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

Frog.prototype.frogMovement = function(width, height, leftPressed, rightPressed, upPressed, downPressed, frog){
  if(leftPressed && this.x > 0){
    frog.frogLeft();
  }
  else if(rightPressed && this.x < width - this.width){
    frog.frogRight();
  }
  else if(upPressed && this.y > 0){
    frog.frogUp();
  }
  else if(downPressed && this.y < height - 100){
    frog.frogDown();
  }
}


Frog.prototype.frogLeft = function(width, height, leftPressed){
  this.x -= 50;
  leftPressed = false;
}

Frog.prototype.frogRight = function(width, height, rightPressed){
  this.x += 50;
  rightPressed = false;
}

Frog.prototype.frogUp = function(width, height, upPressed){
  this.y -= 50;
  upPressed = false;
}

Frog.prototype.frogDown = function(width, height, downPressed){
  this.y += 50;
  downPressed = false;
}


module.exports = Frog;
