export const keys = {};

let limitTop = 0;   //Limites del juego
let limitUnder = 0;
let limitLeft = 0;
let limitRight = 0

window.addEventListener ("keydown", function(e) {       
    e.preventDefault();
    keys[e.key] = true;
});
window.addEventListener ("keyup", function(e) {
    keys[e.key] = false
});

export function movePlayerPosition (player,canvas) {       //Movimiento del player en teclado.
    // console.log("tamañoAlto"+canvasHeight)
    // console.log("tamañoAncho"+canvasWidth)
    limitTop = 0;
    limitLeft = 0;
    limitUnder = canvas.height - player.height;
    limitRight = canvas.width - player.width;
    // console.log("under" + limitUnder)
    // console.log("right" + limitRight)
    // console.log("top" + limitTop)
    // console.log("left" + limitLeft)
    // console.log("limite inferior" + limitUnder)
    // console.log("limite derecho" + limitRight)
    if (player.x < limitLeft) {
    player.x = limitLeft;
    }
    if (player.y < limitTop) {
    player.y = limitTop;
    }
    if (player.y > limitUnder) {
        console.log("pase por aki")
        player.y = limitUnder;
    }
    if (player.x > limitRight) {
        player.x = limitRight;
    }
    if (keys["ArrowLeft"]){
        player.x -= 5;
    }
    if (keys["ArrowRight"]) {
        player.x += 5;
    }
    if (keys["ArrowUp"]){
        player.y -= 5;
    }
    if (keys["ArrowDown"]){
        player.y += 5;
    }
}

