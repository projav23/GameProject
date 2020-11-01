"use-strict"

class Player {
  constructor(canvas, lives){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 10;
    this.y = this.canvas.height/2;
    this.width = 100;
    this.height = 90;
    this.speed = 1;
    this.lives = lives;
    this.direction = 0;
  }

  update(){
    this.y = this.y + this.direction * this.speed;
    //this.x = this.x + this.direction * this.speed;
  }
  drawPlayer(){
    let imgNave = new Image();
    imgNave.src = "images/labuena-removebg-preview.png"
    //imgNave.src = "images/laserchulo.png"
    this.ctx.drawImage(imgNave, this.x, this.y, this.width, this.height)
  }

  setDirection(direction){
    this.direction = direction
  }
  checkScreen(){
    if (this.y  <= 0){
      this.y = 10 ;
    }else if (this.y  >= this.canvas.height - 90){
      this.y = this.canvas.height - 90 
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
    console.log("una vida menos")
    this.lives--
  }
}