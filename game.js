const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp= document.querySelector("#up")
const btnLeft = document.querySelector("#left")
const btnRight = document.querySelector("#right")
const btnDown = document.querySelector("#down")

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;



const playerPosition = {
    x: undefined,
    y: undefined,

}
const goalPosition = {
    x: undefined,
    y: undefined,
}
let enemyPositions = []

window.addEventListener("load",setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize(){
    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth* 0.8
    }else {
        canvasSize = window.innerHeight* 0.8
    };


    // window.innerHeight > window.innerWidth ? canvasSize = window.innerWidth * 0.75: canvasSize =window.innerHeight * 0.75

    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height",canvasSize);

    // console.log(canvasSize)
    correccion = canvasSize / 50;
    elementsSize = canvasSize / 10 ;
    startGame();
}

function startGame(){
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';
  
    const map = maps[level];

    if(!map){
        gameWin();
        return;
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    enemyPositions = []
    game.clearRect(0,0,canvasSize, canvasSize);
    mapRowCols.forEach((row, rowI) => {
      row.forEach((col, colI) => {
        const emoji = emojis[col];
        const posX = elementsSize * (colI + 1);
        const posY = elementsSize * (rowI + 1);


        
        if (col == 'O') {
          if (!playerPosition.x && !playerPosition.y) {
            playerPosition.x = posX;
            playerPosition.y = posY;
        }
        }else if(col== "I"){
            goalPosition.x = posX;
            goalPosition.y = posY;
        }else if(col== "X"){
            enemyPositions.push({x: posX,y: posY});   
        }

        game.fillText(emoji, posX, posY);
      });
    });
  
    movePlayer();
}

function movePlayer(){
    const goalcollisionX = playerPosition.x.toFixed(1) == goalPosition.x.toFixed(1);
    const goalcollisionY = playerPosition.y.toFixed(1) == goalPosition.y.toFixed(1);
    const goalcollision = goalcollisionX && goalcollisionY
    if(goalcollision){
        levelWin(); 
    }
    
    const enemyCollision = enemyPositions.find(enemy =>{
        const collisionBombX = enemy.x.toFixed(1) ==  playerPosition.x.toFixed(1);
        const collisionBombY = enemy.y.toFixed(1) == playerPosition.y.toFixed(1);
        return collisionBombY && collisionBombX;
    })
    
        if(enemyCollision){
            levelFail();
        }
    game.fillText(emojis["PLAYER"],playerPosition.x,playerPosition.y);
}

function levelWin(){
    level++
    startGame()
}
function levelFail(){
    lives--;
    if(lives <= 0){
        level = 0;
        lives = 3;
    }
    playerPosition.x =undefined;
    playerPosition.y =undefined;
    startGame()
}
function gameWin(){
    console.log("terminaste el juego")
}

btnUp.addEventListener("click",moveUp);
btnLeft.addEventListener("click",moveLeft);
btnRight.addEventListener("click",moveRight);
btnDown.addEventListener("click",moveDown);
window.addEventListener("keydown",moveBykeys);

function moveBykeys(event){
    if (event.key == 'ArrowUp') moveUp() ;
    else if (event.key == 'ArrowLeft' ) moveLeft ();
    else if (event.key == 'ArrowRight' ) moveRight ();
    else if (event.key == 'ArrowDown' ) moveDown();
}

function moveUp() {
    if((playerPosition.y - elementsSize) < elementsSize){
        console.log("Out");
    }else{
        playerPosition.y -= elementsSize;
        startGame();
    }
  };
  
  function moveLeft() {
    if((playerPosition.x - elementsSize) < elementsSize){
        console.log("Out");
    }else{
        playerPosition.x -= elementsSize;
        startGame();
    }
  };
  
function moveRight() {
    if((playerPosition.x + elementsSize) > canvasSize){
        console.log("Out");
    }else{
        playerPosition.x += elementsSize;
        startGame();
    }
};
function moveDown() {
    if((playerPosition.y + elementsSize) > canvasSize){
        console.log("Out");
    }else{
        playerPosition.y += elementsSize;
        startGame(); 
    }
  };

