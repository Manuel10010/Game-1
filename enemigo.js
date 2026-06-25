// enemigo.js

export class Enemigo {
    // Ahora solo recibe una "velocidad" general, en lugar de X y Y por separado
    constructor(x, y, radio, color, velocidad) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
        this.velocidad = velocidad;
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

    dibujar(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        
        ctx.closePath();
    }
}