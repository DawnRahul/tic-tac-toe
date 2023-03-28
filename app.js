const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

let player_1_Score = 0;
let player_2_Score = 0;
let draw = false;
let attempts = 0;

const cells = ["", "", "", "", "", "", "", "", ""];

infoDisplay.textContent = "Circle go first!";
let go = "circle";

const box = document.createElement('div');
box.classList.add('square');

cells.forEach((_cell, index) => {
    const box = document.createElement('div');
    box.classList.add('square');
    box.id = index;

    gameBoard.append(box);

    box.addEventListener('click', addGo);
});

//Function to add circle or cross into the box by player
function addGo(event){
    // console.log(event.target);
    const displayGo = document.createElement('div');
    displayGo.classList.add(go);

    event.target.append(displayGo);
    event.target.removeEventListener('click', addGo);

    go = go === "circle" ? "cross" : "circle";
    infoDisplay.textContent = "It's now " + go +"'s turn!";

    checkWin();

    let player_1 = document.querySelector('#pl-1-score');
    let player_2 = document.querySelector('#pl-2-score');

    player_1.innerHTML = player_1_Score;
    player_2.innerHTML = player_2_Score;
}


//Funcion to check Win chance for players after each go(turn or mark)
function checkWin(){
    const winingCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const allSquares = document.querySelectorAll(".square");


//Check win chance for player with "Circle"
    winingCombos.forEach((comboArr) => {
        const wins = comboArr.every((cellNumber) => {
            return allSquares[cellNumber].firstElementChild?.classList.contains('circle');
        });

        // console.log("circle: " + wins);

        if(wins) {
            infoDisplay.textContent = "Circle Wins!"
            allSquares.forEach((square)=>{
                square.removeEventListener("click", addGo);
            });

            attempts = 0; //reseting attempts value to 0;
            player_1_Score++;
        }


    });

//Check win chance for player with "Cross"
winingCombos.forEach((comboArr) => {
    const wins = comboArr.every((cellNumber) => {
        return allSquares[cellNumber].firstElementChild?.classList.contains('cross');
    });

    // console.log("crosss: " + wins);

    if(wins) {
        infoDisplay.textContent = "Cross Wins!"
        allSquares.forEach((square)=>{
            square.removeEventListener("click", addGo);
        });
        attempts = 0; //reseting attempts value to 0;
        player_2_Score++;
    }

});

//tracking number of attemts
attempts++;
//if 9 attemts done tand still no one won, then its a draw
if(attempts == 9){
    draw = true;
    infoDisplay.textContent = "DRAW!!";
}


}//checkWin()



//***************************REPLAY************************

/*
task to do:
provide a button to replay - 
remove all the classes from all boxes
start from giving player chance to mark again - adding Go class

*/

const replay = document.querySelector(".btn-replay");

replay.addEventListener("click", replayGame);

function replayGame(){
    const allSquares = document.querySelectorAll(".square");

    for(let i = 0; i<9 ; i++){

        const square = gameBoard.querySelectorAll(".square")[i];

        //checking if square is already marked, before removing marks(circle or cross)
        while (square.hasChildNodes()) {
            square.removeChild(square.firstChild);
          }
    }

        //adding back the event listener to the square
        allSquares.forEach((square)=>{
            square.addEventListener("click", addGo);
        });

    go = "circle";
    infoDisplay.textContent = "Circle go first!" ; 
    attempts = 0; //reseting attempts value to 0;

}



