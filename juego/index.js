


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")

canvas.height = 512;
canvas.width = 448;

let radiPilota = 7;
let x = canvas.width / 2
let y = canvas.height -30

let dx = 2
let dy = -2

let amplePala = 80;
const alturaPala = 10;

let sensibilitat = 8;
let dreta = false;
let esquerra = false;

let palaX = (canvas.width - amplePala) / 2
let palaY = canvas.height - alturaPala - 10

function pintarPilota(){
    ctx.beginPath();
    ctx.arc(x, y, radiPilota, 0, Math.PI*2)
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}

function duplicarPilotes(){
    ctx.beginPath();
    ctx.arc(x+1000, y+1000, radiPilota, 0, Math.PI*2)
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}

function pintarPala(){
    ctx.fillStyle = "#FFF"
    ctx.fillRect(palaX, palaY, amplePala, alturaPala)
}

function pintarMurs(){

}

function deteccioColisio(){
    
}

function movimentPilota(){
    if(x + dx >= canvas.width - radiPilota|| x + dx <= 0 + radiPilota){
        dx = -dx
    }
    if(y + dy <= 0){
        dy = -dy
    }
    if(y + dy > canvas.height){
        console.log("GAME OVER")
        document.location.reload();
    }

    x += dx;
    y += dy;
}

function movimentPala(){
    if(dreta && palaX < canvas.width - amplePala){
        palaX += sensibilitat
    }else if(esquerra && palaX > 0){
        palaX -= sensibilitat
    }
}

function borrarPantalla(){
    canvas.height = 512;
    canvas.width = 448;
}

function inicialitzardorEvents(){
    document.addEventListener('keydown', pulsar);
    document.addEventListener('keyup', soltar)

    function pulsar(event){
        if(event.key == 'ArrowRight' || event.key == 'd'){
            dreta = true;
        }
        if(event.key == 'ArrowLeft' || event.key == 'a'){
            esquerra = true;
        }
        if(event.key == '+'){
            amplePala = amplePala *2
        }
        if(event.key == '-'){
            amplePala = amplePala / 2
        }
        if(event.key == 'ArrowUp'){
            radiPilota = radiPilota*2
        }
        if(event.key == 'ArrowDown'){
            radiPilota = radiPilota/2
        }
        if(event.key == 'q'){
            sensibilitat = sensibilitat*2
        }
        if(event.key == 'e'){
            sensibilitat = sensibilitat/2
        }
        if(event.key == 'j'){

        }
        if(event.key == 'k'){
            
        }
        if(event.key == 'c'){
            let dxNova = dx;
            let dyNova = dx;

            dx=0;
            dy=0;

            setTimeout(()=>{
                dx= dxNova;
                dy= dyNova;
            } ,3000)
        }
    }

    function soltar(event){
        if(event.key == 'ArrowRight' || event.key == 'd'){
            dreta = false;
        }
        if(event.key == 'ArrowLeft' || event.key == 'a'){
            esquerra = false;
        }
    }
}



function pintarCanvas(){
    console.log("Hola");
    borrarPantalla();
    pintarPilota();
    pintarPala();
    pintarMurs();
    deteccioColisio();
    movimentPilota();
    movimentPala();
    duplicarPilotes();

    window.requestAnimationFrame(pintarCanvas);
}

pintarCanvas();
inicialitzardorEvents();
