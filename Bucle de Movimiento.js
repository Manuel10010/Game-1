/* Esta funcion se encagara de hacer que en el teclado las W,A,S,D
todas sean falsas para que mas adelante a la hora de crear la funcion
de movimiento, cuando una tecla sea presionada, el personaje se mueva
hacia donde lo indique.
Adenmas se crea una constante de velocidad para cada frame
*/

// VARIABLES GLOBALES

export let posicion = {x:800, y: 450};
const VELOCIDAD = 5;

//CAPTURA DE MOVIMIENTOS (FUNCION ENCARGADA DE DETECTAR CUANDO UNA TECLA ES PRESIONADA)
const teclas = {
    w:false,
    a:false,
    s:false,
    d:false,
};

//Detector cuando se presiona
window.addEventListener('keydown',(evento) => { 
    const tecla = evento.key.toLowerCase();
    if(tecla in teclas){
        teclas[tecla] = true;
    }
});

//Detector cuando se suelta

window.addEventListener('keyup',(evento) => { 
    const tecla = evento.key.toLowerCase();
    if(tecla in teclas){
        teclas[tecla] = false;
    }
});


//LOGICA MATEMATICA PARA QUE HAGA EL MOVIMIENTO

export function actualizarPosicion(){

    if(teclas.w){
        posicion.y -= VELOCIDAD
    }

    if(teclas.s){
        posicion.y += VELOCIDAD
    }

    if(teclas.a){
        posicion.x -= VELOCIDAD
    }

    if(teclas.d){
        posicion.x += VELOCIDAD
    }
}

//BUCLE (Funcion para actualizar los valores del personaje)
/*
function encadaFrame(){
    actualizarPosicion();

    //Espacio para desarrolador

    requestAnimationFrame(enCadaFrame);
}

//Inicia la logica

enCadaFrame();

*/