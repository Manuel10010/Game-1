// javascript.js

import { BarraDeVida } from './vida.js';
import { Enemigo } from './enemigo.js';

const canvas = document.getElementById('pantallaJuego');
const ctx = canvas.getContext('2d');

// Creamos la barra de vida del jugador
const barraJugador = new BarraDeVida(100, 40, 40, 350, 35);

// Configuramos al jugador
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radio: 25,
    velocidad: 8,
    color: '#000000',
    invencible: false // Estado para evitar morir al instante por los 60 FPS
};

// Creamos a los tres enemigos con posiciones iniciales ALEATORIAS
const enemigos = [
    new Enemigo(Math.random() * canvas.width, Math.random() * canvas.height, 30, '#2ecc71', 2),     // Verde
    new Enemigo(Math.random() * canvas.width, Math.random() * canvas.height, 40, '#e74c3c', 3.5),   // Rojo
    new Enemigo(Math.random() * canvas.width, Math.random() * canvas.height, 25, '#f1c40f', 1.5)    // Amarillo
];

// Control de teclas
const keys = { w: false, a: false, s: false, d: false };

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (keys.hasOwnProperty(key)) keys[key] = true;
    
    // Tecla para probar recibir daño manualmente
    if (e.key === ' ') {
        barraJugador.recibirDano(10);
    }
});

window.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (keys.hasOwnProperty(key)) keys[key] = false;
});

// Lógica del juego (Físicas, movimiento, colisiones)
function update() {
    // 1. Movimiento del jugador respetando los bordes
    if (keys.w && player.y - player.radio > 0) player.y -= player.velocidad;
    if (keys.s && player.y + player.radio < canvas.height) player.y += player.velocidad;
    if (keys.a && player.x - player.radio > 0) player.x -= player.velocidad;
    if (keys.d && player.x + player.radio < canvas.width) player.x += player.velocidad;

    // 2. Actualizar IA de los enemigos y detectar colisiones
    enemigos.forEach(enemigo => {
        // La IA persigue al jugador
        enemigo.actualizar(player);

        // Calcular colisión (Distancia entre centros usando Pitágoras)
        const dx = player.x - enemigo.x;
        const dy = player.y - enemigo.y;
        const distancia = Math.hypot(dx, dy); 

        // Si la distancia es menor a los dos radios juntos, están chocando
        if (distancia < player.radio + enemigo.radio) {
            
            // Si el jugador NO es invencible en este instante
            if (!player.invencible) {
                barraJugador.recibirDano(15); // Quitar 15 de vida
                
                // Activar escudo de invencibilidad
                player.invencible = true;
                player.color = 'rgba(0, 0, 0, 0.3)'; // Se vuelve transparente

                // Quitar el escudo después de 1 segundo (1000 milisegundos)
                setTimeout(() => {
                    player.invencible = false;
                    player.color = '#000000'; // Vuelve a la normalidad
                }, 1000);
            }
        }
    });
}

// Dibujar los gráficos en pantalla
function draw() {
    // Limpiar el fotograma anterior
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Dibujar al jugador
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radio, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();

    // 2. Dibujar a los enemigos
    enemigos.forEach(enemigo => {
        enemigo.dibujar(ctx);
    });

    // 3. Dibujar la barra de vida (al final para que quede encima de todo)
    barraJugador.dibujar(ctx);
}

// Bucle infinito del juego a 60 FPS
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Iniciar el juego
gameLoop();