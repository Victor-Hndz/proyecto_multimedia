const canvas = document.getElementById("ratonCanvas");
const context = canvas.getContext("2d");

const pelo_color = "#db8239"; 
const pelo_oscuro_color = "#ab5916";
const camisa_color = "green";
const pantalon_color = "#44b83e";
const ojos_color = "white";
const pupilas_color = "black";
const orejas_color = "#fc868a";
const borde_color = "black";
const gafas_color = "lightgrey";
const corbata_color = "red";

const circulo = Math.PI * 2;
const borde_size = 1;

document.addEventListener("onload", estado_inicial());

// Dibujar las piernas del ratón
/**
 * 
 * @param {*} x_izq 
 * @param {*} y_izq 
 * @param {*} w_izq 
 * @param {*} h_izq 
 * @param {*} x_der 
 */
function piernas(x_izq, y_izq, w_izq, h_izq, x_der) {
    var y_der = y_izq;
    var w_der = w_izq;
    var h_der = h_izq;

    //piernas
    context.fillStyle = pantalon_color;
    context.fillRect(x_izq, y_izq, w_izq, h_izq);
    context.fillRect(x_der, y_der, w_der, h_der);

    pies(x_izq, y_izq+h_izq, x_der, y_der+h_der);
}

// Dibujar los pies del ratón
/**
 * 
 * @param {*} x_izq 
 * @param {*} y_izq 
 * @param {*} x_der 
 * @param {*} y_der 
 */
function pies(x_izq, y_izq, x_der, y_der) {
    var w_izq = 40;
    var h_izq = 20;

    var w_der = w_izq;
    var h_der = h_izq;

    var radio = 10;

    context.fillStyle = pelo_oscuro_color
    context.fillRect(x_izq, y_izq, w_izq, h_izq);
    context.fillRect(x_der, y_der, w_der, h_der);
     
    context.fillStyle = pelo_oscuro_color;
    context.beginPath();
    context.arc(x_izq+w_izq, y_izq+radio, radio, 0, circulo); // Dibujar el círculo en el primer brazo
    context.arc(x_der+w_der, y_izq+radio, radio, 0, circulo); // Dibujar el círculo en el segundo brazo
    context.closePath();
    context.fill();
}

// Dibujar el cuerpo del ratón
/**
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} radio 
 */
function cuerpo(x, y, radio) {
    //cuerpo
    context.strokeStyle = borde_color;
    context.lineWidth = borde_size; // Ancho del borde
    context.beginPath();
    context.arc(x, y, radio, 0, circulo);
    context.fillStyle = camisa_color;
    context.fill();
    context.stroke();

    corbata(x-10, y-15);
}

//Dibujar la corbata del ratón
/**
 * 
 * @param {*} x1 
 * @param {*} y1 
 */
function corbata(x1, y1) {
    var x2 = x1+20;
    var y2 = y1;

    var x3 = x2-5;
    var y3 = y1+10;
    
    var x4 = x1+5;
    var y4 = y1+10;

    //nudo
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.lineTo(x4, y4);    
    context.closePath();
    context.fillStyle = corbata_color; 
    context.fill();
    context.strokeStyle = borde_color;
    context.lineWidth = 2; // Ancho de los segmentos
    context.stroke();

    //corbata
    context.beginPath();
    context.moveTo(x4, y4+1);
    context.lineTo(x4, y4+50),
    context.lineTo(x4+5, y4+60);
    context.lineTo(x4+10, y4+50);
    context.lineTo(x3, y4+1);
    context.fillStyle = corbata_color;
    context.fill();
    context.stroke();
}

// Dibujar la cabeza del ratón
/**
 * 
 * @param {*} left_vertix_x 
 * @param {*} left_vertix_y 
 * @param {*} right_vertix_x 
 * @param {*} bottom_vertix_y 
 */
function cabeza(left_vertix_x, left_vertix_y, right_vertix_x, bottom_vertix_y) {
    var right_vertix_y = left_vertix_y;
    
    var bottom_vertix_x = (left_vertix_x+right_vertix_x)/2;

    //Cabeza
    context.strokeStyle = borde_color;
    context.lineWidth = borde_size; // Ancho del borde
    context.beginPath();
    context.moveTo(left_vertix_x, left_vertix_y);
    context.lineTo(right_vertix_x, right_vertix_y);
    context.lineTo(bottom_vertix_x, bottom_vertix_y);
    context.closePath();
    context.fillStyle = pelo_color;
    context.fill();
    context.stroke();

    nariz(bottom_vertix_x, bottom_vertix_y);

    ojos(right_vertix_x-left_vertix_x, left_vertix_x);

    orejas(left_vertix_x, left_vertix_y, right_vertix_x);
}

//Dibujar la nariz del ratón
/**
 * 
 * @param {*} x 
 * @param {*} y 
 */
function nariz(x, y) {
    var radio = 5;

    context.strokeStyle = borde_color;
    context.lineWidth = borde_size; // Ancho del borde
    context.beginPath();
    context.arc(x, y, radio, 0, circulo);
    context.fillStyle = pelo_oscuro_color;
    context.fill();
    context.stroke();
}

//Dibujar los ojos del ratón
/**
 * 
 * @param {*} distancia 
 * @param {*} origin 
 */
function ojos(distancia, origin) {
    var ojo_izq = origin + distancia/3;
    var ojo_der = ojo_izq + distancia/3;
    var altura_ojos = 85;
    var radio_ojos = 8;
    var radio_pupilas = 3;

    //ojos
    context.strokeStyle = borde_color;
    context.lineWidth = borde_size;
    context.beginPath();
    context.arc(ojo_izq, altura_ojos, radio_ojos, 0, circulo);
    context.fillStyle = ojos_color;
    context.fill();
    context.stroke();

    context.strokeStyle = borde_color;
    context.lineWidth = borde_size;
    context.beginPath();
    context.arc(ojo_der, altura_ojos, radio_ojos, 0, circulo);
    context.fillStyle = ojos_color;
    context.fill();
    context.stroke();

    //pupilas
    context.beginPath();
    context.arc(ojo_izq, altura_ojos, radio_pupilas, 0, circulo);
    context.fillStyle = pupilas_color;
    context.fill();

    context.beginPath();
    context.arc(ojo_der, altura_ojos, radio_pupilas, 0, circulo);
    context.fillStyle = pupilas_color;
    context.fill();

    gafas(ojo_izq, ojo_der, radio_ojos, altura_ojos);
}

//Dibujar las gafas del ratón
/**
 * 
 * @param {*} x_izq 
 * @param {*} x_der 
 * @param {*} radio 
 * @param {*} altura 
 */
function gafas(x_izq, x_der, radio, altura) {
    var altura_gafas = altura+40;
    context.lineWidth = 2; // Ancho del borde
    context.beginPath();
    context.arc(x_izq, altura_gafas, radio, 0, circulo);
    context.fillStyle = gafas_color;
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(x_izq+10, altura_gafas);
    context.lineTo(x_izq+24, altura_gafas);
    context.stroke();

    context.beginPath();
    context.arc(x_der, altura_gafas, radio, 0, circulo);
    context.fillStyle = gafas_color;
    context.fill();
    context.stroke();
}

// Dibujar las orejas del ratón
/**
 * 
 * @param {*} x_izq 
 * @param {*} y 
 * @param {*} x_der 
 */
function orejas(x_izq, y, x_der) {
    var radio_oreja = 30;
    var radio_interior = 15;

    context.strokeStyle = borde_color;
    context.lineWidth = borde_size; // Ancho del borde
    context.beginPath();
    context.arc(x_izq, y, radio_oreja, 0, circulo);
    context.fillStyle = pelo_color;
    context.fill();
    context.stroke();
    
    context.strokeStyle = borde_color;
    context.lineWidth = borde_size; // Ancho del borde
    context.beginPath();
    context.arc(x_der, y, radio_oreja, 0, circulo);
    context.fillStyle = pelo_color;
    context.fill();
    context.stroke();

    context.strokeStyle = borde_color;
    context.lineWidth = borde_size; // Ancho del borde
    context.beginPath();
    context.arc(x_izq, y, radio_interior, 0, circulo);
    context.fillStyle = orejas_color;
    context.fill();
    context.stroke();

    context.strokeStyle = borde_color;
    context.lineWidth = borde_size; // Ancho del borde
    context.beginPath();
    context.arc(x_der, y, radio_interior, 0, circulo);
    context.fillStyle = orejas_color;
    context.fill();
    context.stroke();
}

// Dibujar los brazos del ratón
/**
 * 
 * @param {*} x_izq 
 * @param {*} y_izq 
 * @param {*} separacion 
 * @param {*} w 
 * @param {*} h 
 */
function brazos(x_izq, y_izq, x_der, y_der, w, h) {
    var w_izq = w;
    var h_izq = h;
    var w_der = w_izq;
    var h_der = h_izq;

    var radio = 10;

    manos(x_izq+radio, x_der+radio, radio*circulo+y_izq+radio, radio);

    context.strokeStyle = borde_color;
    context.lineWidth = borde_size; // Ancho del borde
    context.fillStyle = camisa_color;
    context.beginPath(); // Comenzar el trazado de la forma
    context.rect(x_izq, y_izq, w_izq, h_izq); // Dibujar el primer rectángulo
    context.rect(x_der, y_der, w_der, h_der); // Dibujar el segundo rectángulo
    context.closePath(); // Cerrar la forma
    context.fill(); // Rellenar los brazos con el color
    context.stroke(); // Dibujar el borde negro alrededor de los brazos

    context.fillStyle = camisa_color;
    context.beginPath(); // Comenzar el trazado de la forma
    context.arc(x_izq+radio, y_izq, radio, 0, circulo); // Dibujar el círculo en el primer brazo
    context.arc(x_der+radio, y_der, radio, 0, circulo); // Dibujar el círculo en el segundo brazo
    context.closePath(); // Cerrar la forma
    context.fill(); // Rellenar los círculos con el color
}

//Dibujar las manos del ratón
/**
 * 
 * @param {*} x_izq 
 * @param {*} x_der 
 * @param {*} y 
 * @param {*} radio 
 */
function manos(x_izq, x_der, y, radio) {
    //manos del ratón
    context.fillStyle = pelo_oscuro_color;
    context.beginPath(); // Comenzar el trazado de la forma
    context.arc(x_izq, y, radio, 0, circulo); // Dibujar el círculo en el primer brazo
    context.arc(x_der, y, radio, 0, circulo); // Dibujar el círculo en el segundo brazo
    context.closePath(); // Cerrar la forma
    context.fill(); // Rellenar los círculos con el color
}


function estado_inicial() {
    piernas(150, 220, 20, 70, 230);
    cuerpo(200, 175, 80);
    cabeza(150, 50, 250, 150);
    brazos(120, 150, 260, 150, 20, 70);
}