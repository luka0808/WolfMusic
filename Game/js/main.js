import { Player } from "./player.js";
import { movePlayerPosition } from "./controls.js";
import { Notes } from "./notes.js";
import { touchEnd,touchMove,touchStart } from "./controlsTouch.js";


let run = 1;     // variables iniciales del juego

let gameOver = 0;

let menu = 2;

let preRun = 4;

let state = menu;

let isGameOver = false;

let isGamePaused = false;

let gameTime = 0;

let currentDifficulty = 1;

let score = 0;

let gameOver1 = 0;

let isStartButtonDisabled = false;
let isRestartButtonDisabled = true;
let isMenuButtonDisabled = true;

const maxDifficulty = 5;

const notes = [] ;      // arreglo que contiene las notas

export const canvas = document.getElementById("canvas-game");  //dibujo del canvas y sus parametros
export const ctx = canvas.getContext("2d");
canvas.height = 600 ;
canvas.width = 500 ;

const canvasRect = canvas.getBoundingClientRect(); // Obtén la posición y dimensiones del canvas
export const canvasLeft = canvasRect.left; // Coordenada X del canvas en la pantalla
export const canvasTop = canvasRect.top;  // Coordenada Y del canvas en la pantalla

// console.log(canvasRect.left)
// console.log(canvasRect.top)

export const canvasWidth = canvasRect.width;  //ancho de dimension del canvas segun el dispositivo
export const canvasHeight = canvasRect.height;    ///alto de dimension del canvas segun el dispositivo

export let scaleHorizont = (canvas.width/canvasWidth);  //escalado de pantalla, en pantallas menores al tamaño del canvas original

export let scaleVertical = (canvas.height/canvasHeight);    


export const player = new Player((canvas.width/2) , (canvas.height/2) , 75, 50);        //creacion de un Player, importando la clase Player

const noteImages = [        // lista de imagenes
    "img/Nota1B.png" ,
    "img/Nota2B.png" ,
    "img/Nota3B.png" ,
    "img/Nota4B.png" ,
    "img/Nota5B.png" , 
    "img/Nota6B.png" ,
    "img/Nota7B.png"
];
const noteSounds = {        // lista de sonidos y su nota correspondiente
    "img/Nota1B.png":  new Audio("sounds/Do.mp3") ,
    "img/Nota2B.png": new Audio ("sounds/Fa.mp3") ,
    "img/Nota3B.png": new Audio ("sounds/La.mp3") ,
    "img/Nota4B.png": new Audio ("sounds/Mi.mp3") ,
    "img/Nota5B.png": new Audio ("sounds/Re.mp3") ,
    "img/Nota6B.png": new Audio ("sounds/Si.mp3") ,
    "img/Nota7B.png": new Audio ("sounds/Sol.mp3") ,

};

function drawGameOverScreen(ctx){   // dibuja Game Over en la pantalla
    ctx.font = "50px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over",125,300);
};

function drawMenuScreen(ctx){       // dibuja la pantalla de menu
    ctx.font = "50px Arial";
    ctx.fillStyle = "#6F0606";
    ctx.fillText("Catch the music",canvas.width * 0.13 ,canvas.height*0.3);
    ctx.fillText("Press Start",canvas.width * 0.26,canvas.height*0.5);
};


function  drawbackground(ctx) {       // limpia el canvas
    const backgroundImage = new Image()
    backgroundImage.src = "img/Imagen de fondo.jpg"
    backgroundImage.onload = function (){
        ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height)
    }
};

function drawplayer(){             // dibuja al jugador, asignandole una imagen.

    const playerImg = new Image();
    playerImg.src = "img/Player.png";
    
    playerImg.onload = function () {
        ctx.drawImage(playerImg,player.x, player.y, player.width, player.height);
    };
};

function drawNotes(notes, ctx) {        // dibuja las notas.
    for (let i = 0; i < notes.length; i++) {
    const currentNote = notes[i];
    const noteImg = new Image();
    noteImg.src = currentNote.imageSrc;
    
    noteImg.onload = function () {
      ctx.drawImage(noteImg, currentNote.x, currentNote.y, currentNote.width, currentNote.height);           
    };
}
};

function drawScore (){          // dibuja el puntaje obtenido
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10,30);
};

function spawnNote() {      // genera una nota y la agrega al arreglo
    const note = new Notes ();
    const randomImageIndex = Math.floor(Math.random( ) * noteImages.length);
    note.imageSrc = noteImages [randomImageIndex];
        
    note.x = Math.random () * (canvas.width - 20) ;
    note.y = 0;
    note.width = 24;
    note.height = 24;
    note.speed = Math.random () *2 + 1;
    notes.push (note);
};

function upDifficulty (){   // sube la dificultad, aumentando el limite de notas en pantalla.
    gameTime += 16;
    if (currentDifficulty < maxDifficulty){
        if (gameTime >= currentDifficulty * 5000)
        currentDifficulty++;
    }
    const maxNotes = currentDifficulty * 2;
    while(notes.length < maxNotes){
    spawnNote();
    }
};
     
function moventNotes (notes) {      // controla el movimiento de las notas
        for (let i = 0; i < notes.length; i++) {
        const currentNote = notes[i];
        
        currentNote.y += currentNote.speed;
    }
    
};
function removeNote() {             // remueve las notas ante una colision con el jugador
    for(let i=0; i < notes.length; i++) {
        const currentNote = notes[i];
        if (
            player.x < currentNote.x + currentNote.width && 
            player.x + player.width > currentNote.x &&
            player.y < currentNote.y + currentNote.height &&
            player.y + player.height > currentNote.y
        ){
        const noteImage = currentNote.imageSrc;
        notes.splice(i,1);
        i--;
        score++;
        if(noteSounds[noteImage]){
            const previusSound = noteSounds[noteImage];
            previusSound.pause();
            previusSound.currentTime = 0;
            noteSounds[noteImage].play();
        }
        }
    
    }
};


// genera el boton de reinicio

const restart = document.getElementById("restart");

restart.addEventListener("click",restartGame);

//genera el boton de menu

const Menu = document.getElementById("menu");

Menu.addEventListener("click",menuGame);

//genera el boton de start

const start = document.getElementById("start");

start.addEventListener("click",startGame);

//Controladores de los eventos tactiles en pantalla.

function startTouch(e) {
    e.preventDefault();
    touchStart(e,player);
}

function moveTouch(e){
    e.preventDefault();
    touchMove(e, player,canvas);
}

canvas.addEventListener("touchstart",startTouch,{passive:false});
canvas.addEventListener("touchmove", moveTouch,{passive:false});
canvas.addEventListener("touchend", touchEnd);

function restartGame(){         //La funcion se activa con el boton,restart, y reinicia las estadisticas a su estado inicial
    state = preRun;
    isRestartButtonDisabled = true;
    isStartButtonDisabled = false;
    isMenuButtonDisabled = false;

    restart.disabled = isRestartButtonDisabled;
    start.disabled = isStartButtonDisabled;
    Menu.disabled = isMenuButtonDisabled;

};
function menuGame(){            // La funcion se activa con el boton,menu, y lleva al juego al estado de menu
    state = menu;
    isRestartButtonDisabled = true;
    isStartButtonDisabled = false;
    isMenuButtonDisabled = true;

    restart.disabled = isRestartButtonDisabled;
    start.disabled = isStartButtonDisabled;
    Menu.disabled = isMenuButtonDisabled;
};
function startGame(){           // La funcion se activa con el boton,start, y lleva al juego al estado start
    state = preRun; 
    isRestartButtonDisabled = false;
    isStartButtonDisabled = true;
    isMenuButtonDisabled = false;

    restart.disabled = isRestartButtonDisabled;
    start.disabled = isStartButtonDisabled;
    Menu.disabled = isMenuButtonDisabled;
};

function new_Inicio() {     // Esta funcion se encarga de que los valores se reseteen y trabaja junto con la funcion restart llevando al juego al estado prerun
    gameOver1 = 0;
    isGameOver = false;
    isGamePaused = false;
    state = run;
    score = 0;
    currentDifficulty = 1;
    gameTime = 0;
    notes.splice(0);
    player.x = (canvas.width/2);
    player.y = (canvas.height/2);
    requestAnimationFrame(updateGameArea);  
};

function checkGameOver(notes,canvas){   // chequea cuando el juego debe entrar en Game Over.
    for (let i = 0 ; i < notes.length ; i++){
    const currentNote = notes[i]; 
    if (currentNote.y > canvas.height) {
        notes.splice(i,1);
        isGameOver = true;
        isGamePaused = true;
        state= gameOver;
        restart.disabled = false; 
        start.disabled = true;    
        Menu.disabled = false;    
    }
        

}
};

function updateGameArea(){              // genera el bucle que hace funcionar al juego
    switch(state){
        case run : 
            if ((isGameOver == false) && (isGamePaused == false)){
                restart.disabled = false; 
                start.disabled = true;    
                Menu.disabled = false; 
                drawbackground(ctx);
                drawplayer();
                movePlayerPosition(player,canvas);
                drawNotes(notes, ctx);
                moventNotes (notes);
                removeNote();
                upDifficulty();
                drawScore();
                checkGameOver(notes,canvas);
            }
            requestAnimationFrame(updateGameArea);
            break;   
        case gameOver :
            if ((isGameOver == true) && (isGamePaused == true)){
            if ((gameOver1 == 0)) {
            drawGameOverScreen(ctx);
            drawScore();
            gameOver1 += 1;
            requestAnimationFrame(updateGameArea);
            }
            else {
            requestAnimationFrame(updateGameArea);
            }
        }
            break;
        case preRun :
            new_Inicio();
            break;
        case menu :
            restart.disabled = isRestartButtonDisabled;
            start.disabled = isStartButtonDisabled;
            Menu.disabled = isMenuButtonDisabled;
            isRestartButtonDisabled = true;
            isStartButtonDisabled = false;
            isMenuButtonDisabled = true;
            drawbackground(ctx);
            drawMenuScreen(ctx);
            requestAnimationFrame(updateGameArea);
            break;
    }
};       

requestAnimationFrame(updateGameArea);

export {currentDifficulty,maxDifficulty,gameTime,spawnNote};
