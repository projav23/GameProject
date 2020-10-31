class Space {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")
    this.x = 0;
    this.width = this.canvas.width;
    this.y = 0;
    this.height = this.canvas.height;
    this.img = "/Users/projav23/Documents/IronHack/ProyectGame/images/diseno-de-paisaje-del-espacio-5771.webp"
  }
  drawSpace(){
    let imgSpace = new Image();
    imgSpace.src = this.img
    this.ctx.drawImage(imgSpace, this.x, this.y, this.width, this.height)
  }
}