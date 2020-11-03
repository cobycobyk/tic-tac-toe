/*----- constants -----*/
const COLORS = {
    null: 'grey',
    '1': '#C1DBE3',
    '-1': '#FCE694',
};
const SYMBOL = {
    null: '',
    '1': 'X',
    '-1': 'O',
};
const NAME = {
    null: '',
    '1': 'blue',
    '-1': 'yellow',
};
const WINNING_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
/*----- app's state (variables) -----*/
let boardArray;
let whoseTurn;
let winner;
/*----- cached element references -----*/
const squares = document.querySelectorAll('.square');
const msgEl = document.getElementById('msg');
const replayBtn = document.getElementById('replay');
/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleSquareClick);
document.getElementById('replay').addEventListener('click', init);
/*----- functions -----*/
init();
function render() {
    squares.forEach(function(square, idx) {
        square.style.backgroundColor = COLORS[boardArray[idx]];
        square.innerHTML = SYMBOL[boardArray[idx]];
    });
    replayBtn.style.visibility = winner ? 'visible' : 'hidden';
    message();
};
function message() {
    if (winner === null) {
        msgEl.textContent = `It is ${NAME[whoseTurn].toUpperCase()}'s turn`;
    } else if (winner === 'T') {
        msgEl.textContent = `It's a TIE!`;
    } else {
        msgEl.textContent = `Congratulations ${NAME[winner].toUpperCase()}! YOU WON!`;
    }

};
function init() {
    boardArray = [null, null, null, null, null, null, null, null, null];
    whoseTurn = 1;
    winner = null;
    render();
};
function handleSquareClick(evt) {
    let idx = evt.target.getAttribute('id')
    if (boardArray[idx]) return;
    if (winner) return;
    boardArray[idx] = whoseTurn;
    whoseTurn *= -1;
    winner = computeWinner();
    render();
};
function computeWinner() {
    for (let combo of WINNING_COMBINATIONS) {
        let count = 0;
        combo.forEach(function(num) {
            count += boardArray[num];
        })
        count = Math.abs(count);
        if (count === 3) return boardArray[combo[0]];
    }
    return (boardArray.includes(null) ? null : 'T');
}