import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import MazeForm from './components/MazeForm';
import Maze from './components/Maze'

function App() {
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [showMaze, setShowMaze] = useState(false)
  const [mazeMatrix, setMazeMatrix] = useState([])


  return (
    <div className="app">
    { !showMaze && <MazeForm width={width} height={height} setWidth={setWidth} setHeight={setHeight} setShowMaze={setShowMaze} setMazeMatrix={setMazeMatrix} />}
    { showMaze && <Maze width={width} height={height} mazeMatrix={mazeMatrix} />}
    { showMaze && <Maze width={width} height={height} mazeMatrix={mazeMatrix} />}
    </div>
  );
}

export default App;
