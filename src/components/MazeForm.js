function MazeForm({width, height, setWidth, setHeight, setShowMaze, onSubmit}){
    const handleSubmit = (e) => {
        e.preventDefault()
        setShowMaze(true)
        const h = Number(height)
        const w = Number(width)

        onSubmit(w, h)

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