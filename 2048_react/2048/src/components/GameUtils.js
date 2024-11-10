export function generateNewTile(grid, boardSize) {
    const emptyTiles = [];

    for(let row = 0; row < boardSize; row++) {
        for(let column = 0; column < boardSize; column++) {
            if(grid[row][column] == null) {
                emptyTiles.push([row, column]);
            }
        }
    }

    if (emptyTiles.length > 0) {
        const randomEmptyTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        const randomTileVal = Math.random() < 0.5 ? 2 : 4;
        return {
            value: randomTileVal,
            x: randomEmptyTile.row,
            y: randomEmptyTile.column,
            isNew: true,
        }
    }
};

export function isGameOver(grid) {
    
}