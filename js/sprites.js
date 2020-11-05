"use-strict"

class Coin {
  constructor(canvas, x, y){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")
    this.x = x;
    this.y = y;
    this.widthSprite = 1000;
    this.heightSprite = 100;
    this.widthCoin = 20;
    this.heightCoin = 20;
    this.ticksPerFrame = 4;
    this.numberOfFrames = 10;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.direction = 1;
    this.speed = 1;
  }
  update(){
    this.x = this.x - this.direction * this.speed
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
  drawCoin(){
    let coinImage = new Image();
    coinImage.src = "images/coin-sprite-animation.png";
    this.ctx.drawImage(
      coinImage,
      this.frameIndex * this.widthSprite / this.numberOfFrames,
      0,
      this.widthSprite / this.numberOfFrames,
      this.heightSprite,
      this.x,
      this.y,
      this.widthCoin,
      this.heightCoin)
      //this.width / this.numberOfFrames,
      //this.height);
  };
  checkCollisionEnemy(player){
    const collideRight = this.x + this.widthCoin / 2 > player.x - player.width / 2;
    const collideLeft = this.x - this.widthCoin / 2 < player.x + player.width / 2;
    const collideTop = this.y + this.heightCoin / 2 > player.y;
    const collideBottom = this.y - this.heightCoin / 2 < player.y + player.height;
    if (collideRight && collideLeft && collideTop && collideBottom) {
      return true;
    }
    return false;
  }

}


class Explosion{
  constructor(canvas, x, y, explosions){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")
    this.x = x;
    this.y = y;
    this.widthSprite = 1000;
    this.heightSprite = 327;
    this.widthExplosion = 50;
    this.heightExplosion = 100;
    this.ticksPerFrame = 5;
    this.numberOfFrames = 13;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.explosions = explosions
    
  }
  update(index){
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
			// Mirar si el indice esta dentro del frame
      if (this.frameIndex < this.numberOfFrames - 1) {	
        // Ir al siguiente frame
        this.frameIndex += 1;
      } else {
        //Vuelve al frame 0 y crea animacion
        //this.frameIndex = 0;
        this.explosions.splice(index, 1)
      }
    }
  }
  drawExplosion(){
    let explosionImage = new Image();
    explosionImage.src = "images/sprites.png";
    this.ctx.drawImage(
      explosionImage,
      this.frameIndex * this.widthSprite / this.numberOfFrames,
      0,
      this.widthSprite / this.numberOfFrames,
      this.heightSprite,
      this.x,
      this.y,
      this.widthExplosion,
      this.heightExplosion)
      //this.width / this.numberOfFrames,
      //this.height);
  };
}

