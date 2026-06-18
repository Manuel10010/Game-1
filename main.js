// Importamos las herramientas de sus respectivos archivos
import { dibujarCirculo } from './ventana.js';
import { posicion, actualizarPosicion } from './Bucle de Movimiento.js';

// El Bucle Principal
function enCadaFrame(){
    // 1. Calculamos la nueva posición matemática
    actualizarPosicion();

    // 2. Dibujamos el círculo usando esos números matemáticos
    dibujarCirculo(posicion.x, posicion.y);

    // 3. Repetimos el ciclo sin parar
    requestAnimationFrame(enCadaFrame);
}

// Arrancamos el motor
enCadaFrame();