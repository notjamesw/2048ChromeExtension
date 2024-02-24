var board; // 2D array for the board
var score = 0; // keeps track of current game score
var highScore = 0; // keeps track of highest game score
var size = 4; // size of the board (row/column)
var restart;

window.onload = function() {
    setGame();
    setupButtons();

    chrome.storage.sync.get(["highScore"]).then((result) => {
        console.log("High score is" + result.highScore);
        if(result.highScore != null) {
            highScore = result.highScore;
            document.getElementById("highscore").innerText = highScore;
        }
    });
}

/*
MODIFIES: board
EFFECTS: starts the game, creates tile elements inside board div, and generates 2 tiles to start
*/
function setGame() {
    closeEndScreen();
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

/*
MODIFIES: board, score
EFFECTS: restarts the game by resetting board state and current game score
 */
function resetBoard() {
    closeEndScreen();
    score = 0;
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    clearBoard();
    generateTile();
    generateTile();
    document.getElementById("score").innerText = score;
}

/*
MODIFIES: board, score
EFFECTS: helper for reset, clears the board state, updating every tile element
 */
function clearBoard() {
    for(let r = 0; r < size; r++) {
        for(let c = 0; c < size; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

/*
REQUIRES: num >= 0 
MODIFIES: tile
EFFECTS: updates a single tile element, setting the class element to its num
*/
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

/*
MODIFIES: board, score, highscore
EFFECTS: keyboard event listener for keypresses, slides tiles and updates scores
*/
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
    if(highScore < score) {
        highScore = score;
        
        chrome.storage.sync.set({"highScore": highScore}).then(() => {
            console.log("Highscore is stored");
        });
    }
    document.getElementById("score").innerText = score;
    document.getElementById("highscore").innerText = highScore;
});

/* 
EFFECTS: removes all zeros from a list (row), helper for slide
 */
function removeZero(row){
    return row.filter(num => num != 0); //create new array of all nums != 0
}

/*
REQUIRES: row is a list of numbers
MODIFIES: row
EFFECTS: merges elements from left to right in a list (row).
helper for slideLeft, slideRight, slideUp, and slideDown.
*/
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

/*
MODIFIES: board
EFFECTS: perform a slide left on the board, merging elements together if they have the same number 
*/
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

/*
MODIFIES: board
EFFECTS: perform a slide right on the board, merging elements together if they have the same number 
*/
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

/*
MODIFIES: board
EFFECTS: perform a slide up on the board, merging elements together if they have the same number 
*/
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

/*
MODIFIES: board
EFFECTS: perform a slide down on the board, merging elements together if they have the same number 
*/
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

/*
MODIFIES: board
EFFECTS: check if the board is full, 
If it is:
    - check if there are no moves that can be made:
        - if true, then end the game and show end screen
If not:
    - generate a new tile
*/
function generateTile() {
    if (!hasEmptyTile()) {
        if(isGameOver()) {
            displayEndScreen();
            return;
        } else {
            return;
        }
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

/*
EFFECTS: helper function for generateTile, checks if there are any empty tiles in the board.
Returns true if there are any empty tiles, false otherwise.
*/
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

/*
EFFECTS: helper function for generateTile, checks if there are any possible moves remaining.
Returns true if there are no possible moves, false otherwise.
*/
function isGameOver() {
    for (let r = 0; r < size; r++) {
        let row = board[r];
        if(!fullRow(row)) {
            return false;
        }
    }
    for (let c = 0; c < size; c++) {
        let column = [board[0][c], board[1][c], board[2][c], board[3][c]];
        if(!fullRow(column)) {
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
function fullRow(row) {
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            return false;
        }
    }
    return true;
}

/*
EFFECTS: displays a game over screen ontop of the board
*/ 
function displayEndScreen() {
    let popup = document.getElementById('popup');
    let overlay = document.getElementById('overlay');
    popup.classList.add('active');
    overlay.classList.add('active');
}

function closeEndScreen() {
    let popup = document.getElementById('popup');
    let overlay = document.getElementById('overlay');
    popup.classList.remove('active');
    overlay.classList.remove('active');
}

function setupButtons() {
    var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', resetBoard, false);
    }
}
