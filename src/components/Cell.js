import { useEffect, useState } from 'react'
import './Cell.css'


function Cell({ x, y, registerCell }) {
    const [type, setType] = useState("wall");

    useEffect(() => {
        // la cella si registra al componente padre
        registerCell(x, y, type, setType);
    }, []);

    return <div className={`cell ${type}`}></div>;
}

export default Cell