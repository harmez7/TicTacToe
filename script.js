const board = document.getElementById("board")
const cells = document.querySelectorAll("[data-cell]")
const resultContainer = document.getElementById("resultContainer")
const resultText = document.getElementById("resultText")
const restartButton = document.getElementById("restartButton")
let X_TURN = true
const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame()
restartButton.addEventListener('click', startGame)

function startGame() {
    resultContainer.classList.remove('show')
    setBoard()
    cells.forEach(cell => {
        cell.classList.remove('o')
        cell.classList.remove('x')
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once:true })
    })
}

//SET BOARD HOVER EFFECT
function setBoard() {
    board.classList.remove('x')
    board.classList.remove('o')
    if(X_TURN) board.classList.add("x");
    else board.classList.add("o");
}

//HANDLE CLICK ON EVERY CELLS
function handleClick(e) {
    //IF CELL HAS NOT X AND O CLASS
    if(!e.target.classList.contains("o") && !e.target.classList.contains("x")) {
        if(X_TURN) e.target.classList.add("x")
        else e.target.classList.add("o");
    }
    check()
    X_TURN = !X_TURN
    setBoard()
}

//CHECK FOR WIN OR DRAW
function check() {
    currentClass = X_TURN ? 'x' : 'o';
    let win =  WIN_CONDITIONS.some(condition => {
        return condition.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
    let draw = [...cells].every(cell => {
        return cell.classList.contains('x') ||
        cell.classList.contains('o')
    })
    if(win){
        resultText.innerText = `${X_TURN ? "X's" : "O's"} Wins!`
        resultContainer.classList.add('show')
    }
    else if(draw) {
        resultText.innerText = 'Draw!'
        resultContainer.classList.add('show')
    }
}