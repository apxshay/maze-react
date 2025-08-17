import { useEffect, useState } from 'react'
import Cell from  './Cell'
import './Maze.css'
import generateMazeRecursiveDFS, { generateMazeIterativeDFS, generateMazeKruskal, generateMazePrim } from '../utils/MazeUtils'

function MazeGrid({width, height, algorithm}){
  // state to store cells states and setState functions 
  const [cellRefs, setCellRefs] = useState([])

  // function to allow cells to register themselves into cellRefs
  const registerCell = (x, y, type, setType) => {
    setCellRefs(prev => {
      const newRefs = [...prev]
      if (!newRefs[x]) newRefs[x] = []
      newRefs[x][y] = {type, setType}
      return newRefs
    })
  }

  // when cellRefs is updated check if it is ready, by checking if is long height, and every element is long width
  useEffect(() => {
    if (cellRefs.length === height && cellRefs.every(row => row.length === width)) {
      switch(algorithm){
        case "dfs recursive":
          generateMazeRecursiveDFS(cellRefs, 1, 1)
          break
        case "prim":
          generateMazePrim(cellRefs,1,1) 
          break
        case  "dfs iterative":
          generateMazeIterativeDFS(cellRefs, 1, 1)
          break
        case "kruskal":
          generateMazeKruskal(cellRefs)
          break
      }
    }
  }, [cellRefs])

  return (
    <div className="maze"
      style={{
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridTemplateRows: `repeat(${height}, 1fr)`,
      }}> 
      {Array.from({ length: height }).map((_, x) =>
        Array.from({ length: width }).map((_, y) => (
        <Cell key={`${x}-${y}`} x={x} y={y} registerCell={registerCell} />
      ))
      )}
    </div>
  )
}

export default MazeGrid