// Importamos las herramientas de sus respectivos archivos
import { dibujarCirculo, dibujarObjeto, dibujarRectangulo } from './ventana.js';
import { posicion, actualizarPosicion } from './Bucle de Movimiento.js';
import { detectarColisionCirculo, detectarColisionRectangulo, calcularRebote, calcularReboteRectangulo } from './colisiones.js';
const objetoPrueba = {
    x: 400,
    y: 300,
    radio: 20
};
const rectanguloPrueba = {
    x: 500,
    y: 500,
    ancho: 80,
    alto: 50
};
// El Bucle Principal
function enCadaFrame(){
    // 1. Calculamos la nueva posición matemática
    
    actualizarPosicion();
    const choqueCirculo = detectarColisionCirculo(posicion, objetoPrueba);
    const choqueRectangulo = detectarColisionRectangulo(posicion, rectanguloPrueba);
    if (choqueCirculo) {
        const nuevaPosicion = calcularRebote(posicion, objetoPrueba);
        posicion.x = nuevaPosicion.x;
        posicion.y = nuevaPosicion.y;
    }
    if (choqueRectangulo) {
        const nuevaPosicion = calcularReboteRectangulo(posicion, rectanguloPrueba);
        posicion.x = nuevaPosicion.x;
        posicion.y = nuevaPosicion.y;
    }
    // 2. Dibujamos el círculo usando esos números matemáticos
    dibujarCirculo(posicion.x, posicion.y);
    dibujarObjeto(objetoPrueba, choqueCirculo ? "green" : "red");
    dibujarRectangulo(rectanguloPrueba, choqueRectangulo ? 'green' : 'red');
// main.js
import { dibujarMundo } from './ventana.js';
import { posicion, actualizarFisicas } from './movimiento.js'; // <-- Importamos del nuevo archivo

const canvas = document.getElementById("pantallaJuego");

// El Bucle Principal
function enCadaFrame(){
    // 1. Calculamos la nueva posición del personaje Y de la cámara
    actualizarFisicas(canvas);

    // 2. Dibujamos todo el escenario usando las posiciones actualizadas
    dibujarMundo(posicion.x, posicion.y);

    // 3. Repetimos el ciclo sin parar
    requestAnimationFrame(enCadaFrame);
}

// Arrancamos el motor
enCadaFrame();