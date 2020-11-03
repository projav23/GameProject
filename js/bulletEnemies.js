class BulletEnemies {
  constructor(canvas, x, y){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.width = 30
    this.height = 10
    this.direction = 1
    this.speed = 6
  }

  update(){
    this.x = this.x - this.direction * this.speed;
  }
  drawBullet(){
    let imgBullet = new Image();
    imgBullet.src = "images/lasse1.png"
    this.ctx.drawImage(imgBullet, this.x - this.width, this.y, this.width, this.height)
  }
  checkCollisionEnemy(player){
    
    const collideRight = this.x + this.width / 2 > player.x - player.width / 2;
    const collideLeft = this.x - this.width / 2 < player.x + player.width / 2;
    const collideTop = this.y + this.height / 2 > player.y;
    const collideBottom = this.y - this.height / 2 < player.y + player.height;
    if (collideRight && collideLeft && collideTop && collideBottom) {
      return true;
      
    }
    return false;
    
  }
}