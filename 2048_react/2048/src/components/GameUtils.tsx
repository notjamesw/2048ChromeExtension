import { TileObject } from "./Tile";

export function generateNewTile(grid: TileObject[][], boardSize: number) {
    const emptyTiles: [number, number][] = [];

    for(let row = 0; row < boardSize; row++) {
        for(let column = 0; column < boardSize; column++) {
            if(grid[row][column].value === 0) {
                emptyTiles.push([row, column]);
            }
        }
    }

    if (emptyTiles.length > 0) {
        const randomEmptyTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        const randomTileVal = Math.random() < 0.5 ? 2 : 4;
        const newGrid: TileObject[][] = grid.map((t) => [...t]);
        newGrid[randomEmptyTile[0]][randomEmptyTile[1]] = {
            value: randomTileVal,
            x: randomEmptyTile[1],
            y: randomEmptyTile[0],
            isMerging: false,
            isNew: true
        }
        return newGrid;
    }
    return grid;
};

export function isGameOver(grid: TileObject[][], boardSize: number): boolean {
    for (let r = 0; r < boardSize; r++) {
        let row: TileObject[] = grid[r];
        if(!fullRow(row, boardSize)) {
            return false;
        }
    }
    for (let c = 0; c < boardSize; c++) {
        const column: TileObject[] = [];
        for (let r = 0; r < boardSize; r++) {
            column.push(grid[r][c]);
        }
        if(!fullRow(column, boardSize)) {
            return false;
        }
    }
    return true;
}

/*
EFFECTS: helper function for isGameOver, checks if the given list (row) is full and there are no 
adjacent tiles with the same number.
Returns true if there are no adjacent tiles with the same number, false otherwise.
*/
function fullRow(row: TileObject[], boardSize: number) {
    for (let i = 0; i < boardSize-1; i++){
        if (row[i].value === row[i+1].value) {
            return false;
        }
    }
    return true;
}