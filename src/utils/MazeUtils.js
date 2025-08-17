import { findAllByAltText } from "@testing-library/dom"
import UnionFind from "./UnionFind"

let counter = 0
async function generateMazeRecursiveDFS(maze, x, y) {
    maze[x][y].setType("empty")
    maze[x][y].type = "empty"

    if (counter % Math.floor((maze.length+maze[0].length)/10) == 0) await new Promise(res => setTimeout(res, 1))

    const directions = [[-2,0],[2,0],[0,-2],[0,2]]
    directions.sort(() => Math.random() - 0.5)

    for (let [dx, dy] of directions) {
        const newX = x + dx
        const newY = y + dy

        if (newX >= 1 && newY >= 1 && newX < maze.length-1 && newY < maze[0].length-1 && maze[newX][newY].type === "wall") {
            maze[x + dx/2][y + dy/2].setType("empty")
            maze[x + dx/2][y + dy/2].type = "empty"
            await generateMazeRecursiveDFS(maze, newX, newY)
        }
    }
}


export async function generateMazeIterativeDFS(maze, x, y) {
    maze[x][y].setType("empty")
    maze[x][y].type = "empty"   

    const stack = []

    stack.push([x, y])

    let counter = 0

    while(stack.length !== 0) {

        counter++

        if (counter % Math.floor((maze.length+maze[0].length)/10) == 0) await new Promise(res => setTimeout(res, 1))

        const [currX, currY] = stack.pop()

        const directions = [[-2,0],[2,0],[0,-2],[0,2]]
        directions.sort(() => Math.random() - 0.5)

        for (let [dx, dy] of directions) {
            const newX = currX + dx
            const newY = currY + dy

            if (newX >= 1 && newY >= 1 && newX < maze.length-1 && newY < maze[0].length-1 && maze[newX][newY].type === "wall") {

                stack.push([currX, currY])

                maze[currX + dx/2][currY + dy/2].setType("empty")
                maze[currX + dx/2][currY + dy/2].type = "empty"

                maze[newX][newY].setType("empty")
                maze[newX][newY].type = "empty"   
                
                stack.push([newX, newY])
            }
        }
    }

}

export async function generateMazePrim(maze, x, y) {
    maze[x][y].setType("empty")
    maze[x][y].type = "empty"

    const walls = []

    const wallDirections = [[-1,0], [1, 0], [0,-1], [0, 1]]

    for (let [dx, dy] of wallDirections){
        const newX = x + dx
        const newY = y + dy

        if (newX >= 1 && newY >= 1 && newX < maze.length-1 && newY < maze[0].length-1 && maze[newX][newY].type === "wall") {
            walls.push([newX, newY])
        }
    }

    let primCounter = 0
    while (walls.length !== 0) {
        primCounter++
        if (primCounter % Math.floor((maze.length+maze[0].length)/10) == 0) await new Promise(res => setTimeout(res, 1))

        const random = Math.floor(Math.random() * (walls.length))
        const [newX, newY] = walls[random]
        walls.splice(random, 1)

        let [newEmptyX, newEmptyY] = [null, null]

        // if wall is horizontal
        if (newX % 2 == 1 && newY % 2 == 0){

            // if left cell is visited and right cell is unvisited, remove the wall between them and add unvisited wall to the wall list
            if (maze[newX][newY - 1].type === "empty" && maze[newX][newY + 1].type === "wall"){
                maze[newX][newY].setType("empty")
                maze[newX][newY].type = "empty"

                newEmptyX = newX
                newEmptyY = newY + 1

                maze[newEmptyX][newEmptyY].setType("empty")
                maze[newEmptyX][newEmptyY].type = "empty"

            }
            // if right cell is visited and left cell is unvisited, remove the wall between them and add unvisited wall to the wall list
            else if (maze[newX][newY - 1].type === "wall" && maze[newX][newY + 1].type === "empty"){
                maze[newX][newY].setType("empty")
                maze[newX][newY].type = "empty"

                newEmptyX = newX
                newEmptyY = newY - 1

                maze[newEmptyX][newEmptyY].setType("empty")
                maze[newEmptyX][newEmptyY].type = "empty"
            }
        }
        // if wall is vertical
        else if (newX % 2 == 0 && newY % 2 == 1){

            // if upper cell is visited and lower cell is unvisited, remove the wall between them and add unvisited wall to the wall list
            if (maze[newX - 1][newY].type === "empty" && maze[newX + 1][newY].type === "wall"){
                maze[newX][newY].setType("empty")
                maze[newX][newY].type = "empty"

                newEmptyX = newX + 1
                newEmptyY = newY

                maze[newEmptyX][newEmptyY].setType("empty")
                maze[newEmptyX][newEmptyY].type = "empty"
            }
            // if lower cell is visited and upper cell is unvisited, remove the wall between them and add unvisited wall to the wall list
            else if (maze[newX - 1][newY].type === "wall" && maze[newX + 1][newY].type === "empty"){
                maze[newX][newY].setType("empty")
                maze[newX][newY].type = "empty"

                newEmptyX = newX - 1
                newEmptyY = newY 

                maze[newEmptyX][newEmptyY].setType("empty")
                maze[newEmptyX][newEmptyY].type = "empty"
            }

        }

        if (newEmptyX !== null && newEmptyY !== null){
            const wallDirections = [[-1,0], [1, 0], [0,-1], [0, 1]]

            for (let [dx, dy] of wallDirections){
                const newPushX = newEmptyX + dx
                const newPushY = newEmptyY + dy

                if (newPushX >= 1 && newPushY >= 1 && newPushX < maze.length-1 && newPushY < maze[0].length-1 && maze[newPushX][newPushY].type === "wall") {
                    walls.push([newPushX, newPushY])
                }
            }

        }
    }
    
    
}

export async function generateMazeKruskal(maze) {
    const cellId = (x, y) => x * maze[0].length + y;

    const walls = [];

    // Inseriamo tutte le posizioni interne: celle e muri
    for (let i = 1; i < maze.length - 1; i++) {
        for (let j = 1; j < maze[0].length - 1; j++) {
            walls.push([i, j]);
        }
    }

    // Union-Find per tutte le celle
    const uf = new UnionFind(maze.length * maze[0].length);

    let kruskalCounter = 0
    while (walls.length !== 0) {
        kruskalCounter++
        if (kruskalCounter % Math.floor((maze.length+maze[0].length)/10) == 0) await new Promise(res => setTimeout(res, 1))


        const random = Math.floor(Math.random() * walls.length);
        const [currX, currY] = walls[random];
        walls.splice(random, 1);

        // Se è una cella (pos dispari-dispari)
        if (currX % 2 === 1 && currY % 2 === 1) {
            maze[currX][currY].setType("empty");
            maze[currX][currY].type = "empty";
        }
        // Se è un muro orizzontale (dispari riga, pari colonna)
        else if (currX % 2 === 1 && currY % 2 === 0) {
            const leftCell = cellId(currX, currY - 1);
            const rightCell = cellId(currX, currY + 1);

            if (uf.find(leftCell) !== uf.find(rightCell)) {
                maze[currX][currY].setType("empty");
                maze[currX][currY].type = "empty";
                uf.union(leftCell, rightCell);

                // apri le celle se erano muri
                maze[currX][currY - 1].setType("empty");
                maze[currX][currY - 1].type = "empty";
                maze[currX][currY + 1].setType("empty");
                maze[currX][currY + 1].type = "empty";
            }
        }
        // Se è un muro verticale (pari riga, dispari colonna)
        else if (currX % 2 === 0 && currY % 2 === 1) {
            const upperCell = cellId(currX - 1, currY);
            const lowerCell = cellId(currX + 1, currY);

            if (uf.find(upperCell) !== uf.find(lowerCell)) {
                maze[currX][currY].setType("empty");
                maze[currX][currY].type = "empty";
                uf.union(upperCell, lowerCell);

                // apri le celle se erano muri
                maze[currX - 1][currY].setType("empty");
                maze[currX - 1][currY].type = "empty";
                maze[currX + 1][currY].setType("empty");
                maze[currX + 1][currY].type = "empty";
            }
        }
    }
}



export default generateMazeRecursiveDFS