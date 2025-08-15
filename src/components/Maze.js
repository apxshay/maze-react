import { useEffect, useState } from 'react'
import Cell from  './Cell'
import './Maze.css'
import generateMaze from '../utils/MazeUtils'

function MazeGrid({width, height}){
    const [cellRefs, setCellRefs] = useState([])

    const registerCell = (x, y, type, setType) => {
        setCellRefs(prev => {
            const newRefs = [...prev];
            if (!newRefs[x]) newRefs[x] = [];
            newRefs[x][y] = {type, setType};
            return newRefs;
        });
    };

  // Quando la griglia è pronta, genera il labirinto
  useEffect(() => {
    if (cellRefs.length === height && cellRefs.every(row => row.length === width)) {
        generateMaze(cellRefs,1,1) // qui ogni cella ha il suo setter
    }
  }, [cellRefs])

    return (
            <div className="maze"
                style={{
                    gridTemplateColumns: `repeat(${width}, 1fr)`,
                    gridTemplateRows: `repeat(${height}, 1fr)`,
                }}
            > {Array.from({ length: height }).map((_, x) =>
        Array.from({ length: width }).map((_, y) => (
          <Cell key={`${x}-${y}`} x={x} y={y} registerCell={registerCell} />
        ))
      )}
        </div>
    )
}

export default MazeGrid