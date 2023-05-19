var canvas = document.getElementById("ratonCanvas");
var context = canvas.getContext("2d");

// Dibujar los rectángulos rojos (salientes del cuerpo)
context.fillStyle = "red";
context.fillRect(150, 230, 20, 60);
context.fillRect(230, 230, 20, 60);

// Dibujar los rectángulos rojos (salientes del cuerpo)
context.fillStyle = "red";
context.fillRect(120, 270, 30, 20);
context.fillRect(250, 270, 30, 20); 

// Dibujar el círculo grande amarillo (cuerpo del ratón)
context.beginPath();
context.arc(200, 175, 80, 0, 2 * Math.PI);
context.fillStyle = "yellow";
context.fill();

// Dibujar el triángulo mediano naranja (cuerpo del ratón)
context.beginPath();
context.moveTo(150, 50);
context.lineTo(250, 50);
context.lineTo(200, 150);
context.closePath();
context.fillStyle = "orange";
context.fill();

// Dibujar las orejas (dos círculos medianos rojos)
context.beginPath();
context.arc(150, 50, 30, 0, 2 * Math.PI);
context.fillStyle = "red";
context.fill();

context.beginPath();
context.arc(250, 50, 30, 0, 2 * Math.PI);
context.fillStyle = "red";
context.fill();

// Dibujar los rectángulos rojos (salientes del cuerpo)
context.fillStyle = "red";
context.save(); // Guardar el estado actual del lienzo
context.translate(70, 130); // Mover el origen del lienzo al punto de inicio del primer rectángulo
context.rotate((180 * Math.PI) / 180); // Rotar el lienzo en 90 grados en sentido horario
context.fillRect(0, 0, 20, 60); // Dibujar el primer rectángulo en el origen del lienzo rotado
context.restore(); // Restaurar el estado original del lienzo

context.save(); // Guardar el estado actual del lienzo
context.translate(270, 130); // Mover el origen del lienzo al punto de inicio del segundo rectángulo
context.rotate((90 * Math.PI) / 180); // Rotar el lienzo en 90 grados en sentido horario
context.fillRect(0, 0, 20, 60); // Dibujar el segundo rectángulo en el origen del lienzo rotado
context.restore(); // Restaurar el estado original del lienzo
