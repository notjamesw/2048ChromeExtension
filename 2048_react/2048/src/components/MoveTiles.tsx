import { TileObject } from "./Tile";

function moveTiles(grid: TileObject[][], direction: string, boardSize: number){
    const newGrid = grid.map((t) => [...t]);
    const updatedTiles = [];

    if (direction === "LEFT") {
        slideTilesLeft(newGrid, updatedTiles);
    } else if (direction === "RIGHT") {
        slideTilesRight(newGrid, updatedTiles);
    } else if (direction === "UP") {
        slideTilesUp(newGrid, updatedTiles);
    } else if (direction === "DOWN") {
        slideTilesDown(newGrid, updatedTiles);
    } else {
        console.log("invalid direction");
    }

    function slideAndMerge(line) {
        const filtered = line.filter(v => v !== 0);
        const result = [];
        const merges = [];

        for (let i = 0; i < filtered.length; i++) {
            if (filtered[i] === filtered[i + 1]) {
                result.push(filtered[i] * 2);
                merges.push({ value: filtered[i] * 2, index: result.length - 1 });
                i++;
            } else {
                result.push(filtered[i]);
            }
        }

        while (result.length < boardSize) {
            result.push(0);
        }

        return { result, merges };
    }

    function slideTilesLeft(newGrid, updatedTiles) {
        for (let row = 0; row < boardSize; row++) {
            const { result, merges } = slideAndMerge(newGrid[row]);
            newGrid[row] = result;
            merges.forEach(merge => {
                updatedTiles.push({
                    value: merge.value,
                    x: merge.index,
                    y: row,
                    isMerging: true,
                });
            });
        }
    }

    function slideTilesRight(newGrid, updatedTiles) {
        for (let row = 0; row < boardSize; row++) {
            const { result, merges } = slideAndMerge(newGrid[row].slice().reverse());
            newGrid[row] = result.reverse();
            merges.forEach(merge => {
                updatedTiles.push({
                    value: merge.value,
                    x: merge.index,
                    y: row,
                    isMerging: true,
                });
            });
        }
    }

    function slideTilesUp(newGrid, updatedTiles) {
        for (let column = 0; column < boardSize; column++) {
            const rowArray = []
            for (let row = 0; row < boardSize; row++) {
                rowArray.push(newGrid[row][column]);
            }
            const {result, merges} = slideAndMerge(rowArray);
            for (let row = 0; row < boardSize; row++) {
                newGrid[row][column] = result[row];
            }
            merges.forEach(merge => {
                updatedTiles.push({
                    value: merge.value,
                    x: column,
                    y: merge.index,
                    isMerging: true,
                });
            });
        }
    }

    function slideTilesDown(newGrid, updatedTiles) {
        for (let column = 0; column < boardSize; column++) {
            const rowArray = []
            for (let row = 0; row < boardSize; row++) {
                rowArray.push(newGrid[row][column]);
            }
            const {result, merges} = slideAndMerge(rowArray.reverse());
            for (let row = 0; row < boardSize; row++) {
                newGrid[row][column] = result[boardSize-(row+1)];
            }
            merges.forEach(merge => {
                updatedTiles.push({
                    value: merge.value,
                    x: column,
                    y: merge.index,
                    isMerging: true,
                });
            });
        }
    }

    return { newGrid, updatedTiles };
}

export default moveTiles;