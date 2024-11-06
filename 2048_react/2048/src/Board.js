import React, {useState, useEffect} from "react";

function Tile({value}){
    let tileClass = `flex items-center justify-center font-bold rounded-md bg-tile-${value}`;

    if (value === 2 || value === 4) {
        tileClass += 'text-gray';
    } else {
        tileClass += 'text-white';
    }
    if (value <= 512) {
        tileClass += 'text-2xl';
    } else {
        tileClass += 'text-xl';
    }

    if (value === 0) {
        return (
            <div>
                ''
            </div>
        );
    } else {
        return (
            <div className = "tile">
                <div class = {tileClass}>
                    {value}
                </div>
            </div>
        );
    }
}

function Board({currScore, setCurrScore, highScore, setHighScore}) {
    const [grid, setGrid] = useState(Array(4).fill().map(() => Array(4).fill(null)));
    const [gameOver, setGameOver] = useState(false);
    const [moving, setMoving] = useState(false);
    const [merged, setMerged] = useState(false);

    return(
        <div className = "Board">
            <div className="grid grid-cols-4 gap-4">
                {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((value, colIndex) => (
                        <Tile 
                            key = {`${rowIndex}-${colIndex}`}
                            value={value}
                            x={colIndex} 
                            y={rowIndex}
                            moving={moving}
                            merged={merged}
                        />
                    ))}
                </div>
                ))}
            </div>
        </div>
    );
}

export default Board;