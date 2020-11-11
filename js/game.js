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
    this.explosionsBoss = [];
    this.highScore;
    this.bulletsEnemies = [];
    this.bulletsBoss = [];
    this.boss = [];
    this.isGameOver = false;
    this.points = 0;
    this.bulletOn = false;
    this.doubleBulletOn = false;
    this.pause = false;
    this.weapon = false;
    this.gameTime = 0
    this.intervalIDEnemy = null;
    this.intervalIDBullet = null;
    this.time = 0;
    // this.intervalIDBulletBoss = null;
    this.count = 1;
  }

  startLoop(){
    this.enemy = new Enemy(this.canvas)
    this.player = new Player(this.canvas, 3)
    this.space = new Space(this.canvas);
    this.bullet = new Bullet(this.canvas, (this.player.width), (this.player.y + this.player.height/2))
    
    this.intervalIDEnemy= setInterval(() => {
      if (!this.pause){
        const y = Math.random() * (this.canvas.height - this.enemy.height);
        this.enemies.push(new Enemy(this.canvas, y));
      }
    }, 2000);

    this.intervalIDRock = setInterval(() => {
      if (!this.pause){
      let y = Math.floor(Math.random()* this.canvas.height)
      this.rocks.push(new Rock(this.canvas, this.canvas.width, y, 2))
      }
    }, 7000);
    
    this.intervalIDBullet = setInterval(() => {
      if (!this.pause){
      let i = Math.floor(Math.random() * this.enemies.length)
      this.bulletsEnemies.push(new BulletEnemies(this.canvas, this.enemies[i].x, this.enemies[i].y + this.enemies[i].width/2))
      }
    }, 3000);


    const loop = () => {
      if (!this.pause){
        this.time++;
        if (this.time === (5000 * this.count)){
          this.boss.push(new BossEnemy(this.canvas, this.player.y, (this.count * 30)));
          this.time = 0;
          this.count++
        }
        if (Math.random() > 0.98 && this.boss.length){
          let i = Math.floor(Math.random() * this.boss.length)
          this.bulletsBoss.push(new BulletBoss(this.canvas, this.boss[i].x + this.boss[i].width/3, this.boss[i].y + this.boss[i].width/3))
          }
        
        if (this.bulletOn){
          this.bullets.push(new Bullet(this.canvas, (this.player.x + this.player.width), (this.player.y + this.player.height/2)))
          this.bulletOn = false;
        }
        if (this.doubleBulletOn){
          this.doubleBullet.push(new BulletExtremeLeft(this.canvas, (this.player.x + this.player.width), (this.player.y  )))
          this.doubleBullet.push(new BulletExtremeRigth(this.canvas, (this.player.x + this.player.width), (this.player.y + this.player.height - 20)))
          this.doubleBulletOn = false;
        }
        if (this.weapon){
          this.bulletsAll.push(new BulletLeft(this.canvas, this.player.x, this.player.y + this.player.height/2))
          this.bulletsAll.push(new BulletRigth(this.canvas,(this.player.x + this.player.width), (this.player.y + this.player.height/2)))
          this.bulletsAll.push(new BulletTop(this.canvas,(this.player.x + this.player.width/2), this.player.y))
          this.bulletsAll.push(new BulletBottom(this.canvas,(this.player.x + this.player.width/2), (this.player.y + this.player.height)))
          this.weapon = false;
        }
        if (Math.floor(Math.random() * 100000) > 99990){
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
    this.space.update();
    this.player.update();
    this.player.renderAnimation();
    this.boss.forEach((boss)=>{
      boss.update();
    });
    this.bullets.forEach((bullet)=>{
      bullet.update();
    });
    this.doubleBullet.forEach((bullet)=>{
      bullet.update();
    });
    this.bulletsAll.forEach((bullet)=>{
      bullet.update();
    });
    this.enemies.forEach((enemy) => {
      enemy.update(this.points);
    });
    this.bulletsEnemies.forEach((bullet)=>{
      bullet.update();
    });
    this.bulletsBoss.forEach((bullet)=>{
      bullet.update();
    });
    this.coins.forEach((coin)=>{
      coin.update();
    });
    this.rocks.forEach((rock)=>{
      rock.update();
    });
    this.explosions.forEach((explosion, index)=>{
      explosion.update(index);
    });
    this.explosionsBoss.forEach((explosion, index)=>{
      explosion.update(index);
    });
    
  };
  clearCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
  drawCanvas(){
    this.space.drawSpace();
    this.ctx.fillStyle = "#ff6";
    this.ctx.font = '30px "Droid Sans", arial, verdana, sans-serif';
    this.ctx.fillText(`Score: ${this.points}`,this.canvas.width -200, this.canvas.height -10);
    this.ctx.fillText(`Insert coins: ${this.player.lives}`,this.canvas.width/2 -100, this.canvas.height -10);
    this.player.drawPlayer();
    this.boss.forEach((boss)=>{
      boss.drawEnemy();
    });
    this.coins.forEach((coin)=>{
      coin.drawCoin();
    });
    this.rocks.forEach((rock)=>{
      rock.drawRock();
    });
    this.explosions.forEach((explosion) =>{
      explosion.drawExplosion();
    });
    this.explosionsBoss.forEach((explosion) =>{
      explosion.drawExplosion();
    });
    this.bullets.forEach((bullet)=>{
      bullet.drawBullet();
    });
    this.doubleBullet.forEach((bullet)=>{
      bullet.drawBullet();
    });
    this.bulletsAll.forEach((bullet)=>{
      bullet.drawBullet();
    });
    this.enemies.forEach((enemy)=>{
      enemy.drawEnemy();
    });
    this.bulletsEnemies.forEach((bullet)=>{
      bullet.drawBullet();
    });
    this.bulletsBoss.forEach((bullet)=>{
      bullet.drawBullet();
    });
  }
  checkAllCollisions(){
    //Comprobar si el enemigo choca con los limites
    this.enemies.forEach((enemy)=>{
      enemy.checkScreen();
    });
    //Comprobar si el player choca con los limites
    this.player.checkScreen();
    this.boss.forEach((boss)=>{
      boss.checkScreen();
    })
    //Comprobar si los enemigos se chocan con el jugador
    this.enemies.forEach((enemy, index) => {
      if (this.player.checkCollisionEnemy(enemy)) {
        //Pierde vidas
        let audio = new Audio("sounds/error-fallo 2.mp3");
        audio.volume = 0.02;
        audio.play();
        this.player.loseLives();
        this.explosions.push(new Explosion(this.canvas, enemy.x, enemy.y-75, this.explosions));
        this.enemies.splice(index, 1);
        if (this.player.lives === 0) {
          //Se acaba el juego si no tiene vidas
          this.isGameOver = true;
          this.highScores();
          this.onGameOver(this.points);
          this.points = 0;
        };
      };
    });
    //Comprobar si las balas normales (space) chocan con los enemigos
    this.bullets.forEach((bullet, indexBullet) => {
      this.enemies.forEach((enemy, indexEnemy) => {
        if (bullet.checkCollisionEnemy(enemy)){
          this.points += 25;
          this.explosions.push(new Explosion(this.canvas, enemy.x, enemy.y-75, this.explosions));
          this.enemies.splice(indexEnemy, 1);
          this.bullets.splice(indexBullet, 1);
        };
      });
    });
    //Comprobar si las balas enemigas chocan con el player
    this.bulletsEnemies.forEach((bullet, i)=>{
      if (bullet.checkCollisionEnemy(this.player)){
        this.bulletsEnemies.splice(i, 1)
        let audio = new Audio("sounds/error-fallo 2.mp3");
        audio.volume = 0.02;
        audio.play();
        this.player.loseLives();
        if (this.player.lives === 0) {
          //Se acaba el juego si no tiene vidas
        this.isGameOver = true;
        this.highScores();
        this.onGameOver(this.points);
        this.points = 0;
        }
      };
    });
    //Comprobar si las balas del boss chocan con el player
    this.bulletsBoss.forEach((bullet, i)=>{
      if (bullet.checkCollisionEnemy(this.player)){
        this.bulletsBoss.splice(i, 1)
        let audio = new Audio("sounds/error-fallo 2.mp3");
        audio.volume = 0.02;
        audio.play();
        this.player.loseLives();
        if (this.player.lives === 0) {
          //Se acaba el juego si no tiene vidas
        this.isGameOver = true;
        this.highScores();
        this.onGameOver(this.points);
        this.points = 0;
        }
      };
    });
    //Comprobar si las rocas chocan con los disparos y quitarle una vida a la roca
    this.bullets.forEach((bullet, index) => {
      this.rocks.forEach((rock, i) => {
        if (rock.checkCollisionEnemy(bullet)){
          rock.loseLives();
          this.bullets.splice(index,1);
          if (rock.lives === 0){
            this.rocks.splice(i, 1);
          };
        };
      });
    });
    //Comprobar si las rocas chocan con los disparos y quitarle una vida a la roca
    this.bulletsAll.forEach((bullet, index) => {
      this.rocks.forEach((rock, i) => {
        if (rock.checkCollisionEnemy(bullet)){
          rock.loseLives()
          this.bulletsAll.splice(index,1)
          if (rock.lives === 0){
            this.rocks.splice(i, 1);
          }
        };
      });
    });
    //Comprobar si las rocas chocan con los disparos y quitarle una vida a la roca
    this.doubleBullet.forEach((bullet, index) => {
      this.rocks.forEach((rock, i) => {
        if (rock.checkCollisionEnemy(bullet)){
          rock.loseLives()
          this.doubleBullet.splice(index,1)
          if (rock.lives === 0){
            this.rocks.splice(i, 1);
          }
        };
      });
    });

    //Comprobar si las rocas chocan con el jugador
    this.rocks.forEach((rock, index)=>{
      if (rock.checkCollisionEnemy(this.player)){
        //Si chocan pierdes vida
        let audio = new Audio("sounds/error-fallo 2.mp3");
        audio.volume = 0.02;
        audio.play();
        this.player.loseLives();
        this.rocks.splice(index,1)
        if (this.player.lives === 0) {
          this.isGameOver = true;
          this.highScores()
          this.onGameOver(this.points);
          this.points = 0;
        }
      }
    })
    //Comprobar si ganas una moneda
    this.coins.forEach((coin, index) => {
      if (coin.checkCollisionEnemy(this.player)){
        this.coins.splice(index,1)
        this.player.addLives()
      }
    })
    //Comprobar si el ataque de 4 balas choca con un enemigo
    this.bulletsAll.forEach((bullet, indexBullet) => {
      this.enemies.forEach((enemy, indexEnemy) => {
        if (bullet.checkCollisionEnemy(enemy)){
          this.points += 25;
          this.explosions.push(new Explosion(this.canvas, enemy.x, enemy.y-75, this.explosions))
          this.enemies.splice(indexEnemy, 1);
          this.bulletsAll.splice(indexBullet, 1);
        }
      })
    });
    //Comprobar si las dos balas chocan con un enemigo
    this.doubleBullet.forEach((bullet, indexBullet) => {
      this.enemies.forEach((enemy, indexEnemy) => {
        if (bullet.checkCollisionEnemy(enemy)){
          this.points += 25;
          this.explosions.push(new Explosion(this.canvas, enemy.x, enemy.y-75, this.explosions))
          this.enemies.splice(indexEnemy, 1);
          this.doubleBullet.splice(indexBullet, 1);
        }
      })
    });
    this.bullets.forEach((bullet, index)=>{
      this.boss.forEach((boss, i)=>{
        if (bullet.checkCollisionEnemy(boss)){
          boss.loseLives();
          this.bullets.splice(index, 1)
          if (boss.lives === 0) {
            this.points += 100
            this.explosionsBoss.push(new StarDeath(this.canvas, boss.x, boss.y, this.explosionsBoss))
            this.boss.splice(i,1)
          }
        }
      })
    })
    this.bulletsAll.forEach((bullet, index)=>{
      this.boss.forEach((boss, i)=>{
        if (bullet.checkCollisionEnemy(boss)){
          boss.loseLives();
          this.bulletsAll.splice(index, 1)
          if (boss.lives === 0) {
            this.points +=100
            this.explosionsBoss.push(new StarDeath(this.canvas, boss.x, boss.y, this.explosionsBoss))
            this.boss.splice(i,1)
          }
        }
      })
    })
    this.doubleBullet.forEach((bullet, index)=>{
      this.boss.forEach((boss, i)=>{
        if (bullet.checkCollisionEnemy(boss)){
          boss.loseLives();
          this.doubleBullet.splice(index, 1)
          if (boss.lives === 0) {
            this.points +=100
            this.explosionsBoss.push(new StarDeath(this.canvas, boss.x, boss.y, this.explosionsBoss))
            this.boss.splice(i,1)
          }
        }
      })
    })
    //Borrar si están fuera de los limites
    this.coins.forEach((coin, index) => {
      if (coin.x - coin.widthCoin <=0) {
        this.coins.splice(index, 1)
      }
    });
    //Borrar si salen de los limites
    this.rocks.forEach((rock, index) => {
      if (rock.x - rock.widthRock <=0) {
        this.rocks.splice(index, 1)
      }
    });
    //Borrar si salen de los limites
    this.enemies.forEach((enemy, index) => {
      if (enemy.x - enemy.width <=0) {
        this.enemies.splice(index, 1)
      }
    });
    //Borrar si salen de los limites
    this.bulletsEnemies.forEach((bullet, indexBullet) => {
      if (bullet.x - bullet.width <=0){
        this.bulletsEnemies.splice(indexBullet, 1)
      }
    });
        //Borrar si salen de los limites
        this.bulletsBoss.forEach((bullet, indexBullet) => {
          if (bullet.x - bullet.width <=0){
            this.bulletsBoss.splice(indexBullet, 1)
          }
        });
    //Borrar si salen de los limites
    for (let i = 0; i < this.bulletsAll.length; i++){
      let bullet = this.bulletsAll[i];
      if (bullet.x < 0 || bullet.x > this.canvas.width || bullet.y > this.canvas.height || bullet.y < 0){
        this.bulletsAll.splice(i, 1)
      }
    }
    //Borrar si salen de los limites
    this.doubleBullet.forEach((bullet, index)=>{
      if (bullet.x + bullet.width > this.canvas.width){
        this.doubleBullet.splice(index, 1)
      }
    })
    //Borrar si salen de los limites
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
    console.log("BulletBoss:", this.bulletsBoss)
    console.log("Boss:", this.boss)
 

    };
  gameOverCallback(callback){
    clearInterval(this.intervalIDBullet)
    clearInterval(this.intervalIDEnemy)
    // clearInterval(this.intervalIDBoss)
    this.onGameOver = callback;
  };
  //Añadir highScore cuando acaba el juego
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




