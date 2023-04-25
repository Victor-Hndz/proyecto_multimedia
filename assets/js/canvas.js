document.addEventListener("keypress", function(event) {
    switch(event.key)
    {
        case "w":  
        case "ArrowUp":
            myGame.player.speed[1] = -1;        
            break;
        case "s":
        case "ArrowDown":
            myGame.player.speed[1] = 1; 
            break;
        case "a":
        case "ArrowLeft":
            myGame.player.speed[0] = -1;
            break;
        case "d":
        case "ArrowRight":
            myGame.player.speed[0] = 1;
            break;
    }
    myGame.player.speed = normalizeVector(myGame.player.speed);
});

document.addEventListener("keyup", function(event) {
    switch(event.key) {
        case "w":
        case "ArrowUp":
            myGame.player.speed[1] = 0;
            break;
        case "s":
        case "ArrowDown":
            myGame.player.speed[1] = 0;
            break;
        case "a":
        case "ArrowLeft":
           myGame.player.speed[0] = 0; 
            break;
        case "d":
        case "ArrowRight":
            myGame.player.speed[0] = 0;
            break;
    }
    myGame.player.speed = normalizeVector(myGame.player.speed);
});

class Artifact {
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = new Image();
        this.sprite.src = "assets/img/svg/pez.svg";
    }

    draw() {
        myGame.context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
}
class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = [0,0]; //(x, y) vector
        this.sprite = new Image();
        this.sprite.src = "assets/img/svg/rana.svg"
    }

    draw() {
        myGame.context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
    move() {       
        var tempX = this.x + this.speed[0] * 2;
        var tempY = this.y + this.speed[1] * 2;
        
        if (tempX < 0) { 
            this.x = 0; 
        } else if(tempX > myGame.canvas.width - this.width) {
            this.x = myGame.canvas.width - this.width;
        } else { 
            this.x = tempX; 
        }
        
        if (tempY < 0) { 
            this.y = 0; 
        } else if(tempY > myGame.canvas.height - this.height) {
            this.y = myGame.canvas.height - this.height;
        } else { 
            this.y = tempY; 
        }
    }
}


var myGame = {
    start: function() {
        this.canvas = document.getElementById("juego");
        this.FrameNo = 0;
        this.player = new Player(this.canvas.width/2 - 25, this.canvas.height/2 - 25, 50, 50);
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGame, 5);
        this.artifacts = [];
        this.artifacts.push(new Artifact(100, 100, 25, 25));
        this.artifacts.push(new Artifact(200, 200, 25, 25));
        this.artifacts.push(new Artifact(300, 300, 25, 25));
        this.artifacts.push(new Artifact(400, 400, 25, 25));    
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    }
}
function startGame() { 
    myGame.start();
}

function updateGame() {
    
    myGame.clear();
    if(myGame.artifacts.length == 0) {
        alert("You win!");
        clearInterval(myGame.interval);
    }
    myGame.player.move();
    myGame.player.draw();

    myGame.artifacts.forEach(artifact => {
        artifact.draw();
    });

    //Comprobar si se puede mover

    //mover
    
    //Chequear colisiones
    myGame.artifacts.forEach(artifact => {
        if (artifact.x < myGame.player.x + myGame.player.width &&
            artifact.x + artifact.width > myGame.player.x &&
            artifact.y < myGame.player.y + myGame.player.height &&
            artifact.y + artifact.height > myGame.player.y) {
                myGame.artifacts.splice(myGame.artifacts.indexOf(artifact), 1);
        }
    });

    
}

//function to normalize a vector
function normalizeVector(vector) {
    const x = vector[0];
    const y = vector[1];
    const magnitude = Math.sqrt(x * x + y * y);
    if (magnitude != 0) {
        return [x / magnitude, y / magnitude];
    } else {
        return [x, y]
    }
}


  