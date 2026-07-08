export class InteractivoBase {
    constructor(x,y, nombre){
        this.x = x;
        this.y = y;
        this.nombre = nombre;
        this.distancia = 50;
    }
    estaCerca(jugadorX,jugadorY){
        const distanciaX = this.x - jugadorX;
        const distanciaY = this.y - jugadorY;
        const distanciaTotal = Math.sqrt((distanciaX * distanciaX) + (distanciaY * distanciaY));
        return distanciaTotal <= this.distancia;
    }
    interactuar(jugador) {
        console.warn(`La función interactuar no ha sido definida para: ${this.nombre}`);
    }
}