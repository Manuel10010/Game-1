const canvas = document.getElementById("pantallaJuego");
const pincel = canvas.getContext("2d");
const radio = 15;

export function dibujarCirculo(x,y){
    pincel.clearRect(0, 0, canvas.width, canvas.height); 

    // Instrucciones de dibujo
    pincel.beginPath();
    pincel.arc(x, y, radio, 0, Math.PI * 2); // Crea el trazado del círculo
    pincel.fillStyle = "black"; // Color de relleno
    pincel.fill(); // Rellena el círculo
    pincel.closePath();
}
