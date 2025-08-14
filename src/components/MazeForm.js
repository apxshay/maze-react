import generateMaze from '../utils/MazeUtils'

function MazeForm({width, height, setWidth, setHeight, setShowMaze, mazeMatrix, setMazeMatrix}){
    const handleSubmit = (e) => {
        e.preventDefault()
        setShowMaze(true)
        const h = Number(height)
        const w = Number(width)

        // creating initial maze state based on the form submitted
        const initialMatrix =  Array(h).fill(null).map( () => Array(w).fill("wall"))
        setMazeMatrix(initialMatrix)

        
        // TODO : generateMaze
        generateMaze(initialMatrix, 1, 1, setMazeMatrix)


    }

    return (
    <form id="maze-generation-form" onSubmit={handleSubmit}>

        <label>Width</label>
        <input type='number' className="maze-width" value={width} onChange={(e) => setWidth(Number(e.target.value))}></input>

        <label>Height</label>
        <input type="number" className="maze-height" value={height} onChange={(e) => setHeight(Number(e.target.value))}></input>
        <button id="maze-generation-submit">Generate Maze ({width || 0} x {height || 0})</button>
    </form>)
}

export default MazeForm