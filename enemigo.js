// enemigo.js

export class Enemigo {
    // Ahora solo recibe una "velocidad" general, en lugar de X y Y por separado
    constructor(x, y, radio, color, velocidad, daño = 10) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
        this.velocidad = velocidad;
        this.daño = daño;
        this.lastHitTime = 0; // timestamp para cooldown de daño
    }

    // Le pasamos el "jugador" completo para que la IA sepa a quién perseguir
    actualizar(jugador) {
        // 1. Calculamos la diferencia de distancia entre el enemigo y el jugador
        const dx = jugador.x - this.x;
        const dy = jugador.y - this.y;

        // 2. Calculamos el ángulo exacto hacia el jugador
        const angulo = Math.atan2(dy, dx);

        // 3. Movemos al enemigo en esa dirección usando trigonometría
        this.x += Math.cos(angulo) * this.velocidad;
        this.y += Math.sin(angulo) * this.velocidad;
    }

    dibujar(ctx, camara = { x: 0, y: 0 }) {
        ctx.beginPath();
        ctx.arc(this.x - camara.x, this.y - camara.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#000000';
        ctx.stroke();

        ctx.closePath();
    }
}