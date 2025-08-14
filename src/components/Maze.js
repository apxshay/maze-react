import Cell from  './Cell'
import './Maze.css'

function Maze({width, height, mazeMatrix}){


    return (
            <div className="maze"
                style={{
                    gridTemplateColumns: `repeat(${width}, 1fr)`,
                    gridTemplateRows: `repeat(${height}, 1fr)`,
                }}
            > {mazeMatrix.map( (row, rowIndex) => {
                return row.map( (col, colIndex) => (
                    <Cell x={rowIndex} y={colIndex} type={col} />
                ))
            })}
        </div>
    )
}


export default Maze