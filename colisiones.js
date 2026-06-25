export function detectarColisionCirculo(jugador, objeto){
    const dx = jugador.x - objeto.x;
    const dy = jugador.y - objeto.y;
    const distance = Math.sqrt(dx*dx + dy*dy);// sacamos el teorema de pitagoras para hallar la distancia 
    return distance < (jugador.radio + objeto.radio); // si la distancia es menor que la suma de los radios del jugador y del objeto 
}
export function detectarColisionRectangulo(jugador, rectangulo) {
    const closestX = Math.max(rectangulo.x, Math.min(jugador.x, rectangulo.x + rectangulo.ancho));
    const closestY = Math.max(rectangulo.y, Math.min(jugador.y, rectangulo.y + rectangulo.alto));
    const dx = jugador.x - closestX;
    const dy = jugador.y - closestY;
    return dx * dx + dy * dy < jugador.radio * jugador.radio;
}
export function calcularReboteRectangulo(jugador, rectangulo) {
    const closestX = Math.max(rectangulo.x, Math.min(jugador.x, rectangulo.x + rectangulo.ancho));
    const closestY = Math.max(rectangulo.y, Math.min(jugador.y, rectangulo.y + rectangulo.alto));
    let dx = jugador.x - closestX;
    let dy = jugador.y - closestY;
    const distancia = Math.sqrt(dx * dx + dy * dy) || 1;
    return {
        x: closestX + (dx / distancia) * jugador.radio,
        y: closestY + (dy / distancia) * jugador.radio
    };
}
export function calcularRebote(jugador, objeto){
    const dx = jugador.x - objeto.x;
    const dy = jugador.y - objeto.y;
    const distance = Math.sqrt(dx*dx + dy*dy);// sacamos el teorema de pitagoras para hallar la distancia 
    const minDistance = jugador.radio + objeto.radio;

    if(distance === 0){
        return {
            x: objeto.x + minDistance,
            y: objeto.y
       };
    }
    const normalx = dx / distance;
    const normaly = dy / distance;
    return {
        x: objeto.x + normalx * minDistance,
        y: objeto.y + normaly * minDistance
    };
}