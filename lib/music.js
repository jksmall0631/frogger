

var Music = function() {

}







Music.prototype.playMain = function(winMusic, deathMusic, froggerIntro, froggerMusic) {
  winMusic.pause();
  deathMusic.pause();
  froggerIntro.pause();
  froggerMusic.play();
}

Music.prototype.playIntro = function(froggerIntro) {
  froggerIntro.play();
}

Music.prototype.playDeath = function(froggerMusic, deathMusic) {
  froggerMusic.pause();
  deathMusic.play();
}

Music.prototype.playWin = function(winMusic, froggerMusic) {
  froggerMusic.pause();
  winMusic.play();
}

Music.prototype.playHop = function(hopMusic) {
    hopMusic.pause();
    hopMusic.currentTime = 0;
    hopMusic.play();
  }














module.exports = Music;
