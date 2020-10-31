"use-strict"

class Game {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player;
    this.space;
    this.enemies = []
    this.isGameOver = false;
    this.points = 0;
  }

  startLoop(){
    this.player = new Player(this.canvas, 3);
    this.space = new Space(this.canvas);
    const loop = () => {
      console.log("si entra en el loop")
      if (Math.random() > 0.97) {
        const y = Math.random() * this.canvas.height;
        this.enemies.push(new Enemy(this.canvas, y));
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
    //this.space.drawSpace()
    this.player.update();
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
  }
  clearCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawCanvas(){
    this.space.drawSpace()
    this.player.drawPlayer()
    this.enemies.forEach((enemy)=>{
      enemy.drawEnemy();
    })
  }
  checkAllCollisions(){
    this.player.checkScreen();
    this.enemies.forEach((enemy, index) => {
      if (this.player.checkCollisionEnemy(enemy)) {
        this.player.loseLive();
        this.enemies.splice(index, 1);
        if (this.player.lives === 0) {
          this.isGameOver = true;
          this.onGameOver();
        }
      }
    });
  }
  gameOverCallback(callback){
    this.onGameOver = callback;
  }
}