const canvas = document.getElementById("ratonCanvas");
const context = canvas.getContext("2d");
const audio_check = document.getElementById('audio');

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

var raton;

var clicked = false;

var parar_mover_brazos = true;
var parar_mover_cabeza = true;
var parar_parpadeo = true;
var salto_realizado = false;
var saludando = false;

//Ratón
class Raton {
    constructor(x, y, w, h, rotation) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.rotation = rotation;
        
        this.cabeza = new Cabeza(this.x, this.y-h/8, this.w/3, this.h/3, this.h/3, 0);
        this.brazo_izq = new Brazo(this.x-this.h/5, this.y-this.y/7, 20, 70, camisa_color, 0);
        this.brazo_der = new Brazo(this.x+this.h/5, this.y-this.y/7, 20, 70, camisa_color, 0);
        this.cuerpo = new Circulo(this.x, this.y, this.w/2-this.h/4, camisa_color, 0);
        this.corbata = new Corbata(this.x, this.y-h/8, this.w/2-this.h/4, h, corbata_color, 0);
        this.gafas = new Gafas(this.x-15, this.y-h/5, this.x+15, this.y-h/5, 8, gafas_color, 0);
        this.pierna_izq = new Pierna(this.x-this.h/8, this.y+this.y/4, 20, 70, pantalon_color, 0);
        this.pierna_der = new Pierna(this.x+this.h/8, this.y+this.y/4, 20, 70, pantalon_color, 0);
    }

    dibujar() {
        context.save();
        context.translate(this.x, this.y); // Establecer el punto de origen
        context.rotate((this.rotation * Math.PI) / 180); // Rotar el contexto en 30 grados (ajusta el ángulo según tus necesidades)
        context.translate(-this.x, -this.y); // Restablecer el punto de origen

        this.pierna_izq.dibujar();
        this.pierna_der.dibujar();
        this.cuerpo.dibujar();
        this.corbata.dibujar();
        this.cabeza.dibujar();
        this.brazo_izq.dibujar();
        this.brazo_der.dibujar();
        this.gafas.dibujar();

        context.restore();
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
    constructor(x, y, w, h, color, rotation) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.rotation = rotation;

        this.cabeza = new Triangulo(this.x, this.y, this.w, this.h, pelo_color, 0);
        this.ojo_izq = new Ojo(this.x-15, this.h, 8, 0);
        this.ojo_der = new Ojo(this.x+15, this.h, 8, 0);
        this.oreja_izq = new Oreja(this.x - (this.w / 2), this.y-this.h, 30, 0);
        this.oreja_der = new Oreja(this.x + (this.w / 2), this.y-this.h, 30, 0);
        this.nariz = new Circulo(this.x, this.y, 5, pelo_oscuro_color, 0);
    }

    dibujar() {
        context.save();
        context.translate(this.x, this.y); // Establecer el punto de origen
        context.rotate((this.rotation * Math.PI) / 180); // Rotar el contexto en 30 grados (ajusta el ángulo según tus necesidades)
        context.translate(-this.x, -this.y); // Restablecer el punto de origen

        this.cabeza.dibujar();
        this.ojo_izq.dibujar();
        this.ojo_der.dibujar();
        this.oreja_izq.dibujar();
        this.oreja_der.dibujar();
        this.nariz.dibujar();

        context.restore();
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
    constructor(x, y, radio, rotation) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.rotation = rotation;

        this.iris = new Circulo(this.x, this.y, this.radio, ojos_color, 0);
        this.pupila = new Circulo(this.x, this.y, this.radio/2, pupilas_color, 0);
    }

    dibujar() {
        context.save();
        context.translate(this.x, this.y); // Establecer el punto de origen
        context.rotate((this.rotation * Math.PI) / 180); // Rotar el contexto en 30 grados (ajusta el ángulo según tus necesidades)
        context.translate(-this.x, -this.y); // Restablecer el punto de origen

        this.iris.dibujar();
        this.pupila.dibujar();

        context.restore();
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
    constructor(x, y, radio, rotation) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.rotation = rotation;

        this.exterior = new Circulo(this.x, this.y, this.radio, pelo_color, 0);
        this.interior = new Circulo(this.x, this.y, this.radio/2, orejas_color, 0);
    }

    dibujar() {
        context.save();
        context.translate(this.x, this.y); // Establecer el punto de origen
        context.rotate((this.rotation * Math.PI) / 180); // Rotar el contexto en 30 grados (ajusta el ángulo según tus necesidades)
        context.translate(-this.x, -this.y); // Restablecer el punto de origen

        this.exterior.dibujar();
        this.interior.dibujar();

        context.restore();
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
    constructor(x1, y1, x2, y2, radio, color, rotation) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.radio = radio;
        this.color = color;
        this.rotation = rotation;

        this.cristal_izq = new Circulo(this.x1, this.y1, this.radio, this.color, 0);
        this.cristal_der = new Circulo(this.x2, this.y2, this.radio, this.color, 0);
        this.puente = new Linea(this.x1+this.radio, this.y1, this.x2-this.radio, this.y2, 1, this.color, 0);
    }

    dibujar() {
        context.save();
        context.translate(this.x, this.y); // Establecer el punto de origen
        context.rotate((this.rotation * Math.PI) / 180); // Rotar el contexto en 30 grados (ajusta el ángulo según tus necesidades)
        context.translate(-this.x, -this.y); // Restablecer el punto de origen

        this.cristal_izq.dibujar();
        this.cristal_der.dibujar();
        this.puente.dibujar();

        context.restore();
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
    constructor(x, y, w, h, color, rotation) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.rotation = rotation;

        this.hombro = new Circulo(this.x, this.y, w/2, this.color, 0);
        this.mano = new Circulo(this.x, this.y+this.h, w/2, pelo_oscuro_color, 0);
        this.brazo = new Rectangulo(this.x-w/2, this.y, this.w, this.h, this.color, 0);
    }

    dibujar() {
        context.save();
        context.translate(this.x, this.y); // Establecer el punto de origen
        context.rotate((this.rotation * Math.PI) / 180); // Rotar el contexto en 30 grados (ajusta el ángulo según tus necesidades)
        context.translate(-this.x, -this.y); // Restablecer el punto de origen

        this.hombro.dibujar();
        this.mano.dibujar();
        this.brazo.dibujar();

        context.restore();
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
    constructor(x, y, w, h, color, rotation) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.rotation = rotation;

        this.cadera = new Circulo(this.x, this.y, w / 2, this.color, 0);
        this.puntera = new Circulo(this.x + this.w, this.y + this.h + w / 2, w / 2, pelo_oscuro_color, 0);
        this.pie = new Rectangulo(this.x - this.w / 2, this.y + this.h, this.h / 2, this.w, pelo_oscuro_color, 0);
        this.pierna = new Rectangulo(this.x - this.w / 2, this.y, this.w, this.h, this.color, 0);
    }

    dibujar() {
        context.save();
        context.translate(this.x, this.y); // Establecer el punto de origen
        context.rotate((this.rotation * Math.PI) / 180); // Rotar el contexto en 30 grados (ajusta el ángulo según tus necesidades)
        context.translate(-this.x, -this.y); // Restablecer el punto de origen

        this.cadera.dibujar();
        this.puntera.dibujar();
        this.pie.dibujar();
        this.pierna.dibujar();

        context.restore();
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
    constructor(x, y, w, h, color, rotation) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.rotation = rotation;
    }

    dibujar() {
        context.save();
        context.translate(this.x, this.y); // Establecer el punto de origen
        context.rotate((this.rotation * Math.PI) / 180); // Rotar el contexto en 30 grados (ajusta el ángulo según tus necesidades)
        context.translate(-this.x, -this.y); // Restablecer el punto de origen

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

        context.restore();
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
    constructor(x, y, radio, color, rotation) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
        this.rotation = rotation;

        this.borde_color = borde_color;
    }

    dibujar() {
        context.save();
        context.translate(this.x, this.y); // Establecer el punto de origen
        context.rotate((this.rotation * Math.PI) / 180); // Rotar el contexto en 30 grados (ajusta el ángulo según tus necesidades)
        context.translate(-this.x, -this.y); // Restablecer el punto de origen

        context.strokeStyle = this.borde_color;
        context.lineWidth = borde_size;
        context.beginPath();
        context.arc(this.x, this.y, this.radio, 0, circulo);
        context.fillStyle = this.color;
        context.fill();
        context.stroke();

        context.restore();
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
    constructor(x, y, w, h, color, rotation) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.rotation = rotation;
    }

    dibujar() {
        context.save();
        context.translate(this.x, this.y); // Establecer el punto de origen
        context.rotate((this.rotation * Math.PI) / 180); // Rotar el contexto en 30 grados (ajusta el ángulo según tus necesidades)
        context.translate(-this.x, -this.y); // Restablecer el punto de origen

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

        context.restore();
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
    constructor(x, y, w, h, color, rotation) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.rotation = rotation;
    }

    dibujar() {
        context.save();
        context.translate(this.x, this.y); // Establecer el punto de origen
        context.rotate((this.rotation * Math.PI) / 180); // Rotar el contexto en 30 grados (ajusta el ángulo según tus necesidades)
        context.translate(-this.x, -this.y); // Restablecer el punto de origen

        context.strokeStyle = borde_color;
        context.lineWidth = borde_size; // Ancho del borde
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
        context.strokeRect(this.x, this.y, this.w, this.h);

        context.restore();
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
    constructor(x1, y1, x2, y2, grosor, rotation) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.grosor = grosor;
        this.rotation = rotation;
    }

    dibujar() {   
        context.save();
        context.translate(this.x, this.y); // Establecer el punto de origen
        context.rotate((this.rotation * Math.PI) / 180); // Rotar el contexto en 30 grados (ajusta el ángulo según tus necesidades)
        context.translate(-this.x, -this.y); // Restablecer el punto de origen

        context.strokeStyle = borde_color;
        context.lineWidth = this.grosor;
        context.beginPath();
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
        context.stroke();

        context.restore();
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

audio_check.addEventListener("play", function() {
    if(saludando) {return;}
    bailar(raton);

    parar_mover_brazos = false;
    parar_parpadeo = false;
    parar_mover_cabeza = false;
    salto_realizado = false;    
});

audio_check.addEventListener("pause", function() {
    if(saludando) {return;}
    bailar(raton);

    parar_mover_brazos = true;
    parar_parpadeo = true;
    parar_mover_cabeza = true;
    salto_realizado = true;
    
});

function estado_inicial() {
    raton = new Raton(200, 200, 300, 300, 0); 
    raton.dibujar();;
    saludar();
}


function bailar() {
    movimiento_brazos();
    parpadear();
    moverCabeza();
}

function saludar() {
    var cont = 0;
    var reps = 1;
    var repetir = false;
    saludando = true;

    var intervalo = setInterval(function() {
        cont++;
        context.clearRect(0, 0, canvas.width, canvas.height);
        raton.brazo_der.rotation = -10 * cont;
        raton.dibujar();

        if(cont == 18) {
            clearInterval(intervalo);
            var intervalo2 = setInterval(function() {
                context.clearRect(0, 0, canvas.width, canvas.height);
                raton.brazo_der.rotation = -10 * cont;
                raton.dibujar();

                if(raton.brazo_der.rotation == 0) {
                    clearInterval(intervalo2);
                    saludando = false;
                    bailar(raton);
                }

                if(reps == 3) {
                    cont--;
                } else {
                    if(repetir) {
                        cont--;
                    } else {
                        cont++;
                    }

                    if(cont == 22) {
                        repetir = true;
                    }
            
                    if(cont == 16) {
                        repetir = false;
                        reps++;
                    }
                }
            }, 60);
        }
    }, 60);
}

function movimiento_brazos() {
  var cont = 0;
  var derecha = true;

  var intervalo = setInterval(function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    raton.brazo_der.rotation = -5 * cont;
    raton.brazo_izq.rotation = -5 * cont;
    raton.dibujar();

    var aleatorio = Math.floor(Math.random() * 25) + 1;

    if (raton.brazo_izq.rotation == -50) {
      derecha = false;
    }

    if (raton.brazo_izq.rotation == 50) {
      derecha = true;
    }

    if (derecha) {
      cont++;
    } else {
      cont--;
    }

    if (parar_mover_brazos) {
      clearInterval(intervalo);
    }

    // Realizar salto de forma aleatoria si aún no se ha realizado
    if (!salto_realizado && aleatorio == 1) {
        salto_realizado = true;
        saltar(raton);
    }
  }, 50);
}

function saltar() {
  var cont = 0;
  var subiendo = true;
  var preparado = true;
  var parar = false;
  var y_origen = raton.y;

  var intervalo = setInterval(function() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (preparado) {
        raton.pierna_der.rotation = -5 * cont;
        raton.pierna_izq.rotation = 5 * cont;
    }

    raton.dibujar();

    if (raton.pierna_der.rotation == -45) {
      preparado = false;
    }

    if (preparado && !parar) {
      cont++;
    }

    if (!parar) {
      if (!preparado && subiendo) {
        raton.mover(0, -10);
        raton.corbata.rotation += 3;
      } else if (!preparado && !subiendo) {
        raton.mover(0, 10);
        raton.corbata.rotation -= 3;
      }
    } else {
      cont--;
      raton.pierna_der.rotation = -5 * cont;
      raton.pierna_izq.rotation = 5 * cont;
    }

    if (raton.y == y_origen - 100) {
      subiendo = false;
    }

    if (raton.y == y_origen && !subiendo) {
      parar = true;
    }

    if (parar && cont < 0) {
        raton.pierna_der.rotation = 0;
        raton.pierna_izq.rotation = 0;
        clearInterval(intervalo);
    }
  }, 80);
}

function parpadear() {
    var intervalo = setInterval(function() {
        var aleatorio = Math.random(); // Generar número aleatorio entre 0 y 1

        if (aleatorio < 0.05) { // Probabilidad del 20% de parpadear
            //raton.ojo_der.iris.color = pelo_color;
            raton.cabeza.ojo_der.iris.color = pelo_color;
            raton.cabeza.ojo_der.pupila.color = pelo_color;
            raton.cabeza.ojo_der.pupila.borde_color = pelo_color;
            raton.cabeza.ojo_izq.iris.color = pelo_color;
            raton.cabeza.ojo_izq.pupila.color = pelo_color;
            raton.cabeza.ojo_izq.pupila.borde_color = pelo_color;

        } else {
            //raton.ojo_der.iris.color = ojos_color;
            raton.cabeza.ojo_der.iris.color = ojos_color;
            raton.cabeza.ojo_der.pupila.color = pupilas_color;
            raton.cabeza.ojo_der.pupila.borde_color = borde_color;
            raton.cabeza.ojo_izq.iris.color = ojos_color;
            raton.cabeza.ojo_izq.pupila.color = pupilas_color;
            raton.cabeza.ojo_izq.pupila.borde_color = borde_color;
        }

        raton.dibujar();

        if (parar_parpadeo) {
            clearInterval(intervalo);
        }
    }, 200);
}

function moverCabeza() {
    var intervalo = setInterval(function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
      var aleatorio = Math.random(); // Generar número aleatorio entre 0 y 1
  
      if (aleatorio < 0.1) { // Probabilidad del 50% de mover la cabeza
        var angulo = Math.floor(Math.random() * 10) - 5; // Ángulo aleatorio entre -5 y 5
        raton.cabeza.rotation = angulo; // Mover la cabeza del ratón al ángulo aleatorio
      }
  
      raton.dibujar();
  
      if (parar_mover_cabeza) {
        clearInterval(intervalo);
      }
    }, 200); // Intervalo de tiempo de 200 ms (movimiento cada 0.2 segundos)
  }
  
  
