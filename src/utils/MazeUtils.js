

async function generateMaze(maze, x, y) {
    maze[x][y].setType("empty")
    maze[x][y].type = "empty"

    await new Promise(res => setTimeout(res, 1)); // pausa per effetto visivo

    const directions = [[-2,0],[2,0],[0,-2],[0,2]];
    directions.sort(() => Math.random() - 0.5); // shuffle

    for (let [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX >= 1 && newY >= 1 && newX < maze.length-1 && newY < maze[0].length-1 && maze[newX][newY].type === "wall") {
            maze[x + dx/2][y + dy/2].setType("empty")
            maze[x + dx/2][y + dy/2].type = "empty"
            // await new Promise(res => setTimeout(res, 1));
            await generateMaze(maze, newX, newY);
        }
    }
}




export default generateMaze