let elementsContainer, elementsContainer2, keyboardEvent, gameFrog, gameFrog2, frogContainer, frogContainer2, mainGrid, mainGrid2

let levels = [
    {"level":1, "name":"Cloaca", "backgroundImage":"../img/grafico-cloaca.png"},
    {"level":2, "name":"Carretera", "backgroundImage":"../img/grafico-carretera.png"},
    {"level":3, "name":"Level name", "backgroundImage":"../img/grafico3.png"}
]

let actualLevel = 0

class levelManager{
    static loadLevel(level){    // TODO Do this with classes
        elementsContainer.style.backgroundImage = "url(" + level.backgroundImage + ")"
        gameFrog.gridTransform(new vector2(3, 0))
    }
}

class level {
    constructor(name, backgroundImage){
        this.name = name
        this.backgroundImage = backgroundImage
    }
}

class frog extends gridObject {
    constructor(objectGrid, objectScene, id, object) {
        super(objectGrid, objectScene, id, new vector2(3, 0), new vector2(100, 100), object);
        this.gridPosition = new vector2(3, 0); // Inicializar la propiedad gridPosition en el constructor
    }

    gridMove(offset) {
        super.gridMove(offset);
        if (this.gridPosition.y === 6) {
            // Si la rana llegó a la fila 6, activa la transición a la siguiente pantalla
            if(actualLevel <= levels.length - 1){
                levelManager.loadLevel(levels[++actualLevel])
            }
        }
    }
}

function transitionToNextScreen() {
    //transición a la siguiente pantalla
    gameFrog.gridTransform(new vector2(3, 0));
    mainGrid.setGrid(document.getElementById('elementsContainer2'))
    gameFrog.setObject(document.getElementById('rana2'))
    document.getElementById('elementsContainer').style.display = 'none';
    document.getElementById('elementsContainer2').style.display = 'grid';
}

window.addEventListener('load', () => {
    elementsContainer = document.getElementById('elementsContainer')
    elementsContainer2 = document.getElementById('elementsContainer2')
    mainScene = new scene()
    keyboardEvent = new KeyboardEvent("keydown")
    frogContainer = document.getElementById('rana')
    mainGrid = new grid(elementsContainer, 6, 6, 100)
    gameFrog = new frog(mainGrid, mainScene, "mainFrog", frogContainer)
    document.onkeydown = moveCharacter;
});

function ranasalta() {
    var isJumping = false;
    var rana = document.getElementById("rana");
    var rana1 = "../img/dona.gif"; // ruta del gif de posición "parado"
    var rana2 = "../img/saltar.gif"; // ruta del gif de posición "salto"
    if (!isJumping) { // si la rana no está saltando actualmente
        isJumping = true; // marcar como saltando
        rana.src = rana2; // cambiar la imagen a la de salto
        rana.classList.add("jump"); // agregar la clase "jump" para iniciar la animación de salto
        setTimeout(function () { // después de 1000 milisegundos
            rana.classList.remove("jump"); // eliminar la clase "jump" para detener la animación de salto
            rana.src = rana1; // cambiar la imagen de vuelta a la de posición "parado"
            isJumping = false; // marcar como no saltando
        }, 1000);
    }
};

// function moveFrog(){
//     gameFrog.gridMove(new vector2(2, 2))
// }

function moveCharacter(e) {
    switch (e.keyCode) {
        case 87:
            gameFrog.gridMove(new vector2(0, -1))
            break;
        case 65:
            gameFrog.gridMove(new vector2(-1, 0))
            break;
        case 83:
            gameFrog.gridMove(new vector2(0, 1))
            ranasalta()
            break;
        case 68:
            gameFrog.gridMove(new vector2(1, 0))
            break;
    }
}

