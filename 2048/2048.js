var board;
var score = 0;
var size = 4;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num  > 0) {
        tile.innerText = num;
        /*TODO:*/
    }
}