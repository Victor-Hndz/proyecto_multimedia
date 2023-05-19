const canvas = document.getElementById("ratonCanvas");
const context = canvas.getContext("2d");

const pelo_color = "#db8239"; 
const pelo_oscuro_color = "#ab5916";
const camisa_color = "green";
const pantalon_color = "#44b83e";
const ojos_color = "white";
const pupilas_color = "black";
const orejas_color = "#fc868a";
const borde = "black";

const circulo = Math.PI * 2;
const borde_size = 1;

document.addEventListener("onload", estado_inicial());

// Dibujar las piernas
function piernas() {
    var x_izq = 150;
    var y_izq = 220;
    var w_izq = 20;
    var h_izq = 70;

    var x_der = 230;
    var y_der = y_izq;
    var w_der = w_izq;
    var h_der = h_izq;

    context.fillStyle = pantalon_color;
    context.fillRect(x_izq, y_izq, w_izq, h_izq);
    context.fillRect(x_der, y_der, w_der, h_der);

    pies(x_izq, y_izq+h_izq, x_der, y_der+h_der);
}

// Dibujar los pies
function pies(x_izq, y_izq, x_der, y_der) {
    var w_izq = 40;
    var h_izq = 20;

    var w_der = w_izq;
    var h_der = h_izq;

    var radio = 10;

    context.fillStyle = pelo_oscuro_color
    context.fillRect(x_izq, y_izq, w_izq, h_izq);
    context.fillRect(x_der, y_der, w_der, h_der);
     
    //manos del ratón
    context.fillStyle = pelo_oscuro_color;
    context.beginPath(); // Comenzar el trazado de la forma
    context.arc(x_izq+w_izq, y_izq+radio, radio, 0, circulo); // Dibujar el círculo en el primer brazo
    context.arc(x_der+w_der, y_izq+radio, radio, 0, circulo); // Dibujar el círculo en el segundo brazo
    context.closePath(); // Cerrar la forma
    context.fill(); // Rellenar los círculos con el color
}

// Dibujar el cuerpo del ratón
function cuerpo() {
    context.strokeStyle = borde;
    context.lineWidth = 1; // Ancho del borde
    context.beginPath();
    context.arc(200, 175, 80, 0, 2 * Math.PI);
    context.fillStyle = camisa_color;
    context.fill();
    context.stroke();
}

// Dibujar la cabeza del ratón
function cabeza() {
    //Cabeza del ratón
    context.strokeStyle = borde;
    context.lineWidth = borde_size; // Ancho del borde
    context.beginPath();
    context.moveTo(150, 50);
    context.lineTo(250, 50);
    context.lineTo(200, 150);
    context.closePath();
    context.fillStyle = pelo_color;
    context.fill();
    context.stroke();

    //Nariz del ratón
    context.strokeStyle = borde;
    context.lineWidth = borde_size; // Ancho del borde
    context.beginPath();
    context.arc(200, 150, 5, 0, 2 * Math.PI);
    context.fillStyle = pelo_oscuro_color;
    context.fill();
    context.stroke();

    //Ojos del ratón
    context.strokeStyle = borde;
    context.lineWidth = borde_size; // Ancho del borde
    context.beginPath();
    context.arc(185, 85, 8, 0, 2 * Math.PI);
    context.fillStyle = ojos_color
    context.fill();
    context.stroke();

    context.strokeStyle = borde;
    context.lineWidth = borde_size; // Ancho del borde
    context.beginPath();
    context.arc(215, 85, 8, 0, 2 * Math.PI);
    context.fillStyle = ojos_color
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(185, 85, 3, 0, 2 * Math.PI);
    context.fillStyle = pupilas_color;
    context.fill();

    context.beginPath();
    context.arc(215, 85, 3, 0, 2 * Math.PI);
    context.fillStyle = pupilas_color;
    context.fill();
}

// Dibujar las orejas del ratón
function orejas() {
    context.strokeStyle = borde;
    context.lineWidth = borde_size; // Ancho del borde
    context.beginPath();
    context.arc(150, 50, 30, 0, 2 * Math.PI);
    context.fillStyle = pelo_color;
    context.fill();
    context.stroke();
    
    context.strokeStyle = borde;
    context.lineWidth = borde_size; // Ancho del borde
    context.beginPath();
    context.arc(250, 50, 30, 0, 2 * Math.PI);
    context.fillStyle = pelo_color;
    context.fill();
    context.stroke();

    context.strokeStyle = borde;
    context.lineWidth = borde_size; // Ancho del borde
    context.beginPath();
    context.arc(150, 50, 15, 0, 2 * Math.PI);
    context.fillStyle = orejas_color;
    context.fill();
    context.stroke();

    context.strokeStyle = borde;
    context.lineWidth = borde_size; // Ancho del borde
    context.beginPath();
    context.arc(250, 50, 15, 0, 2 * Math.PI);
    context.fillStyle = orejas_color;
    context.fill();
    context.stroke();
}

// Dibujar los brazos del ratón
function brazos() {
    var x_izq = 120;
    var y_izq = 150;
    var w_izq = 20;
    var h_izq = 70;

    var x_der = 260;
    var y_der = y_izq;
    var w_der = w_izq;
    var h_der = h_izq;

    var radio = 10;

    //manos del ratón
    context.fillStyle = pelo_oscuro_color;
    context.beginPath(); // Comenzar el trazado de la forma
    context.arc(x_izq+radio, radio*circulo+y_izq+radio, radio, 0, circulo); // Dibujar el círculo en el primer brazo
    context.arc(x_der+radio, radio*circulo+y_izq+radio, radio, 0, circulo); // Dibujar el círculo en el segundo brazo
    context.closePath(); // Cerrar la forma
    context.fill(); // Rellenar los círculos con el color

    context.strokeStyle = borde;
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


function estado_inicial() {
    piernas();
    cuerpo();
    brazos();
    cabeza();
    orejas();
}