const board = document.getElementById("board");
const statusText = document.getElementById("status");
let cells = Array(9).fill(null);
let player = "X";
let gameOver = false;

function createBoard() {
    board.innerHTML = "";
    cells = Array(9).fill(null);
    gameOver = false;
    statusText.textContent = "Sua vez!";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", playerMove);
        board.appendChild(cell);
    }
}

function playerMove(event) {
    if (gameOver) return;
    const index = event.target.dataset.index;
    if (cells[index]) return;
    cells[index] = player;
    event.target.textContent = player;
    event.target.classList.add("taken");
    if (checkWin(player)) {
        statusText.textContent = "Você venceu!";
        gameOver = true;
        return;
    }
    if (!cells.includes(null)) {
        statusText.textContent = "Empate!";
        gameOver = true;
        return;
    }
    setTimeout(aiMove, 500);
}

function aiMove() {
    if (gameOver) return;
    let availableCells = cells.map((val, i) => val === null ? i : null).filter(v => v !== null);
    if (availableCells.length > 0) {
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        cells[randomIndex] = "O";
        document.querySelector(`[data-index='${randomIndex}']`).textContent = "O";
        document.querySelector(`[data-index='${randomIndex}']`).classList.add("taken");
        if (checkWin("O")) {
            statusText.textContent = "A IA venceu!";
            gameOver = true;
            return;
        }
        if (!cells.includes(null)) {
            statusText.textContent = "Empate!";
            gameOver = true;
        }
    }
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => cells[index] === player)
    );
}

function resetGame() {
    createBoard();
}

createBoard();