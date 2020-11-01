"use-strict"

const main = () => {
  const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
  };

  let buildSplashScreen = () => {
    buildDom(`
        <section class="splash-screen">
            <h1>Space Invaders</h1>
            <div class="wrapper">
              <a class="buttonStart">Start</a>
            </div>
            <div class="codeBy"><p>Code by Javier Gómez</p></div>
        </section>
        `);
    // let body = document.querySelector("body")
    // body.style.backgroundColor = "black";
  
    let startButton = document.querySelector(".buttonStart");
    startButton.addEventListener("click", buildGameScreen);
  };

  let buildGameScreen = () => {
    buildDom(`
        <section class="game-screen">
            <canvas></canvas>
        </section>
        `);
    document.querySelector(".game-screen").style.height = "790px";
    let width = document.querySelector(".game-screen").offsetWidth;
    let height = document.querySelector(".game-screen").offsetHeight;
    let canvas = document.querySelector("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

    const game = new Game(canvas);
    game.gameOverCallback(buildGameOver);
    
    game.startLoop();
    

    const setPlayerDirection = (event) => {
      if (event.code === "ArrowUp") {
        console.log("Mover")
        game.player.setDirection(-20);
        game.player.update()
      } else if (event.code === "ArrowDown") {
        game.player.setDirection(20);
        game.player.update()
      } 
    };
    const createBulletPlayer = (event) => {
      if (event.code === "Space"){
        game.bulletOn = true;
      }
    }
    document.addEventListener("keydown", setPlayerDirection);
    document.addEventListener("keydown", createBulletPlayer);
  };

  let buildGameOver = () => {
    buildDom(`
    <section class="game-over">
        <h1>Game Over Screen</h1>
        <button class ="restart">Restart</button>
        <button class="menu">Menu</button>
    </section>
    `);

    let restartBtn = document.querySelector(".restart");
    let menuBtn = document.querySelector(".menu");

    restartBtn.addEventListener("click", buildGameScreen)
    menuBtn.addEventListener("click", buildSplashScreen)
  };

  // let buildWin = () => {
  //   buildDom(`
  //   <section class="game-win">
  //       <h1>Has derrota al imperio</h1>
  //       <button class ="playagain">Play Again</button>
  //   </section>
  //   `);

  //   let btnPlayAgain = document.querySelector(".playagain")
  //   btnPlayAgain.addEventListener("click", buildGameScreen)
  // };
  buildSplashScreen();
}

window.addEventListener("load", main)