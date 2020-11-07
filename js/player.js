"use-strict"

class Player {
  constructor(canvas, lives){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 10;
    this.y = this.canvas.height/2;
    this.width = 80;
    this.height = 120;
    this.velY = 0;
    this.velX = 0
    this.speed = 4;
    this.friction = 0.9;
    this.lives = lives;
    this.directionY = 0;
    this.directionX = 0;
    this.keys = [];
    this.widthSprite = 1304;
    this.heightSprite = 616;
    this.ticksPerFrame = 2;
    this.numberOfFrames = 2;
    this.frameIndex = 0;
    this.tickCount = 0;
  }
  update(){
    if (this.keys[38]){
      if (this.velY > (-this.speed)) {
        this.velY--;
        // audio.play()
      }
    }
    if (this.keys[40]){
      if (this.velY < this.speed) {
        this.velY++;
        // audio.play()
      }
    }
    if (this.keys[37]){
      if (this.velX > (-this.speed)) {
        this.velX--;
        // audio.play()
      }
    }
    if (this.keys[39]){
      if (this.velX < this.speed) {
        this.velX++;
        // audio.play()
      }
    } 
    this.velY *= this.friction;
    this.y += this.velY;
    this.velX *= this.friction;
    this.x += this.velX;
      

    //this.y = this.y + this.directionY * this.speed;
  }

  renderAnimation(){
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
			// Mirar si el indice esta dentro del frame
      if (this.frameIndex < this.numberOfFrames - 1) {	
        // Ir al siguiente frame
        this.frameIndex += 1;
      } else {
        //Vuelve al frame 0 y crea animacion
        this.frameIndex = 0;
      }
    }
  }
  drawPlayer(){
    let imgNave = new Image();
    imgNave.src = "images/spritesheet (2).png"
    //this.ctx.drawImage(imgNave, this.x, this.y, this.width, this.height)
    this.ctx.drawImage(
      imgNave,
      this.frameIndex * this.widthSprite / this.numberOfFrames,
      0,
      this.widthSprite / this.numberOfFrames,
      this.heightSprite,
      this.x,
      this.y,
      this.width,
      this.height)
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
      let audio = new Audio("sounds/000774930_prev.mp3");
      audio.volume = 0.01;
      audio.play()
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