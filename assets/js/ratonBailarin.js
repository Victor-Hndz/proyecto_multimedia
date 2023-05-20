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

//Ratón
class Raton {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
        this.cabeza = new Cabeza(this.x, this.y-h/8, this.w/3, this.h/3, this.h/3);
        this.brazo_izq = new Brazo(this.x-this.h/5, this.y-this.y/7, 20, 70, camisa_color);
        this.brazo_der = new Brazo(this.x+this.h/5, this.y-this.y/7, 20, 70, camisa_color);
        this.cuerpo = new Circulo(this.x, this.y, this.w/2-this.h/4, camisa_color);
        this.corbata = new Corbata(this.x, this.y-h/8, this.w/2-this.h/4, corbata_color);
        this.gafas = new Gafas(this.x-15, this.y-h/5, this.x+15, this.y-h/5, 8, gafas_color);
        this.pierna_izq = new Pierna(this.x-this.h/8, this.y+this.y/4, 20, 70, pantalon_color);
        this.pierna_der = new Pierna(this.x+this.h/8, this.y+this.y/4, 20, 70, pantalon_color);
    }

    dibujar() {
        this.pierna_izq.dibujar();
        this.pierna_der.dibujar();
        this.cuerpo.dibujar();
        this.corbata.dibujar();
        this.cabeza.dibujar();
        this.brazo_izq.dibujar();
        this.brazo_der.dibujar();
        this.gafas.dibujar();
    }

    mover(x, y) {
        this.x += x;
        this.y += y;
        this.cabeza.mover(x, y);
        this.corbata.mover(x, y);
        this.cuerpo.mover(x, y);
        this.brazo_izq.mover(x, y);
        this.brazo_der.mover(x, y);
        this.pierna_izq.mover(x, y);
        this.pierna_der.mover(x, y);
        this.gafas.mover(x, y);

        this.dibujar();
    }

    rotar(angle) {
        this.rotation += angle;
        this.dibujar();
    }

    borrar() {
        this.cabeza.borrar();
        this.corbata.borrar();
        this.cuerpo.borrar();
        this.brazo_izq.borrar();
        this.brazo_der.borrar();
        this.pierna_izq.borrar();
        this.pierna_der.borrar();
        this.gafas.borrar();
    }
}

class Cabeza {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;

        this.cabeza = new Triangulo(this.x, this.y, this.w, this.h, pelo_color);
        this.ojo_izq = new Ojo(this.x-15, this.h, 8);
        this.ojo_der = new Ojo(this.x+15, this.h, 8);
        this.oreja_izq = new Oreja(this.x - (this.w / 2), this.y-this.h, 30);
        this.oreja_der = new Oreja(this.x + (this.w / 2), this.y-this.h, 30);
        this.nariz = new Circulo(this.x, this.y, 5, pelo_oscuro_color);
    }

    dibujar() {
        this.cabeza.dibujar();
        this.ojo_izq.dibujar();
        this.ojo_der.dibujar();
        this.oreja_izq.dibujar();
        this.oreja_der.dibujar();
        this.nariz.dibujar();
    }

    mover(x, y) {
        this.x += x;
        this.y += y;

        this.cabeza.mover(x, y);
        this.ojo_izq.mover(x, y);
        this.ojo_der.mover(x, y);
        this.oreja_izq.mover(x, y);
        this.oreja_der.mover(x, y);
        this.nariz.mover(x, y);
    }

    borrar() {
        this.cabeza.borrar();
        this.ojo_izq.borrar();
        this.ojo_der.borrar();
        this.oreja_izq.borrar();
        this.oreja_der.borrar();
        this.nariz.borrar();
    }
}

class Ojo {
    constructor(x, y, radio) {
        this.x = x;
        this.y = y;
        this.radio = radio;

        this.iris = new Circulo(this.x, this.y, this.radio, ojos_color);
        this.pupila = new Circulo(this.x, this.y, this.radio/2, pupilas_color);
    }

    dibujar() {

        this.iris.dibujar();
        this.pupila.dibujar();
    }

    mover(x, y) {
        this.x += x;
        this.y += y;
        this.iris.mover(x, y);
        this.pupila.mover(x, y);
    }

    borrar() {
        this.iris.borrar();
        this.pupila.borrar();
    }
}

class Oreja {
    constructor(x, y, radio) {
        this.x = x;
        this.y = y;
        this.radio = radio;

        this.exterior = new Circulo(this.x, this.y, this.radio, pelo_color);
        this.interior = new Circulo(this.x, this.y, this.radio/2, orejas_color);
    }

    dibujar() {
        this.exterior.dibujar();
        this.interior.dibujar();
    }

    mover(x, y) {
        this.x += x;
        this.y += y;
        this.exterior.mover(x, y);
        this.interior.mover(x, y);
    }

    borrar() {
        this.exterior.borrar();
        this.interior.borrar();
    }
}

class Gafas {
    constructor(x1, y1, x2, y2, radio, color) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.radio = radio;
        this.color = color;

        this.cristal_izq = new Circulo(this.x1, this.y1, this.radio, this.color);
        this.cristal_der = new Circulo(this.x2, this.y2, this.radio, this.color);
        this.puente = new Linea(this.x1+this.radio, this.y1, this.x2-this.radio, this.y2, 1, this.color);
    }

    dibujar() {
        this.cristal_izq.dibujar();
        this.cristal_der.dibujar();
        this.puente.dibujar();
    }

    mover(x, y) {
        this.x1 += x;
        this.y1 += y;
        this.x2 += x;
        this.y2 += y;

        this.cristal_izq.mover(x, y);
        this.cristal_der.mover(x, y);
        this.puente.mover(x, y);
    }

    borrar() {
        this.cristal_izq.borrar();
        this.cristal_der.borrar();
        this.puente.borrar();
    }
}

class Brazo {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;

        this.hombro = new Circulo(this.x, this.y, w/2, this.color);
        this.mano = new Circulo(this.x, this.y+this.h, w/2, pelo_oscuro_color);
        this.brazo = new Rectangulo(this.x-w/2, this.y, this.w, this.h, this.color);
    }

    dibujar() {
        this.hombro.dibujar();
        this.mano.dibujar();
        this.brazo.dibujar();
    }

    mover(x, y) {
        this.x += x;
        this.y += y;

        this.hombro.mover(x, y);
        this.mano.mover(x, y);
        this.brazo.mover(x, y);
    }

    borrar() {
        this.hombro.borrar();
        this.mano.borrar();
        this.brazo.borrar();
    }
}

class Pierna {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;

        this.cadera = new Circulo(this.x, this.y, w / 2, this.color);
        this.puntera = new Circulo(this.x + this.w, this.y + this.h + w / 2, w / 2, pelo_oscuro_color);
        this.pie = new Rectangulo(this.x - this.w / 2, this.y + this.h, this.h / 2, this.w, pelo_oscuro_color);
        this.pierna = new Rectangulo(this.x - this.w / 2, this.y, this.w, this.h, this.color);
    }

    dibujar() {
        this.cadera.dibujar();
        this.puntera.dibujar();
        this.pie.dibujar();
        this.pierna.dibujar();
    }

    mover(x, y) {
        this.x += x;
        this.y += y;

        this.cadera.mover(x, y);
        this.puntera.mover(x, y);
        this.pie.mover(x, y);
        this.pierna.mover(x, y);
    }

    borrar() {
        this.cadera.borrar();
        this.puntera.borrar();
        this.pie.borrar();
        this.pierna.borrar();
    }
}

class Corbata {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }

    dibujar() {
        //nudo
        context.beginPath();
        context.moveTo(this.x-20, this.y-10);
        context.lineTo(this.x+20, this.y-10);
        context.lineTo(this.x+10, this.y+10);
        context.lineTo(this.x-10, this.y+10);    
        context.closePath();
        context.fillStyle = corbata_color; 
        context.fill();
        context.strokeStyle = borde_color;
        context.lineWidth = 2;
        context.stroke();

        //corbata
        context.beginPath();
        context.moveTo(this.x-10, this.y+70);
        context.lineTo(this.x, this.y+80);
        context.lineTo(this.x+10, this.y+70);
        context.lineTo(this.x+10, this.y+10);
        context.lineTo(this.x-10, this.y+10);
        context.closePath();
        context.fillStyle = corbata_color;
        context.fill();
        context.stroke();
    }

    mover(x, y) {
        this.borrar();
        this.x += x;
        this.y += y;
    }

    borrar() {
        context.clearRect(
            this.x - this.w - borde_size,
            this.y - this.h - borde_size,
            2 * this.w + 2 * borde_size,
            2 * this.h + 2 * borde_size
        );
    }
}

class Circulo {
    constructor(x, y, radio, color) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
    }

    dibujar() {
        context.strokeStyle = borde_color;
        context.lineWidth = borde_size;
        context.beginPath();
        context.arc(this.x, this.y, this.radio, 0, circulo);
        context.fillStyle = this.color;
        context.fill();
        context.stroke();
    }

    mover(x, y) {
        this.borrar();
        this.x += x;
        this.y += y;
    }

    borrar() {
        context.clearRect(this.x - this.radio -borde_size, this.y - this.radio -borde_size, 2*this.radio + 2*borde_size, 2*this.radio + 2*borde_size);
    }
}

class Triangulo {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }

    dibujar() {
        context.strokeStyle = borde_color;
        context.lineWidth = borde_size; // Ancho del borde
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x - (this.w / 2), this.y - this.h);
        context.lineTo(this.x + (this.w / 2), this.y - this.h);
        context.closePath();
        context.fillStyle = pelo_color;
        context.fill();
        context.stroke();
    }

    mover(x, y) {
        this.borrar();
        this.x += x;
        this.y += y;
    }

    borrar() {
        context.clearRect(
            this.x - this.w - borde_size,
            this.y - this.h - borde_size,
            2 * this.w + 2 * borde_size,
            2 * this.h + 2 * borde_size
        );
    }
}

class Rectangulo {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }

    dibujar() {
        context.strokeStyle = borde_color;
        context.lineWidth = borde_size; // Ancho del borde
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
        context.strokeRect(this.x, this.y, this.w, this.h);
    }

    mover(x, y) {
        this.borrar();
        this.x += x;
        this.y += y;
    }

    borrar() {
        context.clearRect(
            this.x - borde_size,
            this.y - borde_size,
            this.w + 2 * borde_size,
            this.h + 2 * borde_size
        );
    }
}

class Linea {
    constructor(x1, y1, x2, y2, grosor) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.grosor = grosor;
    }

    dibujar() {      
        context.strokeStyle = borde_color;
        context.lineWidth = this.grosor;
        context.beginPath();
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
        context.stroke();
    }

    mover(x, y) {
        this.borrar();
        this.x1 += x;
        this.y1 += y;
        this.x2 += x;
        this.y2 += y;
        this.dibujar();
    }

    borrar() {
        const borde_size = context.lineWidth;
        const minX = Math.min(this.x1, this.x2) - borde_size;
        const minY = Math.min(this.y1, this.y2) - borde_size;
        const maxX = Math.max(this.x1, this.x2) + borde_size;
        const maxY = Math.max(this.y1, this.y2) + borde_size;
        const width = maxX - minX;
        const height = maxY - minY;
        context.clearRect(minX, minY, width, height);
    }
}

document.addEventListener("onload", estado_inicial());

function estado_inicial() {
    const raton = new Raton(200, 200, 300, 300, 180);
    raton.dibujar();
    // const cara = new Cabeza(200, 200, 120, 130, pelo_color);
    // cara.dibujar();
    // var cont=0;

    // var intervalo = setInterval(function() {
    //     context.clearRect(0, 0, canvas.width, canvas.height);
    //     cont++;
    //     rotar(raton, 10*cont);
    //     if (cont === 10) {
    //         clearInterval(intervalo); // Utilizar el identificador del intervalo para detenerlo
    //     }
    // }, 100);
}
