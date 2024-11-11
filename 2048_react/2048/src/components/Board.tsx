import React, {useState, useEffect, useCallback} from "react";
import {generateNewTile, isGameOver }from "./GameUtils";
import moveTiles from "./MoveTiles";
import { Tile, TileObject } from "./Tile";

function Board({currScore, setCurrScore, highScore, setHighScore}) {
    const [grid, setGrid] = useState(generateEmptyGrid);
    const [gameOver, setGameOver] = useState(false);
    const boardSize = 4;

    function generateEmptyGrid(): TileObject[][] {
        console.log("generate");
        let newGrid: TileObject[][] = [];

        for (let r = 0; r < boardSize; r++) {
            const row: TileObject[] = []; 
            for (let c = 0; c < boardSize; c++) {
                row.push({
                    value: 0,
                    x: c,
                    y: r,
                    isMerging: false,
                    isNew: false
                }); 
            }
            newGrid.push(row);
        }

        newGrid = generateNewTile(newGrid, boardSize);
        newGrid = generateNewTile(newGrid, boardSize);
        setGrid(newGrid);
        return newGrid;
    }

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

        let newGrid = moveTiles(grid, direction, boardSize);
        newGrid = generateNewTile(newGrid, boardSize);
        //const newTile = generateNewTile(newGrid, boardSize);

        setGrid(newGrid);
        //setTiles([...updatedTiles, newTile]);

        if (isGameOver(newGrid)) {
            setGameOver(true);
        }
    }, [grid, setGrid]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    return(
        <div className = "Board">
            <div className = "flex justify-center">
              <button 
                className = "text-xl font-bold text-white rounded-lg border-tan-200 bg-tan-100 px-2 py-1"
                onClick={generateEmptyGrid}>
                New Game
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {grid.map((row) => (
                    row.map((tile) => (
                    <Tile TileObj = {tile}/>
                    ))
                ))}
            </div>    
        </div>
    );
}

export default Board;