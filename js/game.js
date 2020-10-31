"use-strict"

class Game {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player;
    this.enemies = []
    this.isGameOver = false;
    this.points = 0;
  }

  startLoop(){}
  updateCanvas(){}
  clearCanvas(){}
  drawCanvas(){}
  checkAllCollisions(){}
  gameOverCallback(callback){}
}