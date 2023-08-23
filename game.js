const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp= document.querySelector("#up")
const btnLeft = document.querySelector("#left")
const btnRight = document.querySelector("#right")
const btnDown = document.querySelector("#down")

let canvasSize;
let elementsSize;
let correccion;


const playerPosition = {
    x: undefined,
    y: undefined

}

window.addEventListener("load",setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize(){
    if(window.innerHeight > window.innerWidth){
        canvasSize = (Math.round((window.innerWidth* 0.8) / 100)) * 100
    }else {
        canvasSize = (Math.round((window.innerHeight* 0.8) / 100)) * 100
    };


    // window.innerHeight > window.innerWidth ? canvasSize = window.innerWidth * 0.75: canvasSize =window.innerHeight * 0.75

    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height",canvasSize);

    // console.log(canvasSize)
    correccion = canvasSize / 50;
    elementsSize = canvasSize / 10 ;
    console.log(canvasSize, elementsSize)
    startGame();
}

function startGame(){
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';
  
    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});
    
    game.clearRect(0,0,canvasSize, canvasSize);
    mapRowCols.forEach((row, rowI) => {
      row.forEach((col, colI) => {
        const emoji = emojis[col];
        const posX = elementsSize * (colI + 1) +correccion;
        const posY = elementsSize * (rowI + 1) -correccion;
  
        if (col == 'O') {
          if (!playerPosition.x && !playerPosition.y) {
            playerPosition.x = posX;
            playerPosition.y = posY;
          }
        }
        game.fillText(emoji, posX, posY);
      });
    });
  
    movePlayer();
}


function movePlayer(){
    game.fillText(emojis["PLAYER"],playerPosition.x,playerPosition.y)
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
    if((playerPosition.y - elementsSize) < elementsSize - correccion ){
        console.log("Out");
    }else{
        playerPosition.y -= elementsSize;
        startGame();
    }
  };
  
  function moveLeft() {
    if((playerPosition.x - elementsSize) < elementsSize - correccion ){
        console.log("Out");
    }else{
        playerPosition.x -= elementsSize;
        startGame();
    }
  };
  
function moveRight() {
    if((playerPosition.x + elementsSize) > canvasSize + correccion ){
        console.log("Out");
    }else{
        playerPosition.x += elementsSize;
        startGame();
    }
};
function moveDown() {
    if((playerPosition.y + elementsSize) > canvasSize + correccion ){
        console.log("Out");
    }else{
        playerPosition.y += elementsSize;
        startGame(); 
    }
  };
