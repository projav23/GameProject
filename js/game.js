"use-strict"

class Game {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player;
    this.space;
    this.enemy;
    this.bullet;
    this.enemies = [];
    this.bullets = [];
    this.bulletsAll = [];
    this.highScore;
    this.bulletsEnemies = [];
    this.isGameOver = false;
    this.points = 0;
    this.bulletOn = false;
    this.pause = false;
    this.weapon = false;
  }

  startLoop(){
    this.enemy = new Enemy(this.canvas)
    this.player = new Player(this.canvas, 3);
    this.space = new Space(this.canvas);
    this.bullet = new Bullet(this.canvas, (this.player.width), (this.player.y + this.player.height/2))
    setInterval(() => {
      if (!this.pause){
        const y = Math.random() * (this.canvas.height - this.enemy.height);
        this.enemies.push(new Enemy(this.canvas, y));
      }
    }, 1000);
    setInterval(() => {
      if (!this.pause){
      let i = Math.floor(Math.random() * this.enemies.length)
      this.bulletsEnemies.push(new BulletEnemies(this.canvas, this.enemies[i].x, this.enemies[i].y + this.enemies[i].width/2))
      }
    }, 1000);

    const loop = () => {
      if (this.bulletOn){
        this.bullets.push(new Bullet(this.canvas, (this.player.x + this.player.width), (this.player.y + this.player.height/2)))
        this.bulletOn = false;
      }
      if (this.weapon){
        this.bulletsAll.push(new BulletAllDirections(this.canvas, (this.player.x + this.player.width/2), (this.player.y + this.player.height/2), (this.player.x + this.player.width),this.player.x, this.player.y, (this.player.y + this.player.height)))
        this.bulletsAll.push(new BulletAllDirections(this.canvas, (this.player.x + this.player.width/2), (this.player.y + this.player.height/2), (this.player.x + this.player.width),this.player.x, this.player.y, (this.player.y + this.player.height)))
        this.bulletsAll.push(new BulletAllDirections(this.canvas, (this.player.x + this.player.width/2), (this.player.y + this.player.height/2), (this.player.x + this.player.width),this.player.x, this.player.y, (this.player.y + this.player.height)))
        this.bulletsAll.push(new BulletAllDirections(this.canvas, (this.player.x + this.player.width/2), (this.player.y + this.player.height/2), (this.player.x + this.player.width),this.player.x, this.player.y, (this.player.y + this.player.height)))
        this.weapon = false;
      }
      
      if (!this.pause){
      this.checkAllCollisions();
      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();
      }
      if (!this.isGameOver) {
          window.requestAnimationFrame(loop);
      }
    };

    window.requestAnimationFrame(loop);
  }
  updateCanvas(){
    this.space.update()
    this.bullets.forEach((bullet)=>{
      bullet.update();
    })
    this.bulletsAll.forEach((bullet)=>{
      bullet.update()
    })
    this.enemies.forEach((enemy) => {
      enemy.update(this.points);
    });
    this.bulletsEnemies.forEach((bullet)=>{
      bullet.update();
    })
    
  }
  clearCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawCanvas(){
    this.space.drawSpace()
    this.ctx.fillStyle = "#ff6";
    this.ctx.font = '30px "Droid Sans", arial, verdana, sans-serif';
    this.ctx.fillText(`Score: ${this.points}`,this.canvas.width -200, this.canvas.height -10);
    this.ctx.fillText(`Lives: ${this.player.lives}`,this.canvas.width/2 -50, this.canvas.height -10);
    this.player.drawPlayer()
    this.bullets.forEach((bullet)=>{
      bullet.drawBullet();
    })
    this.bulletsAll.forEach((bullet)=>{
      bullet.drawBullet();
    })
    this.enemies.forEach((enemy)=>{
      enemy.drawEnemy();
    })
    this.bulletsEnemies.forEach((bullet)=>{
      bullet.drawBullet();
    })
  }
  checkAllCollisions(){
    this.player.checkScreen();
    this.enemies.forEach((enemy, index) => {
      if (this.player.checkCollisionEnemy(enemy)) {
        this.player.loseLives();
        this.enemies.splice(index, 1);
        if (this.player.lives === 0) {
          this.isGameOver = true;
          this.highScores()
          this.onGameOver(this.points);
          this.points = 0;
        }
      }
    });
    this.bullets.forEach((bullet, indexBullet) => {
      this.enemies.forEach((enemy, indexEnemy) => {
        if (bullet.checkCollisionEnemy(enemy)){
          this.points += 25;
          this.enemies.splice(indexEnemy, 1);
          this.bullets.splice(indexBullet, 1);
        };
      });
    });
    this.bulletsEnemies.forEach((bullet, i)=>{
      if (bullet.checkCollisionEnemy(this.player)){
        this.bulletsEnemies.splice(i, 1)
        this.isGameOver = true;
        this.highScores()
        this.onGameOver(this.points)
        this.points = 0;
        
      }
    })
    this.bulletsAll.forEach((bullet, indexBullet) => {
      this.enemies.forEach((enemy, indexEnemy) => {
        if (bullet.checkCollisionEnemyRigth(enemy)){
          this.points += 25;
          this.enemies.splice(indexEnemy, 1);
          console.log("primer if")
          this.bulletsAll.splice(indexBullet, 1);
        } else if (bullet.checkCollisionEnemyLeft(enemy)){
          this.points += 25;
          this.enemies.splice(indexEnemy, 1);
          console.log("segundo if")
          this.bulletsAll.splice(indexBullet, 1);
        } else if (bullet.checkCollisionEnemyTop(enemy)){
          this.points += 25;
          this.enemies.splice(indexEnemy, 1);
          console.log("tercero if")
          this.bulletsAll.splice(indexBullet, 1);
        } else if (bullet.checkCollisionEnemyBottom(enemy)){
          this.points += 25;
          this.enemies.splice(indexEnemy, 1);
          console.log("cuarto if")
          this.bulletsAll.splice(indexBullet, 1);
        };
      });
    });
    this.enemies.forEach((enemy, index) => {
      if (enemy.x - enemy.width <=0) {
        this.enemies.splice(index, 1)
      }
    });
    this.bulletsEnemies.forEach((bullet, indexBullet) => {
      if (bullet.x - bullet.width <=0){
        this.bulletsEnemies.splice(indexBullet, 1)
      }
    });
    this.bulletsAll.forEach((bullet, indexBullet) => {
      if (bullet.xLeft <=0){
        console.log("ha salido de los limites izq")
        this.bulletsAll.splice(indexBullet, 1)
      } else if(bullet.xRigth >= this.canvas.width){
        console.log("ha salido de los limites der")
        this.bulletsAll.splice(indexBullet, 1)
      } else if(bullet.yTop - bullet.height <= 0){
        console.log("ha salido de los limites top")
        this.bulletsAll.splice(indexBullet, 1)
      } else if(bullet.yBottom >= this.canvas.heigh){
        console.log("ha salido de los limites bottom")
        this.bulletsAll.splice(indexBullet, 1)
      }
    });

    console.log("newWeapon:",this.bulletsAll)
    // console.log("enemies:",this.enemies)
    // console.log("enemiesWeapon:",this.bulletsEnemies)
  };
  gameOverCallback(callback){
    this.onGameOver = callback;
  };
  highScores(){
    if(localStorage.getItem("highscore") !== null){
      if (this.points > localStorage.getItem("highscore")) {
          localStorage.setItem("highscore", this.points);      
      }
    }
    else{
      localStorage.setItem("highscore", this.points);
    }
  }
}






// this.bulletsAll.push(new BulletAllDirections(this.canvas, (this.player.x + this.player.width), (this.player.y + this.player.height/2)))
// this.bulletsAll.push(new BulletAllDirections(this.canvas, (this.player.x), (this.player.y + this.player.height/2)))
// this.bulletsAll.push(new BulletAllDirections(this.canvas, (this.player.x + this.player.width/2), (this.player.y)))
// this.bulletsAll.push(new BulletAllDirections(this.canvas, (this.player.x + this.player.width/2), (this.player.y + this.player.height)))