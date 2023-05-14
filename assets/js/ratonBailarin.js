var canvas = document.getElementById("ratonCanvas");
var context = canvas.getContext("2d");

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
context.fillRect(70, 130, 60, 20);
context.fillRect(270, 130, 60, 20);


// Dibujar los rectángulos rojos (salientes del cuerpo)
context.fillStyle = "red";
context.fillRect(120, 380, 60, 20);
context.fillRect(220, 380, 60, 20);