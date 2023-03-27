function generateObject(parameters){

}

class vector2{
    constructor(x, y){
        this.x = x
        this.y = y
    }

    add(additionVector2){
        this.x += additionVector2.x
        this.y += additionVector2.y
        return this
    }

    static additionVector2(vector2_1, vector2_2){
        return new vector2(vector2_1.x + vector2_2.x, vector2_1.y + vector2_2.y)
    }

    multiply(number){
        this.x *= number
        this.y *= number
        return this
    }

    static multiplyVector2(multipliedVector2, number){
        return new vector2(multipliedVector2.x * number, multipliedVector2.y * number)
    }
}

class scene{
    constructor(){
        this.objects = []
    }

    addObject(id, object){
        this.objects.push({"id":id, "object":object})
    }

    getObject(id){
        let findObject = this.objects.find(function(arrayObject){
            return arrayObject.id == id
        })
        if(findObject){
            return findObject.object
        }else{
            // TODO Create an exception
        }
    }

    calculeCollision(id, newPosition){
        let collisionObject = this.getObject(id)
        for(let i = 0; i < this.objects.length; i++){
            if(this.objects[i].id != id){
                let topCollision = 
                this.objects[i].object.position.y + this.objects[i].object.size.y > newPosition.y
                let bottomCollision = 
                newPosition.y + collisionObject.size.y > this.objects[i].object.position.y
                let leftCollision = 
                this.objects[i].object.position.x + this.objects[i].object.size.x > newPosition.x
                let rightCollision = 
                newPosition.x + collisionObject.size.x > this.objects[i].object.position.x
                if(topCollision && bottomCollision && leftCollision && rightCollision){
                    if(collisionObject.collisionFunction){
                        collisionObject.collisionFunction()
                    }
                    return false
                }
            }
        }
        return true
    }
}

class object{
    // constructor(position){
    constructor(id, objectScene, position, size, object = null){
        this.id = id
        this.objectScene = objectScene
        this.position = position
        this.object = object
        this.size = size
        this.setPosition(this.position)
        this.objectScene.addObject(this.id, this)
    }

    move(movement){
        this.position = vector2.additionVector2(this.position, movement)
        if(this.object){
            this.setPosition(this.position)
        }
    }

    setPosition(newPosition){
        this.object.style.left = newPosition.x + "px"
        this.object.style.top = newPosition.y + "px"
    }

    setObject(newObject){
        this.object = newObject
        this.setPosition(this.position)
    }
}

class grid{
    constructor(gridContainer, width, height, tileSize){
        this.width = width
        this.height = height
        this.tileSize = tileSize
        this.setGrid(gridContainer)
    }

    setGrid(newGrid){
        this.gridContainer = newGrid
        this.gridContainer.style.width = (this.width + 1) * this.tileSize + "px"
        this.gridContainer.style.height = (this.height + 1) * this.tileSize + "px"
    }
}

class gridObject extends object{
    constructor(grid, objectScene, id, position, size, object){
        super(id, objectScene, vector2.multiplyVector2(position, grid.tileSize), new vector2(grid.tileSize, grid.tileSize), object)
        this.grid = grid
        this.gridPosition = position
    }

    gridTransform(movement){
        this.setPosition(vector2.multiplyVector2(movement, this.grid.tileSize))
        this.gridPosition = movement
    }

    gridMove(movement){
        let finalPosition = vector2.additionVector2(this.gridPosition, movement)
        if(finalPosition.x <= this.grid.width && 
            finalPosition.x >= 0 && 
            finalPosition.y <= this.grid.height && 
            finalPosition.y >= 0){
            this.gridTransform(vector2.additionVector2(this.gridPosition, movement))
            this.gridPosition = finalPosition
        }
        console.log(this.gridPosition.x + " " + this.gridPosition.y)
    }
}

