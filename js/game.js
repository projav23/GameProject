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
    this.highScore;
    this.bulletsEnemies = [];
    this.isGameOver = false;
    this.points = 0;
    this.bulletOn = false;
    this.pause = false;
  }

  startLoop(){
    //console.log("loop")
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
      let i = Math.floor(Math.random() * this.enemies.length)
      this.bulletsEnemies.push(new BulletEnemies(this.canvas, this.enemies[i].x, this.enemies[i].y + this.enemies[i].width/2))
    }, 1000);

    const loop = () => {
      if (this.bulletOn){
        this.bullets.push(new Bullet(this.canvas, (this.player.x + this.player.width), (this.player.y + this.player.height/2)))
        this.bulletOn = false;
      }
      this.checkAllCollisions();
      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();
      if (!this.isGameOver) {
          window.requestAnimationFrame(loop);
      }
    };

    window.requestAnimationFrame(loop);
  }
  updateCanvas(){
    if (!this.pause){
    //console.log("update")
    this.space.update()
    this.bullets.forEach((bullet)=>{
      bullet.update();
    })
    //this.player.update();
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
    this.bulletsEnemies.forEach((bullet)=>{
      bullet.update();
    })
    }
  }
  clearCanvas(){
    //console.log("clear")
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawCanvas(){
    //console.log("draw")
    this.space.drawSpace()
    this.ctx.fillStyle = "#ff6";
    this.ctx.font = '30px "Droid Sans", arial, verdana, sans-serif';
    this.ctx.fillText(`Score: ${this.points}`,this.canvas.width -200, this.canvas.height -10);
    this.ctx.fillText(`Lives: ${this.player.lives}`,this.canvas.width/2 -50, this.canvas.height -10);
    this.player.drawPlayer()
    this.bullets.forEach((bullet)=>{
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
    //console.log("colision")
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
  };
  gameOverCallback(callback){
    //console.log("gameOver")
    this.onGameOver = callback;
  };
  highScores(){
    console.log("funcion highScore")
    if(localStorage.getItem("highscore") !== null){
      if (this.points > localStorage.getItem("highscore")) {
          localStorage.setItem("highscore", this.points);      
      }
    }
    else{
      console.log("crea highScore")
      localStorage.setItem("highscore", this.points);
    }
  }
}
