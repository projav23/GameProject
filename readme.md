Space invaders version Star Wars

## Descripción

El juego está basado en el mitico Space Invaders pero con tematica de Star Wars. El objetivo del juego es destruir toda la flota enemiga y el boss final (Darth Vader) o permanecer . El jugador debe evitar colisionar con las naves enemigas, que estás llegen a tu al final de su recorrido sin ser destruidas o acabar destruido por un blaster enemigo.

MVP

La nave se podrá mover en el eje Y a lo largo de su ancho y en el X estará limitado. El juego termina cuando la nave es destruida (quedarse sin vidas). El juego se gana si se llega a una puntuacion determinada. Cada destruccion de una nave rival te da un punto.

Estructura de datos

1.index.html
2.main.js
3.game.js
4.space.js
5.player.js
6.enemies.js

1. index.html
2. main.js
   buildDom
   createStartScreen/removeStartScreem
   createGameScreen/removeGameScreem
   createGameOverScreen/removeGameOverScreen
   createWinScreen/removeWinScreen
   startGame/endGame
   Shoots
   MoveControls
3. game.js
   propiedas class Game
   canvas
   ctx
   player
   space
   enemies
   gameOver
   timeScore
   dificultat
   pause
   Metodos
   StartLoop
   CheckCollision
   updateCanvas
   clearCanvas
   DrawCanvas
   GameOver
   Dificultat
   BotonPause
4. space.js
   Propiedades
   canvas
   ctx
   width
   height
   positionX
   positionY
   img
   Metodos
   drawSpace
5. player.js
   propiedades
   canvas
   ctx
   width
   height
   positionX
   positionY
   img
   direction
   speed
   lives
   Metodos
   update
   draw
   setDirection
   checkScreen
   checkCollsionEnenmy
   loseLive
   drawShoots
6. enemy.js
   Propiedades
   canvas
   ctx
   img
   width
   height
   positionX
   positionY
   speed
   direction
   Metodos
   update
   drawEnemy
   setDirection
   drawShoot

States and States Transition

startScreen
Empieza el juego
Ir a la pantalla de juego si le das al boton start
puedes elegir el nivel de dificultat

gameScreen
La partida continua siempre que tengas mas de 0 vidas
Si X naves enemigas llegan al otro lado sin ser destruidas la partida termina o si te quedas sin vidas
Si llegas a la puntuacion ganas la partida

gameoverScreen
Muestra el mensaje de gameOver y la opción de volver a jugar
vuelve a la pantalla de juego si pulsas sobre volver a jugar

winScreen
muestra que has ganado, la puntuacion total, el tiempo en conseguirlo y un boton de volver a jugar y otro de menu
Vuelve a la pantalla de startScreen si pulsas sobre menu
vuelve a la pantalla de juego si pulsas sobre jugar otra vez

Tasks
Crear el repositorio en GitHub
Crear y conectar todos los ficheros: game.js, main.js, player.js, space.js etc...

main.js:
Crear el DOM en
Crear las 3 pantallas en
Crear las transiciones entre pantallas en

game.js:
Crear game constructor
Crear loop

player.js:
crear player constructor

enemy.js:
Crear enemigo constructor

game.js:
Draw enemies
Move enemies
Move player
Check collisions
Check game result
Print score

main.js:
Create ScoreBoard

game.js:
pausar juego

Añadir audios, imagenes, fuentes, animaciones...

Backlog:

Los enemigos tambien pueden disparar cada x tiempo
Atravesar paredes, puedes pasar de arriba a abajo y viceversa
Sonidos del espacio (cuando disparas, pierdes o ganas)
Pausar el juego
Cambiar de dificultat
