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

const objetosInteractivos = [
    { x: 260, y: 220, radio: 24, color: '#2ecc71', nombre: 'Cura', tipo: 'curar', mensaje: '¡Tomaste una planta curativa!', efecto: 'Vida +20', consumido: false },
    { x: 980, y: 420, radio: 24, color: '#e74c3c', nombre: 'Veneno', tipo: 'veneno', mensaje: '¡Cuidado! Tocaste un veneno.', efecto: 'Vida -15', consumido: false },
    { x: 700, y: 650, radio: 26, color: '#9b59b6', nombre: 'Alucinógeno', tipo: 'alucinogeno', mensaje: '¡Has consumido un alucinógeno!', efecto: 'Estás alucinando', consumido: false }
];

function agregarMensaje(texto) {
    console.log(`${new Date().toLocaleTimeString()} - ${texto}`);
}

function dibujarObjetosInteractivos() {
    objetosInteractivos.forEach(obj => {
        if (obj.consumido) return;

        ctx.beginPath();
        ctx.arc(obj.x - camara.x, obj.y - camara.y, obj.radio, 0, Math.PI * 2);
        ctx.fillStyle = obj.color;
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#111';
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = '#111';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(obj.nombre, obj.x - camara.x, obj.y - camara.y + 4);
    });
}

function procesarObjetosInteractivos() {
    objetosInteractivos.forEach(obj => {
        if (obj.consumido) return;

        if (detectarColisionCirculo(posicion, obj)) {
            obj.consumido = true;

            switch (obj.tipo) {
                case 'curar':
                    barra.curar(20);
                    break;
                case 'veneno':
                    barra.recibirDano(15);
                    break;
                case 'alucinogeno':
                    agregarMensaje('El jugador está alucinando...');
                    break;
            }

            agregarMensaje(`[${obj.nombre}] ${obj.mensaje} (${obj.efecto})`);
        }
    });
}

agregarMensaje('Prototipo cargado. Toca los objetos para ver los efectos.');

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

    procesarObjetosInteractivos();

    // dibujado
    dibujarMundo(posicion.x, posicion.y);
    dibujarObjeto(objetoPrueba, choqueCirculo ? "green" : "red");
    dibujarRectangulo(rectanguloPrueba, choqueRectangulo ? 'green' : 'red');
    dibujarObjetosInteractivos();

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