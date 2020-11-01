class Space {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 0;
    this.width = this.canvas.width;
    this.y = 0;
    this.height = this.canvas.height;
    this.img = "images/fondo_estrellado.jpeg";
    this.direction = 1;
    this.speed = 1;
  }
  update(){
  this.x = this.x - this.direction * this.speed;
  if (this.x ===  -this.canvas.width){
    this.x = 0;
  }
  }
  drawSpace(){
    let imgSpace = new Image();
    imgSpace.src = this.img;
    this.ctx.drawImage(imgSpace, this.x, this.y, this.width, this.height);
		this.ctx.drawImage(imgSpace, (this.x + this.canvas.width), this.y, this.width, this.height);
  }
  setDirection(direction){
    this.direction = direction;
  }
}