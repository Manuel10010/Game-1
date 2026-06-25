
import { camara } from './movimiento.js'; 

const canvas = document.getElementById("pantallaJuego");
const pincel = canvas.getContext("2d");
const radio = 15;

export function dibujarObjeto(objeto, color = 'red'){
    const canvas = document.getElementById('pantallaJuego');
    const pincel = canvas.getContext('2d');

    pincel.beginPath();
    pincel.arc(objeto.x, objeto.y, objeto.radio, 0, Math.PI * 2);
    pincel.fillStyle = color;
    pincel.fill();
    pincel.closePath();
}
export function dibujarRectangulo(objeto, color = 'blue') {
    const canvas = document.getElementById('pantallaJuego');
    const pincel = canvas.getContext('2d');

    pincel.beginPath();
    pincel.fillStyle = color;
    pincel.fillRect(objeto.x, objeto.y, objeto.ancho, objeto.alto);
    pincel.closePath();
}
export function dibujarCirculo(x,y){
    pincel.clearRect(0, 0, canvas.width, canvas.height); 
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