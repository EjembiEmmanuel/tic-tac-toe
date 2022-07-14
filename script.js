const GameBoard = (function() {
    let gameboard = [
        "","","",
        "","","",
        "","","",
    ]

    return {
        gameboard
    }

}())

const WinningCombos = (function() {
    const combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6],
    ]

    return {
        combos
    }
}())


const MakeMove = (function(doc, gameBoard, winning) {
    const PLAYER_X = 'x'
    const PLAYER_O = 'circle'
    const cellElements = doc.querySelectorAll('[data-cell]')
    const board = doc.getElementById('board')
    const winningMessageElement = doc.getElementById('winning-message')
    const winningMessageTextElement = doc.querySelector('[data-winning-message-text]')
    const restartButton = doc.getElementById('restart-button')
    let circleTurn

    const placeMarker = (cell, currentPlayer) => {
        cell.classList.add(currentPlayer)

        const index = cell.dataset.key
        gameBoard.gameboard[index] = currentPlayer
    }

    const swapTurns = () => {
        circleTurn = !circleTurn
    }

    const setBoardHoverClass = () => {
        doc.getElementById('board').classList.remove(PLAYER_X)
        doc.getElementById('board').classList.remove(PLAYER_O)

        if(circleTurn) {
            board.classList.add(PLAYER_O)
        } else {
            board.classList.add(PLAYER_X)
        }
    }

    const clickHandler = (e) => {
        const cell = e.target
        const currentPlayer = circleTurn ? PLAYER_O : PLAYER_X
        placeMarker(cell, currentPlayer)

        if(checkWinner(currentPlayer)) {
            endGame(false)
        } else if(isDraw()) {
            endGame(true)
        } else {
            swapTurns()
            setBoardHoverClass()
        }
    }

    const checkWinner = (currentPlayer) => {
        return winning.combos.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentPlayer)
            })
        })
    }

    const endGame = (draw) => {
        if(draw) {
            winningMessageTextElement.innerText = "Draw!"
        } else {
            winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`
        }

        winningMessageElement.classList.add('show')
    }

    const isDraw = () => {
        return [...cellElements].every(cell => {
            return cell.classList.contains(PLAYER_X) || cell.classList.contains(PLAYER_O)
        })
    }

    const startGame = () => {
        circleTurn = false

        cellElements.forEach(cell => {
            cell.classList.remove(PLAYER_X)
            cell.classList.remove(PLAYER_O)
            cell.removeEventListener('click', clickHandler)
            cell.addEventListener('click', clickHandler, { once: true })
        })

        setBoardHoverClass()
        winningMessageElement.classList.remove('show')

    }

    startGame()

    restartButton.addEventListener('click', startGame)
}(document, GameBoard, WinningCombos))