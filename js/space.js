class Space {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")
    this.x = 0;
    this.width = this.canvas.width;
    this.y = 0;
    this.height = this.canvas.height;
  }
  drawSpace(){
    let imgSpace = new Image();
    imgSpace.src = "/images/GameScreen.jpeg"
    this.ctx.drawImage(imgSpace, this.x, this.y, this.width, this.height)
  }
}