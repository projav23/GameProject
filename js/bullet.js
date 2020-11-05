"use-strict"

class Bullet {
  constructor(canvas, x, y){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.width = 100
    this.height = 20
    this.direction = 1
    this.speed = 8
  }
  update(){
    this.x = this.x + this.direction * this.speed;
  }
  drawBullet(){
    let imgBullet = new Image();
    imgBullet.src = "images/laserchuloverde.png"
    this.ctx.drawImage(imgBullet, this.x, this.y - this.height/2, this.width, this.height)
  }
  checkCollisionEnemy(enemy){
    const collideRight = this.x + this.width / 2 > enemy.x - enemy.width / 2;
    const collideLeft = this.x - this.width / 2 < enemy.x + enemy.width / 2;
    const collideTop = this.y + this.height / 2 > enemy.y;
    const collideBottom = this.y - this.height / 2 < enemy.y + enemy.height;
    if (collideRight && collideLeft && collideTop && collideBottom) {
      let audio = new Audio("sounds/003576076_prev.mp3");
      audio.play();

      return true;
    }
    return false;
  }
}