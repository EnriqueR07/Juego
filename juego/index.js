const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")
let murosimg = document.getElementById("muros")

canvas.height = 512;
canvas.width = 448;

// VARIABLES PELOTA
const radioPelota = 10;

let x = canvas.width / 2
let y = canvas.height -30

//VARIABLES MUROS
const filas = 6
const columnas = 13
const amplioMuro = 30;
const alturaMuro = 14;
const margenTMuro = 80;
const margenEMuro = 30;
const separacionMuros = 2;
    
const muros = []
const estado_muro = {
    destruido: 0,
    Show: 1
}

for(let c=0; c < columnas; c++){
    muros[c]=[];
    for(let f=0; f<filas; f++){
        const muroX = margenEMuro+c*(amplioMuro+separacionMuros)
        const muroY = margenTMuro+f*(alturaMuro+separacionMuros)
        let num = Math.floor(Math.random()*14)
        muros[c][f] = {
            x: muroX,
            y: muroY,
            status: estado_muro.Show,
            color: num

        }
}
}

//VELOCIDAD PELOTA
let dx = 5;
let dy = -5;

// VARIABLES PALA
let amplioPala = 80;
const alturaPala = 10;

let sensibilidad = 8;
let dreta = false;
let esquerra = false;

let palaX = (canvas.width - amplioPala) / 2
let palaY = canvas.height - alturaPala - 10

//VIDAS

let vidas = 3

let color


function pintarpala(){
    ctx.fillStyle = "#e51d2e"
    ctx.fillRect(palaX, palaY, amplioPala, alturaPala)

}
function pintarpelota(){
    ctx.beginPath();
    ctx.arc(x, y, radioPelota, 0, Math.PI*2)
    ctx.fillstyle = "#e51d2e"
    ctx.fill();
    ctx.closePath();

}


function pintarmuros(){

for(let c=0; c<columnas; c++){
    for(let f=0; f<filas; f++){
        const muroactual = muros[c][f];
        if(muroactual.status == estado_muro.destruido){
            continue;
        }

        //ctx.fillStyle = muroactual.color;
        //ctx.rect(muroactual.x,muroactual.y,amplioMuro,alturaMuro)
        //ctx.fill();

        const clipX = muroactual.color * 16
        ctx.drawImage(
            murosimg,
            clipX,
            0,
            80,
            70,
            muroactual.x,
            muroactual.y,
            amplioMuro,
            alturaMuro
        )
        
        
    }
}


}

function deteccioncolision(){
        for(let c=0; c<columnas; c++){
            for(let f=0; f<filas; f++){
                const muroactual = muros[c][f];
                if(muroactual.status == estado_muro.destruido){
                    continue;
                }
                const mateixaXMur = x > muroactual.x && x < muroactual.x + amplioMuro; 
                const mateixaYMur = y > muroactual.y && y < muroactual.y + alturaMuro; 

                    if(mateixaXMur && mateixaYMur){
                        dy = dy;
                        muroactual.status = estado_muro.destruido
                    }
        
               
                
            }
        }
        
}

function movimientpala(){

if(dreta && palaX < canvas.width - amplioPala){
    palaX += sensibilidad
}else if(esquerra && palaX > 0){
    palaX -= sensibilidad
}
}

function borrarPantalla(){
canvas.height = 512;
canvas.width = 448;
}



function movimientpelota(){
    //REBOTE EJE X
    if(x + dx >= canvas.width || x + dx <= 0 ){
        dx = -dx
    }
    // REBOTE EJE Y 
    if(y + dy <= 0 ){
        dy = -dy
    }

    const mateixaX = x > palaX && x < palaX + amplioPala;
    const mateixaY = y + dy > palaY
    // GAME OVER
    if(mateixaX && mateixaY){
        dy = -dy
    }else if(y + dy == canvas.height ){
        vidas --
        x = canvas.widht / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = 2;
    }
   


  if(vidas== -1){
        console.log( "GAME OVER")
        document.location.reload();

    }

    x += dx;
    y += dy;

}

function borrarpantalla(){
    canvas.height = 512;
    canvas.width = 448;
}

function inicializador(){
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
            amplioPala = amplioPala *2;
        }
        if(event.key == '-'){
            amplioPala = amplioPala / 2
        }
        if(event.key == 'ArrowUp'){
            radioPelota = radioPelota *2;
        }
        if(event.key == 'ArrowDown'){
            radioPelota = radioPelota / 2;
        }
        if(event.key == 'q'){
            sensibilidad = sensibilidad*2
        }
        if(event.key == 'e'){
            sensibilidad = sensibilidad/2
        }
        if(event.key == 'j'){

        }
        if(event.key == 'k'){
            
        }
        if(event.key == 'c'){
            let dxNova = dx;
            let dyNova = dy;

            dx = 0;
            dy = 0;

            setTimeout(()=>{
                dx = dxNova;
                dy = dyNova;

            },3000)
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




function pintarjoc(){
    console.log("Hola");
    borrarpantalla();
    pintarpelota();
    pintarpala();
    pintarmuros();
    
    deteccioncolision();
    movimientpelota();
    movimientpala();
    deteccioncolision();
    ctx.fillText("vidas:"+vidas, 20, 20);



    window.requestAnimationFrame(pintarjoc);


}


pintarjoc();
inicializador();
