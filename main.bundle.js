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

	var World = __webpack_require__(1);
	var canvas = document.getElementById("frogger");
	var ctx = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;
	var world = new World(canvas, ctx, width, height);

	canvas.focus();

	requestAnimationFrame(function gameLoop() {
	  ctx.clearRect(0, 0, width, height);
	  world.objectLoops();
	  world.drawings();
	  world.leftCarCollision();
	  world.rightCarCollision();
	  world.frogCollision();
	  world.logCollusion();
	  world.turtleCollusion();
	  world.lilyPadCollusion();
	  world.waterDeath();
	  world.tryAgainScreen();
	  world.startTheScreen();
	  world.winScreen();
	  requestAnimationFrame(gameLoop);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Frog = __webpack_require__(2);
	var CarLeft = __webpack_require__(3);
	var CarRight = __webpack_require__(4);
	var Log = __webpack_require__(5);
	var Turtle = __webpack_require__(6);
	var LilyPad = __webpack_require__(7);
	var Score = __webpack_require__(8);
	var GameOver = __webpack_require__(9);
	var StartScreen = __webpack_require__(10);
	var WinScreen = __webpack_require__(11);

	var canvas = document.getElementById("frogger");
	var ctx = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;

	var rightCarImg = document.getElementById("right-car-img");
	var leftCarImg = document.getElementById("left-car-img");
	var frogImg = document.getElementById("frog-img");
	var turtleImg = document.getElementById("turtle-img");
	var thinLogImg = document.getElementById("thin-log-img");
	var deadFrogImg = document.getElementById("dead-frog-img");
	var startScreenImg = document.getElementById("start-screen-img");
	var winImg = document.getElementById("win-img");
	var froggerMusic = document.getElementById("main-audio");
	var froggerIntro = document.getElementById("intro-audio");
	var deathMusic = document.getElementById("death-audio");
	var winMusic = document.getElementById("win-audio");
	var hopMusic = document.getElementById("hop-audio");

	var World = function (canvas, ctx, width, height) {
	  this.canvas = canvas;
	  this.ctx = ctx;
	  this.width = width;
	  this.height = height;
	};

	var frog = new Frog((width - 50) / 2, height - 100, 45, 50);
	var frogs = [];

	frogs.push(new Frog(-5000, 0, 45, 50));
	frogs.push(new Frog(-5000, 0, 45, 50));
	frogs.push(new Frog(-5000, 0, 45, 50));
	frogs.push(new Frog(-5000, 0, 45, 50));
	var frogE = new Frog(550, 650, 45, 50);
	var frogF = new Frog(500, 650, 45, 50);
	var frogG = new Frog(450, 650, 45, 50);
	var score = new Score();
	var gameover = new GameOver();
	var startScreen = new StartScreen();
	var win = new WinScreen();

	var updateScore = 0;
	var death = false;
	var start = false;
	var counter = 0;
	var collide = false;

	document.addEventListener('keydown', function (e) {
	  if (e.keyCode == 37) {
	    e.preventDefault();
	    frog.frogLeft();
	    playHop();
	  }
	  if (e.keyCode == 38) {
	    e.preventDefault();
	    frog.frogUp();
	    playHop();
	    return updateScore += 10;
	  }
	  if (e.keyCode == 39) {
	    e.preventDefault();
	    frog.frogRight();
	    playHop();
	  }
	  if (e.keyCode == 40) {
	    e.preventDefault();
	    frog.frogDown();
	    playHop();
	    return updateScore > 0 ? updateScore -= 10 : updatescore -= 0;
	  }
	});

	World.prototype.drawings = function () {
	  frog.drawFrog(ctx, frogImg);
	  frogs.forEach(function (frogs, i) {
	    frogs.drawFrog(ctx, frogImg);
	  });
	  frogE.drawFrog(ctx, frogImg);
	  frogF.drawFrog(ctx, frogImg);
	  frogG.drawFrog(ctx, frogImg);
	  score.draw(ctx, updateScore);
	};

	World.prototype.objectLoops = function () {
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
	  allLilyPads.forEach(function (lilypad) {
	    lilypad.draw(ctx);
	  });
	};

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

	var allLilyPads = [];

	allLilyPads.push(new LilyPad(90, 0));
	allLilyPads.push(new LilyPad(190, 0));
	allLilyPads.push(new LilyPad(290, 0));
	allLilyPads.push(new LilyPad(390, 0));
	allLilyPads.push(new LilyPad(490, 0));

	function incrementSpeeds() {
	  leftCar.forEach(function (car) {
	    car.vx = car.vx + 0.5;
	  });
	  rightCar.forEach(function (car) {
	    car.vx = car.vx - 0.5;
	  });
	}

	World.prototype.frogCollision = function () {
	  frogs.forEach(function (frogs, i) {
	    if (frog.x < frogs.x + frogs.width && frog.x + frog.width > frogs.x && frog.y < frogs.y + frogs.height && frog.height + frog.y > frogs.y) {
	      frog.x = (width - 50) / 2;
	      frog.y = height - 100;
	      lives--;
	    }
	  });
	};

	World.prototype.leftCarCollision = function () {
	  leftCar.forEach(function (car, i) {
	    if (frog.x < car.x + car.width && frog.x + frog.width > car.x && frog.y < car.y + car.height && frog.height + frog.y > car.y) {
	      frog.x = (width - 50) / 2;
	      frog.y = height - 100;
	      lives--;
	    }
	  });
	};

	World.prototype.rightCarCollision = function () {
	  rightCar.forEach(function (car, i) {
	    if (frog.x < car.x + car.width && frog.x + frog.width > car.x && frog.y < car.y + car.height && frog.height + frog.y > car.y) {
	      frog.x = (width - 50) / 2;
	      frog.y = height - 100;
	      lives--;
	    }
	  });
	};

	World.prototype.logCollusion = function () {
	  allLogs.forEach(function (log, i) {
	    if (frog.x < log.x + log.width - 30 && frog.x + frog.width > log.x + 30 && frog.y < log.y + log.height && frog.height + frog.y > log.y) {
	      frog.x = frog.x + log.vx;
	      frog.y = log.y + 1;
	      collide = true;
	    }
	  });
	};

	World.prototype.turtleCollusion = function () {
	  allTurtles.forEach(function (turtle, i) {
	    if (frog.x < turtle.x + turtle.width - 20 && frog.x + frog.width > turtle.x + 20 && frog.y < turtle.y + turtle.height && frog.height + frog.y > turtle.y) {
	      frog.x = frog.x + turtle.vx;
	      frog.y = turtle.y + 1;
	      collide = true;
	    }
	  });
	};

	World.prototype.lilyPadCollusion = function () {
	  allLilyPads.forEach(function (lilypad, i) {
	    if (frog.x < lilypad.x + lilypad.width && frog.x + frog.width > lilypad.x && frog.y < lilypad.y + lilypad.height && frog.height + frog.y > lilypad.y) {
	      frog.x = lilypad.x - 15;
	      frog.y = lilypad.y + 1;
	      collide = true;
	      frog.x = (width - 50) / 2;
	      frog.y = height - 100;
	      counter++;
	      if (counter === 1) {
	        frogs[0].x = lilypad.x - 15;
	        incrementSpeeds();
	      } else if (counter === 2) {
	        frogs[1].x = lilypad.x - 15;
	        incrementSpeeds();
	      } else if (counter === 3) {
	        frogs[2].x = lilypad.x - 15;
	        incrementSpeeds();
	      } else if (counter === 4) {
	        frogs[3].x = lilypad.x - 15;
	        incrementSpeeds();
	      }
	      return updateScore += 90;
	    }
	  });
	};

	World.prototype.waterDeath = function () {
	  if (frog.y < 300) {
	    if (collide === false) {
	      // gameover.draw(ctx, deadFrogImg, width, height);
	      // death = true;
	      frog.x = (width - 50) / 2;
	      frog.y = height - 100;
	      lives--;
	    } else if (collide === true) {
	      collide = false;
	    }
	  }
	};

	function spaceBarReload() {
	  document.addEventListener('keydown', function (e) {
	    if (e.keyCode == 32) {
	      e.preventDefault();
	      resetDefaults();
	    }
	  });
	}

	function resetDefaults() {
	  lives = 3;
	  frogE.width = 50;
	  frogF.width = 50;
	  frogG.width = 50;
	  frogs.forEach(function (frogs, i) {
	    frogs.x = -5000;
	  });
	  updateScore = 0;
	  frog.x = (width - 50) / 2;
	  frog.y = height - 100;
	  start = true;
	  death = false;
	  playMain();
	}

	function spaceBarRestart() {
	  document.addEventListener('keydown', function (e) {
	    if (e.keyCode == 32) {
	      e.preventDefault();
	      document.location.reload();
	    }
	  });
	}

	World.prototype.startTheScreen = function () {
	  if (start === false) {
	    startScreen.draw(ctx, startScreenImg, width, height);
	    playIntro();
	    spaceBarReload();
	  }
	};

	var lives = 3;

	World.prototype.tryAgainScreen = function () {
	  if (lives === 2) {
	    frogG.width = 0;
	  } else if (lives === 1) {
	    frogF.width = 0;
	  } else if (lives <= 0) {
	    death = true;
	    frogE.width = 0;
	    deathScreen();
	  }
	};

	World.prototype.winScreen = function () {
	  if (counter === 5) {
	    playWin();
	    win.draw(ctx, winImg, this.width, this.height);
	    spaceBarRestart();
	  }
	};

	function deathScreen() {
	  if (lives <= 0) {
	    playDeath();
	    gameover.draw(ctx, deadFrogImg, width, height);
	    spaceBarReload();
	    // resetDefaults();
	    // death = false;
	  }
	}

	function playMain() {
	  deathMusic.pause();
	  froggerIntro.pause();
	  froggerMusic.play();
	}

	function playIntro() {
	  froggerIntro.play();
	}

	function playDeath() {
	  froggerMusic.pause();
	  deathMusic.play();
	}

	function playWin() {
	  froggerMusic.pause();
	  winMusic.play();
	}

	function playHop() {
	  hopMusic.pause();
	  hopMusic.currentTime = 0;
	  hopMusic.play();
	}

	module.exports = World;

/***/ },
/* 2 */
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

	Frog.prototype.frogLeft = function () {
	  if (this.x >= 0 + this.width) {
	    this.x -= 50;
	  }
	};

	Frog.prototype.frogRight = function () {
	  if (this.x + this.width <= 600 - this.width) {
	    this.x += 50;
	  }
	};

	Frog.prototype.frogUp = function () {
	  this.y -= 50;
	};

	Frog.prototype.frogDown = function () {
	  if (this.y <= 550) {
	    this.y += 50;
	  }
	};

	module.exports = Frog;

/***/ },
/* 3 */
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
/* 4 */
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
/* 5 */
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

	module.exports = Log;

/***/ },
/* 6 */
/***/ function(module, exports) {

	function Turtle(x, y, vx, width) {
	  this.x = x;
	  this.y = y;
	  this.vx = vx;
	  this.height = 48;
	  this.width = width;
	}

	Turtle.prototype.draw = function (ctx, turtleImg) {
	  ctx.drawImage(turtleImg, this.x, this.y, this.width, this.height);
	  ctx.fillStyle = 'transparent';
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
/* 7 */
/***/ function(module, exports) {

	function LilyPad(x, y) {
	  this.x = x;
	  this.y = y;
	  this.height = 50;
	  this.width = 20;
	}

	LilyPad.prototype.draw = function (ctx) {
	  ctx.fillStyle = "transparent";
	  ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	module.exports = LilyPad;

/***/ },
/* 8 */
/***/ function(module, exports) {

	

	function Score() {}

	Score.prototype.draw = function (ctx, updateScore) {
	  ctx.fillStyle = "white";
	  ctx.font = '30px Krungthep';
	  ctx.fillText(updateScore, 112, 686);
	  return this;
	};

	module.exports = Score;

/***/ },
/* 9 */
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

/***/ },
/* 10 */
/***/ function(module, exports) {

	function StartScreen() {
	  this.x = 0;
	  this.y = 0;
	  this.width = 600;
	  this.height = 700;
	}

	StartScreen.prototype.draw = function (ctx, startScreenImg, width, height) {
	  ctx.clearRect(0, 0, width, height);
	  ctx.drawImage(startScreenImg, this.x, this.y, this.width, this.height);
	  ctx.fillStyle = 'transparent';
	};

	module.exports = StartScreen;

/***/ },
/* 11 */
/***/ function(module, exports) {

	function WinScreen() {
	  this.x = 0;
	  this.y = 0;
	  this.width = 600;
	  this.height = 700;
	}

	WinScreen.prototype.draw = function (ctx, winImg, width, height) {
	  ctx.clearRect(0, 0, width, height);
	  ctx.drawImage(winImg, this.x, this.y, this.width, this.height);
	  ctx.fillStyle = 'transparent';
	};

	module.exports = WinScreen;

/***/ }
/******/ ]);