 ## Space invaders version Star Wars
![](https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSW9DRz4vIFvicGo98Fno_J647JCrejNMAEgg&usqp=CAU)

## Descripción

- El juego está basado en el mitico **Space Invaders** pero con tematica de **Star Wars**. El objetivo del juego es destruir el máximo numero de naves enemigas. El jugador veré llegar su final si colisiona 3 veces con una nave enemiga o acaba destruido por un laser del enemigo. 

 ## MVP

- La nave se podrá mover en el eje Y y X a lo largo de su ancho. El juego termina cuando la nave es destruida el jugador se queda sin vidas por colisiones con naves o si es destruido por un laser. Cada nave enemiga son 25 puntos. Debes intentar conseguir el máximo de puntación.

## Estructura de datos

1. index.html
2. main.js
3. game.js
4. space.js
5. player.js
6. enemies.js

### Index.html
### main.js
   - buildDom
   - createStartScreen/removeStartScreem
   - createGameScreen/removeGameScreem
   - createGameOverScreen/removeGameOverScreen
   - createWinScreen/removeWinScreen
   - startGame/endGame
   - Shoots
   - MoveControls

### Game.js
   #### Propiedades 
   - canvas
   - ctx
   - player
   - space
   - enemies
   - gameOver
   - timeScore
   - dificultat
   - pause

   #### Metodos
   - StartLoop
   - CheckCollision
   - updateCanvas
   - clearCanvas
   - DrawCanvas
   - GameOver
   - Dificultat
   - BotonPause

### Space.js
   #### Propiedades
   - canvas
   - ctx
   - width
   - height
   - positionX
   - positionY
   - img

   #### Metodos
   - drawSpace

### Player.js
   #### Propiedades
   - canvas
   - ctx
   - width
   - height
   - positionX
   - positionY
   - img
   - direction
   - speed
   - lives

   #### Metodos
   - update
   - draw
   - setDirection
   - checkScreen
   - checkCollsionEnenmy
   - loseLive
   - drawShoots

### Enemy.js
   #### Propiedades
   - canvas
   - ctx
   - img
   - width
   - height
   - positionX
   - positionY
   - speed
   - direction

   #### Metodos
   - update
   - drawEnemy
   - setDirection
   - drawShoot

## States and States Transition

### StartScreen
- Empieza el juego
- Ir a la pantalla de juego si le das al boton start
- puedes elegir el nivel de dificultat

### GameScreen
- La partida continua siempre que tengas mas de 0 vidas
- Si X naves enemigas llegan al otro lado sin ser destruidas la partida termina o si te quedas sin vidas
- Si llegas a la puntuacion ganas la partida

### GameoverScreen
- Muestra el mensaje de gameOver y la opción de volver a jugar
- vuelve a la pantalla de juego si pulsas sobre volver a jugar

### WinScreen
- muestra que has ganado, la puntuacion total, el tiempo en conseguirlo y un boton de volver a jugar y otro de menu
- Vuelve a la pantalla de startScreen si pulsas sobre menu
- vuelve a la pantalla de juego si pulsas sobre jugar otra vez

## Tasks
- Crear el repositorio en GitHub
- Crear y conectar todos los ficheros: game.js, main.js, player.js, space.js etc...

**main.js:**
- Crear el DOM en
- Crear las 3 pantallas en
- Crear las transiciones entre pantallas en

**game.js:**
- Crear game constructor
- Crear loop

**player.js:**
- crear player constructor

**enemy.js:**
- Crear enemigo constructor

**game.js:**
- Draw enemies
- Move enemies
- Move player
- Check collisions
- Check game result
- Print score

**main.js:**
- Create ScoreBoard

**game.js:**
- Añadir audios, imagenes, fuentes, animaciones...

## Backlog:

- Los enemigos tambien pueden disparar cada x tiempo.
- Atravesar paredes, puedes pasar de arriba a abajo y viceversa.
- Sonidos del espacio (cuando disparas, pierdes o ganas).
- Pausar el juego.
- Cambiar de dificultat.


Pendientes:

Corregir el lag que hay en el juego
//Colocar enemigos en columnas
//Que los enemigos disparen random
//Añadir highScores
Añadir boton de controles
Hacer que con el tiempo, las naves vayan mas rapido y salgan más
Movimiento de la nave mas fluido
Añadir sonido inicial juego - BSO
Pintar pausa cuando este parado el juego y pulsar p para reanudar




