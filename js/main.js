"use-strict"

const main = () => {
  const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
  };
  function madeTheForce(){
    let audio = new Audio("sounds/Every Time 'May The Force Be With You' Is Said In Star Wars (mp3cut.net).mp3")
    audio.play()
  }
  let buildSplashScreen = () => {
buildDom(`
<audio src="sounds/starwras-guerra-de-las-galaxias-peliculas-.mp3" ></audio>
<h1>STAR WARS<sub>IronHack Wars</sub></h1>
<div id="titles">
  <div id="titlecontent">
    <p class="center">Episode III<br/>
      REVENGE OF THE SITH</p>
    <p>War! The Republic is crumbling under attacks by the ruthless Sith Lord, Count Dooku.</p>
    <p>There are heroes on both sides. Evil is everywhere</p>
    <p>In a stunning move, the fiendish droid leader, General Grievous, has swept into the Republic capital and kidnapped Chancellor Palpatine, leader of the Galactic Senate.</p>
    <p>As the Separatist Droid Army attempts to flee the besieged capital with their valuable hostage, two Jedi Knights leas a desperate mission to rescue the captive Chancellor...</p>
    </div>
</div>
<section class="splash-screen">
        <div class="button">
          <a href="#">Start Game</a>
        </div>
        <div class="controls">
          <a href="#">How to play</a>
        </div>
        <img src="images/anakin.png" alt="Anakin">
</section>
      `)

  setTimeout(() => {
    document.querySelector("audio").play();
    document.querySelector("audio").volume = 0.01;
  },2000);
    document.body.style.backgroundImage = "none"
    let startButton = document.querySelector(".button");
    startButton.addEventListener("click", buildGameScreen);
    startButton.addEventListener("click", madeTheForce);
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
      <p id="double">Special Shoot</p>
      <p id="four">Double Shoot</p>
      </div>
      <div class="backMenu">
      <img src="images/atras copia.png" alt="">
      </div>
    </section>
    `)
    document.querySelector(".backMenu").addEventListener("click", buildMenuWithOut)
  };
  let buildMenuWithOut = () => {
    buildDom(`
    <section class="splash-screen1">
      <div class="button1">
        <a href="#">Start Game</a>
      </div>
      <div class="controls1">
        <a href="#">How to play</a>
      </div>
      <img src="images/anakin.png" alt="Anakin">
  </section>
  `)
  let startButton = document.querySelector(".button1");
  startButton.addEventListener("click", buildGameScreen);
  let controlButton = document.querySelector(".controls1");
  controlButton.addEventListener("click", buildControls);
  }

  let buildGameScreen = () => {
    setTimeout(() => {
      buildDom(`
        <section class="game-screen">
            <canvas></canvas>
            <audio src="sounds/la-brisa_1.mp3" loop></audio>
        </section>
        `);
    document.querySelector("audio").volume = 0.04
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
    const createBulletPlayer = (event) => {
      if (event.code === "Space" && !game.pause){
        game.bulletOn = true;
        let audio = new Audio("sounds/007132157_prev.mp3");
        audio.volume = 0.01;
        audio.play();
      }
    }
    const createDoubleBulletPlayer = (event) => {
      if (event.code === "KeyC" && !game.pause){
        game.doubleBulletOn = true;
        let audio = new Audio("sounds/008827459_prev.mp3");
        audio.volume = 0.01;
        audio.play();
      }
    }
    const bulletAllDirections = (event) => {
      if (event.code === "KeyX" && !game.pause){
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
        ctxPause.fillText(`Game paused`,canvasPause.width/2 -250, canvasPause.height/2);
        ctxPause.fillStyle = "rgba(155, 155, 155, 1)";
        ctxPause.font = '20px "Droid Sans", arial, verdana, sans-serif';
        ctxPause.fillText("Press key P to continue again",canvasPause.width/2 -120, canvasPause.height/2 + 60)
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
    document.addEventListener("keydown", function(e) {
      game.player.keys[e.keyCode] = true;
    });
    document.addEventListener("keyup", function(e) {
      game.player.keys[e.keyCode] = false;
    });
    document.addEventListener("keydown", createBulletPlayer);
    document.addEventListener("keydown", createDoubleBulletPlayer);
    document.addEventListener("keydown", bulletAllDirections);
  
    }, 2000);
  }
  let createAudioRestart = () =>{
    const audio = new Audio("sounds/Star Wars - Efectos de sonido - Dont fail me again (mp3cut.net).mp3")
    audio.play();
  }
  let buildGameOver = (score) => {
    buildDom(`
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
    document.body.style.backgroundImage = "images/darth-vader.jpg"
    let restartBtn = document.querySelector(".restart");
    let menuBtn = document.querySelector(".menu");
    restartBtn.addEventListener("click", createAudioRestart)
    restartBtn.addEventListener("click", buildGameScreen)
    menuBtn.addEventListener("click", buildSplashScreen)
  };
  buildSplashScreen();
}
window.addEventListener("load", main)


 // <video id="myVideo" src="images/JAvi pesado.m4v" autoplay></video>