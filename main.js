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