"use-strict"

class BulletLeft {
  constructor(canvas, x, y){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = 100
    this.height = 20
    this.direction = 1
    this.speed = 9
    this.x = x;
    this.y = y
  }
  update(){
    this.x = this.x - this.direction * this.speed
  }
  drawBullet(){
    let imgBullet = new Image()
    imgBullet.src = "images/laserchuloazulizq.png"
    this.ctx.drawImage(imgBullet, this.x - this.width/2, this.y - this.height/2, this.width, this.height)
  }
  checkCollisionEnemy(enemy){
    const collideRight = this.xRigth + this.width / 2 > enemy.x - enemy.width / 2;
    const collideLeft = this.xRigth - this.width / 2 < enemy.x + enemy.width / 2;
    const collideTop = this.y + this.height / 2 > enemy.y;
    const collideBottom = this.y - this.height / 2 < enemy.y + enemy.height;
    if (collideRight && collideLeft && collideTop && collideBottom) {
      let audio = new Audio("sounds/003576076_prev.mp3");
      audio.volume = 0.1;
      audio.play();
      return true;
    }
    return false;
  }
}
class BulletRigth{
  constructor(canvas, x, y){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = 100
    this.height = 20
    this.direction = 1
    this.speed = 9
    this.x = x;
    this.y = y
  }
  update(){
    this.x = this.x + this.direction * this.speed
  }
  drawBullet(){
    let imgBullet = new Image()
    imgBullet.src = "images/laserchuloazul.png"
    this.ctx.drawImage(imgBullet, this.x - this.width/2, this.y - this.height/2, this.width, this.height)
  }
  checkCollisionEnemy(enemy){
    const collideRight = this.x + this.width / 2 > enemy.x - enemy.width / 2;
    const collideLeft = this.x - this.width / 2 < enemy.x + enemy.width / 2;
    const collideTop = this.y + this.height / 2 > enemy.y;
    const collideBottom = this.y - this.height / 2 < enemy.y + enemy.height;
    if (collideRight && collideLeft && collideTop && collideBottom) {
      let audio = new Audio("sounds/003576076_prev.mp3");
      audio.volume = 0.1;
      audio.play();
      return true;
    }
    return false;
  }
}
class BulletTop{
  constructor(canvas, x, y){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = 100
    this.height = 20
    this.direction = 1
    this.speed = 9
    this.x = x;
    this.y = y
  }
  update(){
    this.y = this.y - this.direction * this.speed
  }
  drawBullet(){
    let imgBullet = new Image()
    imgBullet.src = "images/laserchuloazultop.png"
    this.ctx.drawImage(imgBullet, this.x, this.y - this.width/2, this.height, this.width)
  }
  checkCollisionEnemy(enemy){
    const collideRight = this.x + this.width / 2 > enemy.x - enemy.width / 2;
    const collideLeft = this.x - this.width / 2 < enemy.x + enemy.width / 2;
    const collideTop = this.y + this.height / 2 > enemy.y;
    const collideBottom = this.y - this.height / 2 < enemy.y + enemy.height;
    if (collideRight && collideLeft && collideTop && collideBottom) {
      let audio = new Audio("sounds/003576076_prev.mp3");
      audio.volume = 0.1;
      audio.play();
      return true;
    }
    return false;
  }
}
class BulletBottom{
  constructor(canvas, x, y){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = 100
    this.height = 20
    this.direction = 1
    this.speed = 9
    this.x = x;
    this.y = y
  }
  update(){
    this.y = this.y + this.direction * this.speed
  }
  drawBullet(){
    let imgBullet = new Image()
    imgBullet.src = "images/laserchuloazulbottom.png"
    this.ctx.drawImage(imgBullet, this.x, this.y - this.width/2, this.height, this.width)
  }
  checkCollisionEnemy(enemy){
    const collideRight = this.x + this.width / 2 > enemy.x - enemy.width / 2;
    const collideLeft = this.x - this.width / 2 < enemy.x + enemy.width / 2;
    const collideTop = this.y + this.height / 2 > enemy.y;
    const collideBottom = this.y - this.height / 2 < enemy.y + enemy.height;
    if (collideRight && collideLeft && collideTop && collideBottom) {
      let audio = new Audio("sounds/003576076_prev.mp3");
      audio.volume = 0.1;
      audio.play();
      return true;
    }
    return false;
  }
}
class BulletExtremeLeft{
  constructor(canvas, x, y){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = 100
    this.height = 20
    this.direction = 1
    this.speed = 9
    this.x = x;
    this.y = y
  }
  update(){
    this.x = this.x + this.direction * this.speed
  }
  drawBullet(){
    let imgDoubleBulletLeft = new Image()
    imgDoubleBulletLeft.src = "images/laserchuloazul.png"
    this.ctx.drawImage(imgDoubleBulletLeft, this.x, this.y, this.width, this.height)
  }
  checkCollisionEnemy(enemy){
    const collideRight = this.x + this.width > enemy.x;
    const collideLeft = this.x - this.width / 2 < enemy.x + enemy.width / 2;
    const collideTop = this.y + this.height / 2 > enemy.y;
    const collideBottom = this.y - this.height / 2 < enemy.y + enemy.height;
    if (collideRight && collideLeft && collideTop && collideBottom) {
      let audio = new Audio("sounds/003576076_prev.mp3");
      audio.volume = 0.1;
      audio.play();
      return true;
    }
    return false;
  }
}
class BulletExtremeRigth{
  constructor(canvas, x, y){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = 100
    this.height = 20
    this.direction = 1
    this.speed = 9
    this.x = x;
    this.y = y
  }
  update(){
    this.x = this.x + this.direction * this.speed
  }
  drawBullet(){
    let imgDoubleBullet = new Image()
    imgDoubleBullet.src = "images/laserchuloazul.png"
    this.ctx.drawImage(imgDoubleBullet, this.x, this.y, this.width, this.height)
  }
  checkCollisionEnemy(enemy){
    const collideRight = this.x + this.width> enemy.x;
    const collideLeft = this.x - this.width / 2 < enemy.x + enemy.width / 2;
    const collideTop = this.y + this.height / 2 > enemy.y;
    const collideBottom = this.y - this.height / 2 < enemy.y + enemy.height;
    if (collideRight && collideLeft && collideTop && collideBottom) {
      let audio = new Audio("sounds/003576076_prev.mp3");
      audio.volume = 0.1;
      audio.play();
      return true;
    }
    return false;
  }
}
class Bullet {
  constructor(canvas, x, y){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.width = 100
    this.height = 20
    this.direction = 1
    this.speed = 9
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
    const collideRight = this.x + this.width / 2 > enemy.x;
    const collideLeft = this.x - this.width / 2 < enemy.x;
    const collideTop = this.y + this.height / 2 > enemy.y;
    const collideBottom = this.y - this.height / 2 < enemy.y + enemy.height;
    if (collideRight && collideLeft && collideTop && collideBottom) {
      let audio = new Audio("sounds/003576076_prev.mp3");
      audio.volume = 0.1;
      audio.play();

      return true;
    }
    return false;
  }
}
class BulletEnemies {
  constructor(canvas, x, y){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.width = 30
    this.height = 10
    this.direction = 1
    this.speed = 10
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
class BulletBoss {
  constructor(canvas, x, y){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.width = 100
    this.height = 20
    this.direction = 1
    this.speed = 10
  }
  update(){
    this.x = this.x - this.direction * this.speed;
  }
  drawBullet(){
    let imgBullet = new Image();
    imgBullet.src = "images/laserchuloverde copia.png"
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
