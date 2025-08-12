import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import MazeForm from './components/MazeForm';

function App() {
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")

  return (
    <div className="app">
     <MazeForm width={width} height={height} setWidth={setWidth} setHeight={setHeight} />
    </div>
  );
}

export default App;
