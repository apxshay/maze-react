import { useState } from "react"

function MazeForm({width, height, setWidth, setHeight, setShowMaze, onSubmit}){

    const [algorithm, setAlgorithm] = useState("kruskal")

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowMaze(true)
        const h = Number(height)
        const w = Number(width)

        onSubmit(w, h, algorithm)

    }

    return (
    <form id="maze-generation-form" onSubmit={handleSubmit}>

        <label>Width</label>
        <input type='number' className="maze-width" value={width} onChange={(e) => setWidth(Number(e.target.value))}></input>

        <label>Height</label>
        <input type="number" className="maze-height" value={height} onChange={(e) => setHeight(Number(e.target.value))}></input>

        <label>Maze generation algorithm</label>
        <select onChange={(e) => setAlgorithm(e.target.value)}>
            <option>kruskal</option>
            <option>dfs iterative</option>
            <option>dfs recursive</option>
            <option>prim</option>
        </select>

        <button id="maze-generation-submit">Generate Maze ({width || 0} x {height || 0})</button>
    </form>)
}

export default MazeForm