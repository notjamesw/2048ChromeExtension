var board;
var score = 0;
var size = 4;

window.onload = function() {
    setGame();
}

function setGame() {

    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    //generates 2 tiles to begin the game

    generateTile();
    generateTile();

}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }                
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft" || e.code == "KeyA") {
        slideLeft();
        generateTile();
    }
    else if (e.code == "ArrowRight" || e.code == "KeyD") {
        slideRight();
        generateTile();
    }
    else if (e.code == "ArrowUp" || e.code == "KeyW") {
        slideUp();
        generateTile();
    }
    else if (e.code == "ArrowDown" || e.code == "KeyS") {
        slideDown();
        generateTile();
    }
    document.getElementById("score").innerText = score;
})

function removeZero(row){
    return row.filter(num => num != 0); //create new array of all nums != 0
}

function slide(row) {
    row = removeZero(row);
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } 
    row = removeZero(row); 

    while (row.length < size) {
        row.push(0);
    } 
    return row;
}

function slideLeft() {
    for (let r = 0; r < size; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < size; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < size; r++) {
        let row = board[r];         
        row.reverse();              
        row = slide(row)            
        board[r] = row.reverse();   
        for (let c = 0; c < size; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < size; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for (let r = 0; r < size; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < size; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for (let r = 0; r < size; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function generateTile() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * size);
        let c = Math.floor(Math.random() * size);
        if (board[r][c] == 0) {
            let value = 2*Math.floor(Math.random() * 2 + 1)
            board[r][c] = value;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = value.toString();
            tile.classList.add("x"+value.toString());
            found = true;
        }
    }
}

function hasEmptyTile() {
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (board[r][c] == 0) { 
                return true;
            }
        }
    }
    return false;
}