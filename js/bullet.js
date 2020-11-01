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
    this.speed = 4
  }
  update(){
    this.x = this.x + this.direction * this.speed;
  }
  drawBullet(){
    console.log("tendria que pintar laser")
    let imgBullet = new Image();
    imgBullet.src = "images/laserchulo.png"
    this.ctx.drawImage(imgBullet, this.x, this.y - this.height/2, this.width, this.height)
  }
  checkCollisionEnemy(enemy){
    const collideRight = this.x + this.width / 2 > enemy.x - enemy.width / 2;
    const collideLeft = this.x - this.width / 2 < enemy.x + enemy.width / 2;
    const collideTop = this.y + this.height / 2 > enemy.y - enemy.height / 2;
    const collideBottom = this.y - this.height / 2 < enemy.y + enemy.height / 2;
    if (collideRight && collideLeft && collideTop && collideBottom) {
      console.log("true")
      return true;
    }
    console.log("false")
    return false;
    
  }
}