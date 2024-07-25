const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const playerIndicator = document.getElementById('player-indicator');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameOver = false;
let score = { X: 0, O: 0 };

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const updatePlayerIndicator = () => {
    playerIndicator.textContent = `Player ${currentPlayer}'s Turn`;
};

const updateScore = () => {
    document.getElementById('score').textContent = `X: ${score.X} | O: ${score.O}`;
};

const checkWinner = (board) => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], pattern };
        }
    }
    return null;
};

const highlightWinningCells = (pattern) => {
    pattern.forEach(index => {
        cells[index].classList.add('highlight');
    });
};

const handleClick = (e) => {
    if (gameOver) return;
    const index = e.target.dataset.index;

    if (!board[index] && !checkWinner(board)) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        const winnerData = checkWinner(board);
        if (winnerData) {
            alert(`${winnerData.winner} wins!`);
            score[winnerData.winner]++;
            highlightWinningCells(winnerData.pattern);
            gameOver = true;
            updateScore();
        } else if (board.every(cell => cell)) {
            alert('Draw!');
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updatePlayerIndicator();
        }
    }
};

const resetGame = () => {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('highlight');
    });
    currentPlayer = 'X';
    gameOver = false;
    updatePlayerIndicator();
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

updatePlayerIndicator();
updateScore();
