"use-strict"

class Player {
  constructor(canvas, lives){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 300;
    this.y = this.canvas.height/2;
    this.width = 80;
    this.height = 40;
    this.speed = 1;
    this.lives = lives;
  }

  update(){
    this.y = this.y + this.direction * this.speed;
  }
  drawPlayer(){
    let imgNave = new Image();
    imgNave.src = "images/car.png"
    this.ctx.drawImage(imgNave, this.x, this.y, this.width, this.height)
  }
  setDirection(direction){
    this.direction = this.direction
  }
  checkScreen(){
    if (this.y - this.height/2 <= 0){
      this.direction = 1
    }else if (this.y + this.height/2 >= this.canvas.height){
      this.direction = -1;
    }
  }
  checkCollisionEnemy(enemy){
    const collideRight = this.x + this.size / 2 > enemy.x - enemy.size / 2;
    const collideLeft = this.x - this.size / 2 < enemy.x + enemy.size / 2;
    const collideTop = this.y + this.size / 2 > enemy.y - enemy.size / 2;
    const collideBottom = this.y - this.size / 2 < enemy.y + enemy.size / 2;

    if (collideRight && collideLeft && collideTop && collideBottom) {
      return true;
    }

    return false;
  }
  loseLives(){
    this.lives--
  }
}