"use-strict"

class Player {
  constructor(canvas, lives){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 10;
    this.y = this.canvas.height/2;
    this.width = 60;
    this.height = 40;
    this.speed = 3;
    this.lives = lives;
    this.directionY = 1;
    this.directionX = 1;
  }
  updateY(){
    this.y = this.y + this.directionY * this.speed;
  }
  updateX(){
    this.x = this.x + this.directionX * this.speed;
  }
  drawPlayer(){
    let imgNave = new Image();
    imgNave.src = "images/labuena-removebg-preview.png"
    this.ctx.drawImage(imgNave, this.x, this.y, this.width, this.height)
  }
  setDirectionY(directionY){
    this.directionY = directionY
  }
  setDirectionX(directionX){
    this.directionX = directionX
  }
  checkScreen(){
    if (this.y  <= 0){
      this.y = 10 ;
    }else if (this.y  >= this.canvas.height - 90){
      this.y = this.canvas.height - 90 
    } 
    if (this.x + this.width >= this.canvas.width){
      this.y = this.canvas.width - this.width
    } else if (this.x <= 0){
      this.x = 10
    }
  }
  checkCollisionEnemy(enemy){
    const collideRight = this.x + this.width / 2 > enemy.x - enemy.width / 2;
    const collideLeft = this.x - this.width / 2 < enemy.x + enemy.width / 2;
    const collideTop = this.y + this.height / 2 > enemy.y - enemy.height / 2;
    const collideBottom = this.y - this.height / 2 < enemy.y + enemy.height / 2;
    if (collideRight && collideLeft && collideTop && collideBottom) {
      return true;
    }
    return false;
  }
  loseLives(){
    this.lives--
  }
  addLives(){
    this.lives++
  }
}