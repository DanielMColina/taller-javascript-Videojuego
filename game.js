const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp= document.querySelector("#up")
const btnLeft = document.querySelector("#left")
const btnRight = document.querySelector("#right")
const btnDown = document.querySelector("#down")

window.addEventListener("load",setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementsSize;
let correccion;


const playerPosition = {
    x: undefined,
    y: undefined

}

function setCanvasSize(){
    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.75
    }else {
        canvasSize = window.innerHeight * 0.75
    };

    // window.innerHeight > window.innerWidth ? canvasSize = window.innerWidth * 0.75: canvasSize =window.innerHeight * 0.75

    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height",canvasSize);

    correccion = canvasSize / 50;
    elementsSize = canvasSize / 10;

    startGame();
}

function startGame(){

    game.font= elementsSize + "px verdana";
    game.textAlign= "end";
   
    const map = maps[0];
    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(rows => rows.trim().split(""));
    console.log(mapRowCols)

    mapRowCols.forEach((row, rowI) => {
       row.forEach((col, colI)=>{
        const emoji = emojis[col]
        const posX = (elementsSize * (colI+1)) + correccion
        const posY = (elementsSize * (rowI+1)) - correccion

        if(col == "O"){
            playerPosition.x = posX;
            playerPosition.y = posY;
        }
        game.fillText(emoji,posX,posY )
       })
    });
    
    // for (let row = 1; row <= 10; row++ ){
    //     for(let col = 1; col <= 10; col++){
    //     game.fillText(emojis[mapRowCols[row -1][col -1]], (elementsSize *col) + correccion, (elementsSize *row) - correccion)
    //     }
    // }
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
    if (event. key == 'ArrowUp') moveUp() ;
    else if (event.key == 'ArrowLeft' ) moveLeft ();
    else if (event.key == 'ArrowRight' ) moveLeft ();
    else if (event.key == 'ArrowDown' ) moveLeft ();
}
function clearMap(){
    game.clearReact(0,0, canvasSize, canvasSize)
}

function moveUp() {
    clearMap()
    playerPosition.y -= elementsSize 
    movePlayer();
  };
  
  function moveLeft() {
    playerPosition.Y - elementsSize ;
  };
  
  function moveRight() {
    console.log("Me movere hacia dere");
  };
  
  function moveDown() {
    console.log("Me movere hacia aba");
  };
