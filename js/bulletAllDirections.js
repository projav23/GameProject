"use-strict"

class BulletAllDirections {
  constructor(canvas, x, y, xRigth, xLeft, yTop, yBottom){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.xRigth = xRigth;
    this.xLeft = xLeft;
    this.yTop = yTop;
    this.yBottom = yBottom;
    this.width = 100
    this.height = 20
    this.direction = 1
    this.speed = 4
    this.x = x;
    this.y = y
  }
  update(){
    this.xRigth = this.xRigth + this.direction * this.speed;
    this.xLeft = this.xLeft - this.direction  * this.speed;
    this.yTop = this.yTop - this.direction * this.speed;
    this.yBottom = this.yBottom + this.direction  * this.speed;
  }
  drawBullet(){
    let imgBullet = new Image()
    imgBullet.src = "images/laserchuloazul.png"
    let imgBulletIzq = new Image()
    imgBulletIzq.src = "images/laserchuloazulizq.png"
    let imgBulletTop = new Image()
    imgBulletTop.src = "images/laserchuloazultop.png"
    let imgBulletBottom = new Image()
    imgBulletBottom.src = "images/laserchuloazulbottom.png"

    this.ctx.drawImage(imgBullet, this.xRigth - this.width/2, this.y - this.height/2, this.width, this.height)
    this.ctx.drawImage(imgBulletIzq, this.xLeft - this.width/2, this.y - this.height/2, this.width, this.height)
    this.ctx.drawImage(imgBulletTop, this.x, this.yTop - this.width/2, this.height, this.width)
    this.ctx.drawImage(imgBulletBottom, this.x, this.yBottom - this.width/2, this.height, this.width)
  }
  checkCollisionEnemyRigth(enemy){
    const collideRRight = this.xRigth + this.width / 2 > enemy.x - enemy.width / 2;
    const collideRLeft = this.xRigth - this.width / 2 < enemy.x + enemy.width / 2;
    const collideRTop = this.y + this.height / 2 > enemy.y;
    const collideRBottom = this.y - this.height / 2 < enemy.y + enemy.height;
    if (collideRRight && collideRLeft && collideRTop && collideRBottom) {
      let audio = new Audio("sounds/003576076_prev.mp3");
      audio.play();
console.log("rigth")
      return true;
    }
    return false;
  }
  checkCollisionEnemyLeft(enemy){
    const collideLRight = this.xLeft + this.width / 2 > enemy.x - enemy.width / 2;
    const collideLLeft = this.xLeft - this.width / 2 < enemy.x + enemy.width / 2;
    const collideLTop = this.y + this.height / 2 > enemy.y;
    const collideLBottom = this.y - this.height / 2 < enemy.y + enemy.height;
    if (collideLRight && collideLLeft && collideLTop && collideLBottom) {
      let audio = new Audio("sounds/003576076_prev.mp3");
      audio.play();
console.log("left")
      return true;
    }
    return false;
  }
  checkCollisionEnemyTop(enemy){
    const collideTRight = this.x + this.width / 2 > enemy.x - enemy.width / 2;
    const collideTLeft = this.x - this.width / 2 < enemy.x + enemy.width / 2;
    const collideTTop = this.yTop + this.height / 2 > enemy.y;
    const collideTBottom = this.yTop - this.height / 2 < enemy.y + enemy.height;
    if (collideTRight && collideTLeft && collideTTop && collideTBottom) {
      let audio = new Audio("sounds/003576076_prev.mp3");
      audio.play();
console.log("top")
      return true;
    }
    return false;
  }
  checkCollisionEnemyBottom(enemy){
    const collideBRight = this.x + this.width / 2 > enemy.x - enemy.width / 2;
    const collideBLeft = this.x - this.width / 2 < enemy.x + enemy.width / 2;
    const collideBTop = this.yBottom + this.height / 2 > enemy.y;
    const collideBBottom = this.yBottom - this.height / 2 < enemy.y + enemy.height;
    if (collideBRight && collideBLeft && collideBTop && collideBBottom) {
      let audio = new Audio("sounds/003576076_prev.mp3");
      audio.play();
console.log("bottom")
      return true;
    }
    return false;
  }
}