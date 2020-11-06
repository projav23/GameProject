"use-strict"

const main = () => {
  const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
  };
  let buildSplashScreen = () => {
buildDom(`
<audio src="sounds/starwras-guerra-de-las-galaxias-peliculas-.mp3" ></audio>
<h1>STAR WARS<sub>IronHack Wars</sub></h1>
<div id="titles">
  <div id="titlecontent">
    <p class="center">EPISODIO CUARENTENA<br/>
      Una nueva esperanza</p>
    <p>En una galaxia lejana...</p>
    <p>Un soldado imperial es la unica esperando para acabar con todo el ejercito de la Republica.</p>
    <p>Lorem ipsum .</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum urna in ante ultricies malesuada. Curabitur pretium enim in lacus tempus tempor. Fusce sit amet lorem odio. Morbi molestie mauris non ex lobortis porttitor. Phasellus et sodales sapien, ut lacinia velit. In sagittis vitae quam et cursus. Aenean at nunc nunc. Cras pulvinar consequat congue. Vestibulum feugiat magna a tellus venenatis ultrices. Quisque ex nisl, pellentesque in massa sed, auctor consectetur purus. Suspendisse eget elementum tellus. In eu dui sed mauris vulputate dictum ac quis nisl. Duis venenatis iaculis consequat. Sed id eleifend quam. Donec sodales enim condimentum odio facilisis, sit amet vestibulum quam sodales.</p>
    <p class="center"></p>
    <p></p>
    <p class="center"></p>
    <p>No has podido leer todo porque va muy rapido</p>
    </div>
</div>
<section class="splash-screen">
        <div class="button">
          <a href="#">Start Game</a>
        </div>
        <div class="controls">
          <a href="#">How to play</a>
        </div>
        <div class="codeBy"><p>Code by Javier Gómez</p></div>
</section>
      `)

   setTimeout(() => {
    document.querySelector("audio").play();
    document.querySelector("audio").volume = 0.01;
   }, 3000);
   
    document.body.style.backgroundImage = "none"
    let startButton = document.querySelector(".button");
    startButton.addEventListener("click", buildGameScreen);
    let controlButton = document.querySelector(".controls");
    controlButton.addEventListener("click", buildControls);

  };
  let buildControls = () => {
    buildDom(`
    <section class="controls-screen">
      <div class="howToPlay">Keyboard controls</div>
      <img  id="keyboard-controls" src="images/control_bien-removebg-preview (1).png" alt="">
      <div class="explain">
      <p id="move">Move</p>
      <p id="shoot">Shoot</p>
      <p id="pause">Pause/Continue</p>
      </div>
      <div class="backMenu">
      <a href="#">Back</a>
      </div>
    </section>
    `)
    document.querySelector(".backMenu").addEventListener("click", buildSplashScreen)
  };

  let buildGameScreen = () => {
    buildDom(`
        <section class="game-screen">
            <canvas></canvas>
            <audio src="sounds/la-brisa_1.mp3" loop></audio>
        </section>
        `);
    document.querySelector("audio").volume = 0.03
    document.querySelector("audio").play()
    document.body.style.backgroundImage = "none"
    //document.querySelector(".game-screen").style.height = "790px";
    let width = document.querySelector("main").offsetWidth;
    let height = document.querySelector("main").offsetHeight;
    let canvas = document.querySelector("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    const game = new Game(canvas);
    game.gameOverCallback(buildGameOver);
    game.startLoop();
    // const setPlayerDirectionY = (event) => {
    //   if (event.code === "ArrowUp") {
    //     if (game.player.velY >  -game.player.speed) {
    //       game.player.velY--;
    //     }
    //     game.player.velY *= game.player.friction;
    //     game.player.y += game.player.velY;
    //     //game.player.setDirectionY(1);
    //     //game.player.updateY()
    //   } else if (event.code === "ArrowDown") {
    //     if (game.player.velY < game.player.speed) {
    //       game.player.velY++;
    //     }
    //     game.player.velY *= game.player.friction;
    //     game.player.y += game.player.velY;
    //     //game.player.setDirectionY(-1);
    //     //game.player.updateY()
    //   } 
    // };
    // const setPlayerDirectionX = (event) => {
    //   if (event.code === "ArrowRight") {
    //     if (player.velX < player.speed) {
    //       player.velX++;
    //   }
    //     //game.player.setDirectionX(20);
    //     //game.player.updateX()
    //   } else if (event.code === "ArrowLeft") {
    //     if (player.velX > -player.speed) {
    //       player.velX--;
    //   }
    //     //game.player.setDirectionX(-20);
    //     //game.player.updateX()
    //   } 
    // };
    const createBulletPlayer = (event) => {
      if (event.code === "Space"){
        game.bulletOn = true;
        let audio = new Audio("sounds/007132157_prev.mp3");
        audio.volume = 0.01;
        audio.play();
      }
    }
    const bulletAllDirections = (event) => {
      if (event.code === "KeyX"){
        game.weapon = true;
        let audio = new Audio("sounds/007132157_prev.mp3");
        audio.volume = 0.01;
        audio.play();
      }
    }
    function togglePause(){
      let canvasPause = document.querySelector("canvas");
      let ctxPause = canvasPause.getContext("2d")
      if (!game.pause){
        game.pause = true;
        ctxPause.fillStyle = "rgba(155, 155, 155, 0.322)";
        ctxPause.font = '80px "Droid Sans", arial, verdana, sans-serif';
        ctxPause.fillText(`Game paused`,canvasPause.width/2 -200, canvasPause.height/2);
        ctxPause.fillStyle = "rgba(155, 155, 155, 1)";
        ctxPause.font = '20px "Droid Sans", arial, verdana, sans-serif';
        ctxPause.fillText("Press key P to continue again",canvasPause.width/2 -60, canvasPause.height/2 + 60)
      } else if (game.pause){
        game.pause= false;
      }
    }
    const pausedGame = (event) => {
      if (event.code === "KeyP"){
        togglePause()
      }
    }
    document.addEventListener("keydown", pausedGame);
    //document.addEventListener("keydown", setPlayerDirectionY);
    document.addEventListener("keydown", function(e) {
      game.player.keys[e.keyCode] = true;
    });
    document.addEventListener("keyup", function(e) {
      game.player.keys[e.keyCode] = false;
    });
    //document.addEventListener("keydown", setPlayerDirectionX);
    document.addEventListener("keydown", createBulletPlayer);
    document.addEventListener("keydown", bulletAllDirections);
  };
  let buildGameOver = (score) => {
    buildDom(`
            <video id="myVideo" src="images/JAvi pesado.m4v" autoplay></video>
            <section class="game-over">
            <div class="containerAll">
            <div class="finalGame">Game Over
            </div>
            <div class="container">
            <div class="restart">
              <a href="#">Restart</a>
            </div>
            <div class="menu">
              <a href="#">Menu</a>
            </div>
            </div>
            <div class="score">Your score: ${score}</div>
            <div class="highScore">BestScore: ${localStorage.getItem("highscore")}</div>
            </div>
            </section>
            `);
    document.body.style.backgroundImage = "none)"
    //document.querySelector("#myVideo").style.backgroundSize = "cover"
    let restartBtn = document.querySelector(".restart");
    let menuBtn = document.querySelector(".menu");
    restartBtn.addEventListener("click", buildGameScreen)
    menuBtn.addEventListener("click", buildSplashScreen)
  };
  buildSplashScreen();
}
window.addEventListener("load", main)