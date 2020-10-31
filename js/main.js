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
            <button>Start</button>
        </section>
        `);
    let startButton = document.querySelector("button");
    startButton.addEventListener("click", buildGameScreen);
  };

  let buildGameScreen = () => {
    buildDom(`
        <section class="game-screen">
            <canvas></canvas>
        </section>
        `);

    let width = document.querySelector(".game-screen").offsetWidth;
    let height = document.querySelector(".game-screen").offsetHeight;
    let canvas = document.querySelector("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

    game.startLoop();

    const setPlayerDirection = (event) => {
      if (event.code === "ArrowUp") {
        game.player.setDirection(-5);
      } else if (event.code === "ArrowDown") {
        game.player.setDirection(5);
      }
    };

    document.addEventListener("keydown", setPlayerDirection);

  }

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
  }

  let buildWin = () => {
    buildDom(`
    <section class="game-win">
        <h1>Has derrota al imperio</h1>
        <button class ="playagain">Play Again</button>
    </section>
    `);

    let btnPlayAgain = document.querySelector(".playagain")
    btnPlayAgain.addEventListener("click", buildGameScreen)
  }
}

window.addEventListener("load", main)