import React, {useState, useEffect, useCallback} from "react";
import {generateNewTile, isGameOver }from "./GameUtils";
import moveTiles from "./MoveTiles";

function Tile({value, x, y, isMerging, isNew}){
    let tileClass = `flex items-center justify-center font-bold rounded-md bg-tile-${value}
    transition-transform duration-200 ease-in-out
    ${isMerging ? 'scale-110' : ''}
    ${isNew ? 'opacity-0 animate-fade-in' : ''}`;

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

    const tileStyle = {
        transform: `translate(${x * 100}%, ${y * 100}%)`,
    };

    if (value === 0) {
        return (
            <div>
                ''
            </div>
        );
    } else {
        return (
            <div className = "tile">
                <div class = {tileClass} style = {tileStyle}>
                    {value}
                </div>
            </div>
        );
    }
}

function Board({currScore, setCurrScore, highScore, setHighScore, ref}) {
    const [grid, setGrid] = useState(generateEmptyGrid);
    const [gameOver, setGameOver] = useState(false);
    const [tiles, setTiles] = useState([]);
    const boardSize = 4;

    function generateEmptyGrid() {
        const newGrid = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
        const newTileOne = generateNewTile(newGrid, boardSize);
        const newTileTwo = generateNewTile(newGrid, boardSize);

        setGrid(newGrid);
        setTiles([newTileOne, newTileTwo]);
    };

    const handleKeyPress = useCallback((event) => {
        let direction;
        if (event.key === 'ArrowUp') {
            direction = 'UP';
        } else if (event.key === 'ArrowDown') {
            direction = 'DOWN';
        } else if (event.key === 'ArrowLeft') {
            direction = 'LEFT';
        } else if (event.key === 'ArrowRight') {
            direction = 'RIGHT';
        } else {
            return;
        }

        const { newGrid, updatedTiles } = moveTiles(grid, direction, boardSize);
        const newTile = generateNewTile(newGrid, boardSize);

        setGrid(newGrid);
        setTiles([...updatedTiles, newTile]);

        if (isGameOver(newGrid)) {
            setGameOver(true);
        }
    }, [grid, setGrid, setTiles]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    return(
        <div className = "Board">

            <div className="grid grid-cols-4 gap-4">
                {tiles.map(tile => (
                    <Tile
                        value={tile.value}
                        x={tile.x}
                        y={tile.y}
                        isMerging={tile.isMerging}
                        isNew={tile.isNew}
                    />
                ))}
            </div>
        </div>
    );
}

export default Board;