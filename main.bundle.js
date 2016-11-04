/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var canvas = document.getElementById("frogger");
	var ctx = canvas.getContext("2d");
	var Frog = __webpack_require__(1);
	var CarLeft = __webpack_require__(2);
	var CarRight = __webpack_require__(3);
	var Log = __webpack_require__(4);
	var Turtle = __webpack_require__(5);
	var Score = __webpack_require__(6);
	var GameOver = __webpack_require__(7);

	var width = canvas.width;
	var height = canvas.height;
	var rightCarImg = document.getElementById("right-car-img");
	var leftCarImg = document.getElementById("left-car-img");
	var frogImg = document.getElementById("frog-img");
	var turtleImg = document.getElementById("turtle-img");
	var thinLogImg = document.getElementById("thin-log-img");
	var deadFrogImg = document.getElementById("dead-frog-img");
	var upPressed = false;
	var downPressed = false;
	var leftPressed = false;
	var rightPressed = false;
	var frog = new Frog((width - 50) / 2, height - 100, 45, 50);
	var score = new Score();
	var gameover = new GameOver();

	requestAnimationFrame(function gameLoop() {
	  ctx.clearRect(0, 0, width, height);
	  leftCar.forEach(function (car) {
	    car.draw(ctx, leftCarImg).move(width);
	  });
	  rightCar.forEach(function (car) {
	    car.draw(ctx, rightCarImg).move(width);
	  });
	  allLogs.forEach(function (log) {
	    log.draw(ctx, thinLogImg).move(width);
	  });
	  allTurtles.forEach(function (turtle) {
	    turtle.draw(ctx, turtleImg).move();
	  });
	  frog.drawFrog(ctx, frogImg);

	  leftCarCollision();
	  rightCarCollision();
	  logCollusion();
	  turtleCollusion();
	  waterDeath();
	  frog.frogMovement(width, height, leftPressed, rightPressed, upPressed, downPressed);
	  movementCheck();
	  score.draw(ctx);
	  requestAnimationFrame(gameLoop);
	});

	function movementCheck() {
	  if (leftPressed) {
	    leftPressed = false;
	  } else if (rightPressed) {
	    rightPressed = false;
	  } else if (upPressed) {
	    upPressed = false;
	  } else if (downPressed) {
	    downPressed = false;
	  }
	}

	document.addEventListener('keyup', spaceBar, false);
	document.addEventListener('keyup', keyUpHandler, false);
	document.addEventListener('keydown', keyDownHandler, false);

	function spaceBar(e) {
	  if (e.keycode == 32) {
	    document.location.reload();
	  }
	}

	function keyDownHandler(e) {
	  if (e.keyCode == 37) {
	    if (!leftPressed) {
	      leftPressed = true;
	    }
	  } else if (e.keyCode == 38) {
	    if (!upPressed) {
	      upPressed = true;
	    }
	  } else if (e.keyCode == 39) {
	    if (!rightPressed) {
	      rightPressed = true;
	    }
	  } else if (e.keyCode == 40) {
	    if (!downPressed) {
	      downPressed = true;
	    }
	  }
	}

	function keyUpHandler(e) {
	  if (e.keyCode == 37) {
	    leftPressed = false;
	  } else if (e.keyCode == 38) {
	    upPressed = false;
	  } else if (e.keyCode == 39) {
	    rightPressed = false;
	  } else if (e.keyCode == 40) {
	    downPressed = false;
	  }
	}

	var leftCar = [];
	var rightCar = [];

	leftCar.push(new CarLeft(50, 550, 1, 50));
	leftCar.push(new CarLeft(250, 550, 1, 50));
	leftCar.push(new CarLeft(450, 550, 1, 50));
	rightCar.push(new CarRight(600, 500, -1, 50));
	rightCar.push(new CarRight(400, 500, -1, 50));
	rightCar.push(new CarRight(50, 500, -1, 50));
	leftCar.push(new CarLeft(0, 450, 1, 50));
	leftCar.push(new CarLeft(100, 450, 1, 50));
	leftCar.push(new CarLeft(400, 450, 1, 50));
	rightCar.push(new CarRight(400, 400, -1, 50));
	rightCar.push(new CarRight(150, 400, -1, 50));
	leftCar.push(new CarLeft(300, 350, 1, 50));
	leftCar.push(new CarLeft(100, 350, 1, 50));

	var allLogs = [];

	allLogs.push(new Log(-200, 200, 1, 100));
	allLogs.push(new Log(50, 200, 1, 100));
	allLogs.push(new Log(450, 200, 1, 100));
	allLogs.push(new Log(350, 150, 2, 200));
	allLogs.push(new Log(0, 150, 2, 200));
	allLogs.push(new Log(-200, 50, 1.5, 150));
	allLogs.push(new Log(100, 50, 1.5, 150));
	allLogs.push(new Log(450, 50, 1.5, 150));

	var allTurtles = [];

	allTurtles.push(new Turtle(-100, 251, -1, 150));
	allTurtles.push(new Turtle(250, 251, -1, 150));
	allTurtles.push(new Turtle(600, 251, -1, 150));
	allTurtles.push(new Turtle(-150, 100, -1.5, 150));
	allTurtles.push(new Turtle(50, 100, -1.5, 150));
	allTurtles.push(new Turtle(350, 100, -1.5, 150));
	allTurtles.push(new Turtle(650, 100, -1.5, 150));

	function leftCarCollision() {
	  leftCar.forEach(function (car, i) {
	    if (frog.x < car.x + car.width && frog.x + frog.width > car.x && frog.y < car.y + car.height && frog.height + frog.y > car.y) {
	      // alert("GAME OVER");
	      gameover.draw(ctx, deadFrogImg, width, height);
	      spaceBar();
	    }
	  });
	}

	function rightCarCollision() {
	  rightCar.forEach(function (car, i) {
	    if (frog.x < car.x + car.width && frog.x + frog.width > car.x && frog.y < car.y + car.height && frog.height + frog.y > car.y) {
	      // alert("GAME OVER");
	      gameover.draw(ctx, deadFrogImg, width, height);
	      spaceBar();
	    }
	  });
	}

	var collide = false;

	function logCollusion() {
	  allLogs.forEach(function (log, i) {
	    if (frog.x < log.x + log.width && frog.x + frog.width > log.x && frog.y < log.y + log.height && frog.height + frog.y > log.y) {
	      frog.x = frog.x + log.vx;
	      frog.y = log.y + 1;
	      collide = true;
	    }
	  });
	}

	function turtleCollusion() {
	  allTurtles.forEach(function (turtle, i) {
	    if (frog.x < turtle.x + turtle.width && frog.x + frog.width > turtle.x && frog.y < turtle.y + turtle.height && frog.height + frog.y > turtle.y) {
	      frog.x = frog.x + turtle.vx;
	      frog.y = turtle.y + 1;
	      collide = true;
	    }
	  });
	}

	function waterDeath() {
	  if (frog.y < 300 && frog.y > 50) {
	    if (collide === false) {
	      // alert("GAME OVER");
	      // document.location.reload();
	      gameover.draw(ctx, deadFrogImg, width, height);
	      spaceBar();
	    } else if (collide === true) {
	      collide = false;
	    }
	  }
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	

	var Frog = function (x, y, height, width) {
	  this.x = x;
	  this.y = y;
	  this.height = height;
	  this.width = width;
	};

	Frog.prototype.drawFrog = function (ctx, frogImg) {
	  ctx.beginPath();
	  ctx.drawImage(frogImg, this.x, this.y, this.width, this.height);
	  ctx.fillStyle = "transparent";
	  ctx.fill();
	  ctx.closePath();
	};

	Frog.prototype.frogMovement = function (width, height, leftPressed, rightPressed, upPressed, downPressed) {
	  if (leftPressed && this.x > 30) {
	    this.frogLeft(leftPressed);
	  } else if (rightPressed && this.x < width - 80) {
	    this.frogRight(rightPressed);
	  } else if (upPressed && this.y > 50) {
	    this.frogUp(upPressed);
	  } else if (downPressed && this.y < height - 100) {
	    this.frogDown(downPressed);
	  }
	};

	Frog.prototype.frogLeft = function (leftPressed) {
	  this.x -= 50;
	  leftPressed = false;
	};

	Frog.prototype.frogRight = function (rightPressed) {
	  this.x += 50;
	  rightPressed = false;
	};

	Frog.prototype.frogUp = function (upPressed) {
	  this.y -= 50;
	  upPressed = false;
	};

	Frog.prototype.frogDown = function (downPressed) {
	  this.y += 50;
	  downPressed = false;
	};

	module.exports = Frog;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function CarLeft(x, y, vx, width) {
	  this.x = x;
	  this.y = y;
	  this.vx = vx;
	  this.height = 50;
	  this.width = width;
	}

	CarLeft.prototype.draw = function (ctx, leftCarImg) {
	  ctx.fillStyle = 'transparent';
	  ctx.drawImage(leftCarImg, this.x, this.y, this.width, this.height);
	  return this;
	};

	CarLeft.prototype.move = function (width) {
	  this.x += this.vx;
	  if (this.x > width + 50) {
	    this.x = -50;
	    return this;
	  }
	};

	module.exports = CarLeft;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function CarRight(x, y, vx, width) {
	  this.x = x;
	  this.y = y;
	  this.vx = vx;
	  this.height = 50;
	  this.width = width;
	}

	CarRight.prototype.draw = function (ctx, rightCarImg) {
	  ctx.fillStyle = 'transparent';
	  ctx.drawImage(rightCarImg, this.x, this.y, this.width, this.height);
	  return this;
	};

	CarRight.prototype.move = function () {
	  this.x += this.vx;
	  if (this.x < -50) {
	    this.x = 650;
	    return this;
	  }
	};

	module.exports = CarRight;

/***/ },
/* 4 */
/***/ function(module, exports) {

	function Log(x, y, vx, width) {
	  this.x = x;
	  this.y = y;
	  this.vx = vx;
	  this.height = 48;
	  this.width = width;
	}

	Log.prototype.draw = function (ctx, thinLogImg) {
	  ctx.drawImage(thinLogImg, this.x, this.y, this.width, this.height);
	  ctx.fillStyle = "transparent";
	  return this;
	};

	Log.prototype.move = function (width) {
	  this.x += this.vx;
	  if (this.x > width + 50) {
	    this.x = -200;
	    return this;
	  }
	};

	function logCollusion() {
	  allLogs.forEach(function (log, i) {
	    if (frog.x < log.x + log.width && frog.x + frog.width > log.x && frog.y < log.y + log.height && frog.height + frog.y > log.y) {
	      frog.x = log.x + 1;
	      frog.y = log.y + 1;
	    }
	  });
	}

	module.exports = Log;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function Turtle(x, y, vx, width) {
	  this.x = x;
	  this.y = y;
	  this.vx = vx;
	  this.height = 48;
	  this.width = width;
	}

	Turtle.prototype.draw = function (ctx, turtleImg) {
	  ctx.fillStyle = 'transparent';
	  ctx.drawImage(turtleImg, this.x, this.y, this.width, this.height);
	  return this;
	};

	Turtle.prototype.move = function () {
	  this.x += this.vx;
	  if (this.x < -200) {
	    this.x = 800;
	    return this;
	  }
	};

	module.exports = Turtle;

/***/ },
/* 6 */
/***/ function(module, exports) {

	

	function Score() {}

	Score.prototype.draw = function (ctx) {
	  var updateScore = 0;
	  ctx.fillStyle = "black";
	  ctx.font = '30px Arial';
	  ctx.fillText(updateScore.value, 450, 690);
	  return this;
	};

	module.exports = Score;

/***/ },
/* 7 */
/***/ function(module, exports) {

	function GameOver() {
	  this.x = 0;
	  this.y = 0;
	  this.width = 600;
	  this.height = 700;
	}

	GameOver.prototype.draw = function (ctx, deadFrogImg, width, height) {
	  ctx.clearRect(0, 0, width, height);
	  ctx.drawImage(deadFrogImg, this.x, this.y, this.width, this.height);
	  ctx.fillStyle = 'transparent';
	};

	module.exports = GameOver;

/***/ }
/******/ ]);