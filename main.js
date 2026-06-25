import { dibujarMundo, dibujarObjeto, dibujarRectangulo, dibujarCirculo } from './ventana.js';
import { posicion, actualizarFisicas, camara } from './movimiento.js';
import { Enemigo } from './enemigo.js';
import { BarraDeVida } from './vida.js';
import { detectarColisionCirculo, detectarColisionRectangulo, calcularRebote, calcularReboteRectangulo } from './colisiones.js';

const canvas = document.getElementById("pantallaJuego");

const ctx = canvas.getContext('2d');

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

// Enemigos de ejemplo
const enemigos = [
    new Enemigo(200, 200, 20, '#ff5555', 1.2, 10),
    new Enemigo(1100, 400, 18, '#aa33ff', 0.9, 8)
];

// Barra de vida en pantalla (coordenadas en pantalla) — más grande para visibilidad
const barra = new BarraDeVida(100, 10, 10, 300, 30);

function enCadaFrame(){
    // actualizar físicas y cámara
    actualizarFisicas(canvas);

    // detectar colisiones
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

    // dibujado
    dibujarMundo(posicion.x, posicion.y);
    dibujarObjeto(objetoPrueba, choqueCirculo ? "green" : "red");
    dibujarRectangulo(rectanguloPrueba, choqueRectangulo ? 'green' : 'red');

    // actualizar y dibujar enemigos
    enemigos.forEach(e => {
        e.actualizar(posicion);
        e.dibujar(ctx, camara);

        // daño por contacto con cooldown (600ms)
        if (detectarColisionCirculo(posicion, e)) {
            const now = Date.now();
            if (!e.lastHitTime || now - e.lastHitTime > 600) {
                barra.recibirDano(e.daño);
                e.lastHitTime = now;
            }
        }
    });

    // dibujar HUD (barra de vida)
    barra.dibujar(ctx);

    requestAnimationFrame(enCadaFrame);
}

enCadaFrame();