"use-strict"

class Enemy {
  constructor(canvas, y){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = this.canvas.width
    this.y = y
    this.speed = 1.5
    this.direction = -1
    this.width = 40
    this.height = 50
  }
  update(){
    this.x = this.x + this.direction * this.speed;
  }
  checkScreen(){
  }
  drawEnemy(){
    let imgEnemy = new Image()
    imgEnemy.src = "images/naveEnemiga-removebg-preview.png"
    this.ctx.drawImage(imgEnemy, this.x, this.y, this.width, this.height)
  }
}
