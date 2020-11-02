"use-strict"


const main = () => {
  const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
  };

  let buildSplashScreen = () => {
buildDom(`


<h1>STAR WARS<sub>IronHack Wars</sub></h1>

<div id="titles">
  <div id="titlecontent">

    <p class="center">EPISODIO CUARENTENA<br/>
      Una nueva esperanza</p>

    <p>En una galaxia lejana...</p>
    <p>Un soldado imperial es la unica esperando para acabar con todo el ejercito de la Republica.</p>
    <p>Lorem ipsum .</p>
    <p>Also, by mentioning "Star Wars", everyone will understand what I mean. And I'll receive several thousand more visits.</p>
    <p>The scrolling titles work well in Chrome, Safari and Firefox. Opera doesn't implement 3D transforms yet, but the text will scroll. IE users receive a blank page. A shame, but IE10 should support it.</p>
    <p>So how does it work? Wellso has anhe text appears to fade out.</p>
    <p>Inside, we  contains the t tove it upward over time. No JavaScript is required.</p>
    <p>You will probably needtext you want to show. The 3D depth can also be tweaked in the #titles declaration.</p>
    <p>All the cTML file&hellip;</p>
    <p class="center">View the source, Luke!</p>
    <p>Sorry. Couldn't resist it.</p>
    <p></p>
    <p class="center"></p>
    <p>No has podido leer todo porque va muy rapido</p>
    </div>
</div>

        

<section class="splash-screen">
        <div class="button">
          <a href="#">Start Game</a>
        </div>
        <div class="codeBy"><p>Code by Javier Gómez</p></div>
        </section>


      `)
    // buildDom(`
    //     <section class="splash-screen">
    //         <h1>Space Invaders</h1>
    //         <div class="botones">
    //         <div class="button">
    //           <a href="#">Start Game</a>
    //         </div>
    //         </div>
    //         <div class="codeBy"><p>Code by Javier Gómez</p></div>
    //     </section>
    //     `);
    // let body = document.querySelector("body")
    // body.style.backgroundColor = "black";
  
    let startButton = document.querySelector(".button");
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
    

    const setPlayerDirectionY = (event) => {
      if (event.code === "ArrowUp") {
        console.log("Mover")
        game.player.setDirectionY(-20);
        game.player.updateY()
      } else if (event.code === "ArrowDown") {
        game.player.setDirectionY(20);
        game.player.updateY()
      } 
    };
    const setPlayerDirectionX = (event) => {
      if (event.code === "ArrowRight") {
        game.player.setDirectionX(20);
        game.player.updateX()
      } else if (event.code === "ArrowLeft") {
        game.player.setDirectionX(-20);
        game.player.updateX()
      } 
    };
    const createBulletPlayer = (event) => {
      if (event.code === "Space"){
        game.bulletOn = true;
      }
    }
    document.addEventListener("keydown", setPlayerDirectionY);
    document.addEventListener("keydown", setPlayerDirectionX);
    document.addEventListener("keydown", createBulletPlayer);
  };

  let buildGameOver = () => {
    buildDom(`
            <section class="game-over">
            <div class="finalGame">Game Over</div>
            <div class="container">
            <div class="restart">
              <a href="#">Restart</a>
            </div>
            <div class="menu">
              <a href="#">Menu</a>
            </div>
            </div>
            <div>Your score has:</div>
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