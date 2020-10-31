"use-strict"

class Enemy {
  constructor(canvas, y, speed){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = this.canvas.width
    this.y = y
    this.speed = speed
    this.direction = -1

  }
  update(){}
  drawEnemy(){}
  setDirection(){}
}