// barraVida.js

// Usamos "export" para que este código pueda ser usado desde main.js
export class BarraDeVida {
    constructor(vidaMaxima, x, y, ancho, alto) {
        this.vidaMaxima = vidaMaxima;
        this.vidaActual = vidaMaxima; // Empieza con la vida al máximo
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
    }

    // Función para quitarle vida al personaje
    recibirDano(cantidad) {
        this.vidaActual -= cantidad;
        if (this.vidaActual < 0) {
            this.vidaActual = 0; // Evita que la vida baje de cero
        }
    }

    // Función para curar al personaje (por si la necesitas en el futuro)
    curar(cantidad) {
        this.vidaActual += cantidad;
        if (this.vidaActual > this.vidaMaxima) {
            this.vidaActual = this.vidaMaxima; // Evita que pase del máximo
        }
    }

    // Esta función dibuja la barra usando el contexto del canvas
    dibujar(ctx) {
        // Guardamos/restauramos estado para evitar interferencias con transformaciones
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';

        // 1. Dibujar el fondo de la barra (Gris oscuro)
        ctx.fillStyle = '#7f8c8d';
        ctx.fillRect(this.x, this.y, this.ancho, this.alto);

        // 2. Calcular qué porcentaje de vida queda (ej: 50/100 = 0.5)
        const porcentaje = this.vidaActual / this.vidaMaxima;

        // 3. Cambiar el color dinámicamente: Rojo si es menor al 30%, si no, Verde
        if (porcentaje <= 0.3) {
            ctx.fillStyle = '#e74c3c'; // Rojo peligro
        } else {
            ctx.fillStyle = '#2ecc71'; // Verde sano
        }

        // 4. Dibujar la barra de vida actual (multiplicando el ancho por el porcentaje)
        ctx.fillRect(this.x, this.y, this.ancho * porcentaje, this.alto);

        // 5. Dibujar un borde negro exterior para darle estilo
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.strokeRect(this.x, this.y, this.ancho, this.alto);

        // 6. Mostrar porcentaje como texto para ver la barra claramente
        ctx.fillStyle = '#000000';
        ctx.font = '14px sans-serif';
        const porcentajeTexto = Math.round((this.vidaActual / this.vidaMaxima) * 100);
        ctx.fillText(porcentajeTexto + '%', this.x + 6, this.y + this.alto - 6);

        ctx.restore();
    }
}