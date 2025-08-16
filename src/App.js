import './App.css'
import React, {useState} from 'react'
import MazeForm from './components/MazeForm'
import MazeGrid from './components/Maze'

function App() {
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [showMaze, setShowMaze] = useState(false)

  const HandleSubmit = (width, height) => {
    setWidth(width)
    setHeight(height)
  }

  return (
    <div className="app">
    { !showMaze && <MazeForm width={width} height={height} setWidth={setWidth} setHeight={setHeight} setShowMaze={setShowMaze} onSubmit={HandleSubmit} />}
    { showMaze && <MazeGrid width={width} height={height} algorithm={"dfs"} />}
    { showMaze && <MazeGrid width={width} height={height} algorithm={"prim"} />}
    </div>
  )
}

export default App
