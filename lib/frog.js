

var Frog = function(x, y, height, width) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
};


Frog.prototype.drawFrog = function(ctx, frogImg) {
  ctx.beginPath();
  ctx.drawImage(frogImg, this.x, this.y, this.width, this.height);
  ctx.fillStyle = "transparent";
  ctx.fill();
  ctx.closePath();
};

Frog.prototype.frogMovement = function(width, height, leftPressed, rightPressed, upPressed, downPressed){
  if(leftPressed && this.x > 30){
    this.frogLeft(leftPressed);
  }
  else if(rightPressed && this.x < width - 80){
    this.frogRight(rightPressed);
  }
  else if(upPressed && this.y > 0){
    this.frogUp(upPressed);
  }
  else if(downPressed && this.y < height - 100){
    this.frogDown(downPressed);
  }
};


Frog.prototype.frogLeft = function(leftPressed){
  this.x -= 50;
  leftPressed = false;
};

Frog.prototype.frogRight = function(rightPressed){
  this.x += 50;
  rightPressed = false;
};

Frog.prototype.frogUp = function(upPressed){
  this.y -= 50;
  upPressed = false;
};

Frog.prototype.frogDown = function(downPressed){
  this.y += 50;
  downPressed = false;
};


module.exports = Frog;
