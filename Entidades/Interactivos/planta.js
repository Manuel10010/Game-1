import { InteractivoBase } from "./interactivobase.js";

export class Planta extends InteractivoBase {
    constructor(x, y, nombre, tipoEfecto, potencia) {
        super(x, y, nombre); 
        this.tipoEfecto = tipoEfecto; 
        this.potencia = potencia;     
        this.fueConsumida = false;  
    }
    interactuar(jugador) {
        if (this.fueConsumida) {
            console.log(`Ya no hay nada aquí.`);
            return; 
        }

        console.log(`Has recogido: ${this.nombre}`);
        switch (this.tipoEfecto) {
            case 'curar':
                jugador.vida += this.potencia;
                console.log(`Te curaste ${this.potencia} puntos. Vida actual: ${jugador.vida}`);
                break;
                
            case 'veneno':
                jugador.vida -= this.potencia;
                console.log(`¡Auch! Te envenenaste. Perdiste ${this.potencia} puntos. Vida actual: ${jugador.vida}`);
                break;
                
            case 'alucinogeno':
                jugador.estaAlucinando = true; 
                console.log(`¡Todo da vueltas! Has consumido un alucinógeno.`);
                break;
                
            default:
                console.log(`Te comiste la planta pero no pasó nada raro.`);
                break;
        }
        this.fueConsumida = true;
        this.destruir(); 
    }

    destruir() {
        console.log(`[Sistema] La ${this.nombre} ha desaparecido del mapa.`);
    }
}