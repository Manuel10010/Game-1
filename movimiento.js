
export let posicion = { x: 800, y: 450, radio: 15 };
export let camara = { x: 0, y: 0 };

const VELOCIDAD = 5;

// ESTADO DE LAS TECLAS
const teclas = { w: false, a: false, s: false, d: false };

window.addEventListener('keydown', (evento) => { 
    const tecla = evento.key.toLowerCase();
    if(tecla in teclas) teclas[tecla] = true;
});

window.addEventListener('keyup', (evento) => { 
    const tecla = evento.key.toLowerCase();
    if(tecla in teclas) teclas[tecla] = false;
});


export function actualizarFisicas(canvas) {
    if(teclas.w) posicion.y -= VELOCIDAD;
    if(teclas.s) posicion.y += VELOCIDAD;
    if(teclas.a) posicion.x -= VELOCIDAD;
    if(teclas.d) posicion.x += VELOCIDAD;

   
    camara.x = posicion.x - canvas.width / 2;
    camara.y = posicion.y - canvas.height / 2;
}