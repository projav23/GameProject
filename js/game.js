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
    this.doubleBullet = [];
    this.bulletsAll = [];
    this.coins = [];
    this.rocks = [];
    this.explosions = [];
    this.highScore;
    this.bulletsEnemies = [];
    this.isGameOver = false;
    this.points = 0;
    this.bulletOn = false;
    this.doubleBulletOn = false;
    this.pause = false;
    this.weapon = false;
    this.gameTime = 0
    this.intervalIDEnemy = null;
    this.intervalIDBullet = null;
  }

  startLoop(){

    this.enemy = new Enemy(this.canvas)
    this.player = new Player(this.canvas, 3);
    this.space = new Space(this.canvas);
    this.bullet = new Bullet(this.canvas, (this.player.width), (this.player.y + this.player.height/2))
    
    this.intervalIDEnemy= setInterval(() => {
      if (!this.pause){
        const y = Math.random() * (this.canvas.height - this.enemy.height);
        this.enemies.push(new Enemy(this.canvas, y));
      }
    }, 1000);

    this.intervalIDRock = setInterval(() => {
      if (!this.pause){
      let y = Math.floor(Math.random()* this.canvas.height)
      this.rocks.push(new Rock(this.canvas, this.canvas.width, y))
      }
    }, 5000);
    
    this.intervalIDBullet = setInterval(() => {
      if (!this.pause){
      let i = Math.floor(Math.random() * this.enemies.length)
      this.bulletsEnemies.push(new BulletEnemies(this.canvas, this.enemies[i].x, this.enemies[i].y + this.enemies[i].width/2))
      }
    }, 3000);

    const loop = () => {
      if (this.bulletOn && !this.pause){
        this.bullets.push(new Bullet(this.canvas, (this.player.x + this.player.width), (this.player.y + this.player.height/2)))
        this.bulletOn = false;
      }
      if (this.doubleBulletOn && !this.pause){
        this.doubleBullet.push(new BulletExtremeLeft(this.canvas, (this.player.x + this.player.width), (this.player.y  )))
        this.doubleBullet.push(new BulletExtremeRigth(this.canvas, (this.player.x + this.player.width), (this.player.y + this.player.height - 20)))
        this.doubleBulletOn = false;
      }
      if (this.weapon && !this.pause){
        this.bulletsAll.push(new BulletLeft(this.canvas, this.player.x, this.player.y + this.player.height/2))
        this.bulletsAll.push(new BulletRigth(this.canvas,(this.player.x + this.player.width), (this.player.y + this.player.height/2)))
        this.bulletsAll.push(new BulletTop(this.canvas,(this.player.x + this.player.width/2), this.player.y))
        this.bulletsAll.push(new BulletBottom(this.canvas,(this.player.x + this.player.width/2), (this.player.y + this.player.height)))
        this.weapon = false;
      }
      if (!this.pause){
        if (Math.floor(Math.random() * 100000) > 99850){
          this.coins.push(new Coin(this.canvas, this.canvas.width , Math.floor(Math.random()* this.canvas.height)))
        }
   
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
  updateCanvas(dt){
    this.space.update()
    this.player.update()
    this.bullets.forEach((bullet)=>{
      bullet.update();
    })
    this.doubleBullet.forEach((bullet)=>{
      bullet.update()
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
    this.coins.forEach((coin)=>{
      coin.update()
    })
    this.rocks.forEach((rock)=>{
      rock.update()
    })
    this.explosions.forEach((explosion, index)=>{
      explosion.update(index)
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
    this.ctx.fillText(`Remaining coins: ${this.player.lives}`,this.canvas.width/2 -50, this.canvas.height -10);
    this.player.drawPlayer()
    this.coins.forEach((coin)=>{
      coin.drawCoin()
    })
    this.rocks.forEach((rock)=>{
      rock.drawRock();
    })
    this.explosions.forEach((explosion) =>{
      explosion.drawExplosion()
    })
    this.bullets.forEach((bullet)=>{
      bullet.drawBullet();
    })
    this.doubleBullet.forEach((bullet)=>{
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
    this.enemies.forEach((enemy)=>{
      enemy.checkScreen()
    })
    this.player.checkScreen();
    this.enemies.forEach((enemy, index) => {
      if (this.player.checkCollisionEnemy(enemy)) {
        this.player.loseLives();
        this.explosions.push(new Explosion(this.canvas, enemy.x, enemy.y-enemy.height, this.explosions))
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
          this.explosions.push(new Explosion(this.canvas, enemy.x, enemy.y-enemy.height, this.explosions))
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
    this.rocks.forEach((rock, index)=>{
      if (rock.checkCollisionEnemy(this.player)){
        this.player.loseLives();
        this.rocks.splice(index,1)
      }
    })
    this.coins.forEach((coin, index) => {
      if (coin.checkCollisionEnemy(this.player)){
        this.coins.splice(index,1)
        this.player.addLives()
        if (this.player.lives === 0) {
          this.isGameOver = true;
          this.highScores()
          this.onGameOver(this.points);
          this.points = 0;
        }
      }
    })

    this.bulletsAll.forEach((bullet, indexBullet) => {
      this.enemies.forEach((enemy, indexEnemy) => {
        if (bullet.checkCollisionEnemy(enemy)){
          this.points += 25;
          this.explosions.push(new Explosion(this.canvas, enemy.x, enemy.y-enemy.height, this.explosions))
          this.enemies.splice(indexEnemy, 1);
          this.bulletsAll.splice(indexBullet, 1);
        }
      })
    });
    this.doubleBullet.forEach((bullet, indexBullet) => {
      this.enemies.forEach((enemy, indexEnemy) => {
        if (bullet.checkCollisionEnemy(enemy)){
          this.points += 25;
          this.explosions.push(new Explosion(this.canvas, enemy.x, enemy.y-enemy.height, this.explosions))
          this.enemies.splice(indexEnemy, 1);
          this.doubleBullet.splice(indexBullet, 1);
        }
      })
    });
    //Borrar si están fuera de los limites
    this.coins.forEach((coin, index) => {
      if (coin.x - coin.widthCoin <=0) {
        this.coins.splice(index, 1)
      }
    });
    this.rocks.forEach((rock, index) => {
      if (rock.x - rock.widthRock <=0) {
        this.rocks.splice(index, 1)
      }
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

    for (let i = 0; i < this.bulletsAll.length; i++){
      let bullet = this.bulletsAll[i];
      if (bullet.x < 0 || bullet.x > this.canvas.width || bullet.y > this.canvas.height || bullet.y < 0){
        this.bulletsAll.splice(i, 1)
      }
    }
    this.doubleBullet.forEach((bullet, index)=>{
      if (bullet.x + bullet.width > this.canvas.width){
        this.doubleBullet.splice(index, 1)
      }
    })
    this.bullets.forEach((bullet, index)=>{
      if (bullet.x + bullet.width > this.canvas.width){
        this.bullets.splice(index, 1)
      }
    })

    console.log("newWeapon:",this.bulletsAll)
    console.log("bulletsPlayer:",this.bullets)
    console.log("Enemies:",this.enemies)
    console.log("BulletEnemies:",this.bulletsEnemies)
    console.log("Explosions:",this.explosions)
    console.log("Monedas:",this.coins)
    console.log("Time:",this.time)
    console.log("DoubleBullet:", this.doubleBullet)
    console.log("Rocks:", this.rocks)
    };
  gameOverCallback(callback){
    clearInterval(this.intervalIDBullet)
    clearInterval(this.intervalIDEnemy)
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




