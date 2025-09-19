const reset = document.querySelector('.btn');
const nextRound = document.querySelector('.btn.ghost');
const cells = document.querySelectorAll('.cell');
const turn = document.querySelector('.turn');
const message = document.querySelector('[data-message]');
const scoreXElement = document.querySelector('[data-score-x]');
const scoreOElement = document.querySelector('[data-score-o]');
const scoreTiesElement = document.querySelector('[data-score-ties]');

let currentTurn = 'X';
let gameActive = true;
let scoreX = 0;
let scoreO = 0;
let scoreTies = 0;


// RESET FUNCTION
reset.addEventListener('click', function(){
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('x', 'o', 'sparkle');
    })
    currentTurn = 'X';
    gameActive = true;
    turn.innerHTML = '<div>Turn: <strong data-current-turn>X</strong></div>'
    message.innerText = 'Make your move';
    scoreXElement.innerHTML = 0;
    scoreOElement.innerHTML = 0;
    scoreTiesElement.innerHTML = 0;
    scoreX = 0;
    scoreO = 0;
    scoreTies = 0;
})


// NEXT ROUND FUNCTION
nextRound.addEventListener('click', function(){
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('x', 'o', 'sparkle');
    })
    currentTurn = 'X';
    gameActive = true;
    turn.innerHTML = '<div>Turn: <strong data-current-turn>X</strong></div>'
    message.innerText = 'Make your move';
})



// CELL AND TURN FUNCTION
cells.forEach(cell => {
    cell.addEventListener('click', function(e){
        if(cell.innerHTML !== '' || !gameActive) 
            return; // Prevent clicking on an already filled cell.

        cell.innerHTML = currentTurn;
        cell.classList.add(currentTurn.toLowerCase());

        checkWin();

        if(gameActive)
        {
            currentTurn = currentTurn === 'X' ? 'O' : 'X';
            turn.innerHTML = `<div>Turn: <strong data-current-turn>${currentTurn}</strong></div>`;
        }
    })
})

let winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7] ,[2, 5, 8], [0, 4, 8], [2, 4, 6]];


// WIN/LOSE FUNCTION
function checkWin() 
{
    let roundWon = false;
    let winningIndex = -1;  

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const cellA = cells[condition[0]].innerHTML;
        const cellB = cells[condition[1]].innerHTML;
        const cellC = cells[condition[2]].innerHTML;

        if (cellA === '' || cellB === '' || cellC === '') {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            winningIndex = i;
            break;
        }
    }

     if (roundWon) {
        gameActive = false;
        message.innerText = `Player ${currentTurn} has won!`;
         if (currentTurn === 'X') {
            scoreX++;
            scoreXElement.innerText = scoreX;
        } else {
            scoreO++;
            scoreOElement.innerText = scoreO;
        }
        const winningCells = winningConditions[winningIndex];
        winningCells.forEach(index => {
            cells[index].classList.add('sparkle');
        });
        return;
    }

    const roundDraw = ![...cells].some(cell => cell.innerHTML === "");
    if (roundDraw) {
        gameActive = false;
        message.innerText = 'Game ended in a tie!';
        scoreTies++;
        scoreTiesElement.innerText = scoreTies;
    }
}
