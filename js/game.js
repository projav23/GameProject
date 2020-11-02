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
    // this.bulletsEnemies = [];
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
      const y = Math.random() * (this.canvas.height - this.enemy.height);
      this.enemies.push(new Enemy(this.canvas, y));
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
          console.log(this.points)
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
  };
  gameOverCallback(callback){
    //console.log("gameOver")
    this.onGameOver = callback;
  };
}
