"use-strict"

class Enemy {
  constructor(canvas, y){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = this.canvas.width
    this.y = y
    this.speed = 2
    this.directionX = -1
    this.directionY = 1
    this.width = 60
    this.height = 70
  }
  update(points){
    if (points <= 1000){
    this.x = this.x + this.directionX * this.speed;
    } else if (points >1000){
      this.x = this.x + this.directionX * 5;
    } else if (points > 3000){
      this.x = this.x + this.directionX * 10;
    }
  this.y = this.y - this.directionY * this.speed
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

// class BossEnemy {
//   constructor(canvas, y, lives){
//     this.canvas = canvas;
//     this.ctx = this.canvas.getContext("2d");
//     this.y = y;
//     this.x = this.canvas.width -300
//     this.width = 300;
//     this.height = 300;
//     this.lives = lives;
//     this.directionY = 1;
//     this.speed = 2;
//   }
//   update(){
//     this.y = this.y - this.directionY * this.speed
//   }
//   checkScreen(){
//     if (this.y <=0){
//       this.directionY = -1
//     } else if (this.y + this.width >= this.canvas.height){
//       this.directionY = 1
//     }
//   }
//   drawEnemy(){
//     let imgEnemy = new Image()
//     imgEnemy.src = "images/Captura de pantalla 2020-11-08 a las 18.08.38.png"
//     this.ctx.drawImage(imgEnemy, this.x, this.y, this.width, this.height)
//   }
//   loseLives(){
//     this.lives--;
//   }
// }