
import { camara } from './movimiento.js'; 

const canvas = document.getElementById("pantallaJuego");
const pincel = canvas.getContext("2d");
const radio = 15;

export function dibujarMundo(xJugador, yJugador) {
    
    pincel.clearRect(0, 0, canvas.width, canvas.height);

    let xObjetoMundo = 900; 
    let yObjetoMundo = 500; 

    pincel.fillStyle = "red"; 
    pincel.fillRect(xObjetoMundo - camara.x, yObjetoMundo - camara.y, 50, 50);


    
    pincel.beginPath();
    

    let xPantalla = xJugador - camara.x;
    let yPantalla = yJugador - camara.y;

    pincel.arc(xPantalla, yPantalla, radio, 0, Math.PI * 2); 
    pincel.fillStyle = "black"; 
    pincel.fill(); 
    pincel.closePath();
}