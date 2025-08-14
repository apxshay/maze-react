import './Cell.css'


function Cell({x, y, type}){
    return (
        <div className={`cell ${type}`} data-x={x} data-y={y} ></div>
    )
}

export default Cell