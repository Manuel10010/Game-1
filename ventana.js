const canvas = document.getElementById("pantallaJuego");
const pincel = canvas.getContext("2d");
let coordenadax = 800;
let coodenaday = 450;
const radio = 15;

function dibujarCirculo(){
    pincel.clearRect(0, 0, canvas.width, canvas.height); 

    // Instrucciones de dibujo
    pincel.beginPath();
    pincel.arc(coordenadax, coodenaday, radio, 0, Math.PI * 2); // Crea el trazado del círculo
    pincel.fillStyle = "black"; // Color de relleno
    pincel.fill(); // Rellena el círculo
    pincel.closePath();
}
dibujarCirculo();