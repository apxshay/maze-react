function MazeForm({width, height, setWidth, setHeight}){

    return (
    <form id="maze-generation-form">

        <label>Width</label>
        <input type='number' className="maze-width" value={width} onChange={(e) => setWidth(e.target.value)}></input>

        <label>Height</label>
        <input type="number" className="maze-height" value={height} onChange={(e) => setHeight(e.target.value)}></input>
        <button id="maze-generation-submit">Generate Maze ({width || 0} x {height || 0})</button>
    </form>)
}

export default MazeForm