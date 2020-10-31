"use-strict"

class Player {
  constructor(canvas, lives){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 0;
    this.y = this.canvas.height/2;
    this.width = 0;
    this.height = 0;
    this.speed = 0;
    this.lives = lives;
  }

  update(){}
  drawPlayer(){}
  setDirection(){}
  checkScreen(){}
  checkCollisionEnemy(){}
  loseLives(){this.lives--}
}