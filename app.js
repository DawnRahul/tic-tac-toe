const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

let go = "circle";
infoDisplay.textContent = "Circle goes first!"

const startCells = ["", "", "", "", "", "", "", "", ""];

//Creating Board

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add("square");
        cellElement.id = index;
        //append squares inside game board
        gameBoard.append(cellElement);

        //on click
        cellElement.addEventListener('click', addGo);
    });
}

//call the create board function for boxes to come on board
createBoard();

function addGo(e) {
    // console.log(e.target);
    const displayGo = document.createElement('div');
    displayGo.classList.add(go);

    e.target.append(displayGo);

    //player change
    go = go === "circle" ? "cross" : "circle";

    infoDisplay.textContent = `Now it's ${go}'s go!`;
    //removing event listerner from marked box
    e.target.removeEventListener("click", addGo);

    //cehcking score
    checkScore();
}

function checkScore() {
    const winingCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    const allSquares = document.querySelectorAll(".square");
    // console.log(allSquares);

    //Everytime check all wining combos 
    winingCombos.forEach((comboArray) => {
        const circleWins = comboArray.every((cellNumber) => {
            return allSquares[cellNumber].firstChild?.classList.contains('circle');
        });

        console.log(circleWins);
        //comboArray.every() returns boolean true or false
        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!";
            allSquares.forEach((square) => { square.replaceWith(square.cloneNode(true)) });
            return;
        }


    });


    //for Cross Win's check
    winingCombos.forEach((comboArray) => {
        const crossWins = comboArray.every((cellNumber) => {
            return allSquares[cellNumber].firstChild?.classList.contains("cross");
        });

        console.log(crossWins);
        //comboArray.every() returns boolean true or false
        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!";
            allSquares.forEach((square) => { square.replaceWith(square.cloneNode(true)) });
            return;
        }


    });
}