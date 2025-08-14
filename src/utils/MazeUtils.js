

async function generateMaze(maze, x, y, setMazeMatrix) {
    maze[x][y] = "empty";
    setMazeMatrix([...maze]); // aggiorna lo stato copiando la matrice

    await new Promise(res => setTimeout(res, 0.5)); // pausa per effetto visivo

    const directions = [[-2,0],[2,0],[0,-2],[0,2]];
    directions.sort(() => Math.random() - 0.5); // shuffle

    for (let [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX >= 1 && newY >= 1 && newX < maze.length-1 && newY < maze[0].length-1 && maze[newX][newY] === "wall") {
            maze[x + dx/2][y + dy/2] = "empty";
            setMazeMatrix([...maze]); // aggiorna anche il muro intermedio
            // await new Promise(res => setTimeout(res, 0.5));
            await generateMaze(maze, newX, newY, setMazeMatrix);
        }
    }
}




export default generateMaze