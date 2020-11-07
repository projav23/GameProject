"use-strict"

class Enemy {
  constructor(canvas, y){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = this.canvas.width
    this.y = y
    this.speed = 1.5
    this.directionX = -1
    this.directionY = 1
    this.width = 40
    this.height = 50
  }
  update(points){
    if (points <= 1000){
    this.x = this.x + this.directionX * this.speed;
    } else if (points >1000){
      this.x = this.x + this.directionX * 5;
    } else if (points > 3000){
      this.x = this.x + this.directionX * 10;
    }
  this.y = this.y - this.directionY
  }
  checkScreen(){
    if (this.y - this.width <=0){
      this.directionY = -1
    } else if (this.y + this.width >= this.canvas.height){
      this.directionY = 1
    }
  }
  drawEnemy(){
    let imgEnemy = new Image()
    imgEnemy.src = "images/naveEnemiga-removebg-preview.png"
    this.ctx.drawImage(imgEnemy, this.x, this.y, this.width, this.height)
  }
}

