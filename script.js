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


const MakeMove = (function(doc, gameBoard) {
    const PLAYER_X = 'x'
    const PLAYER_O = 'circle'
    const cellElements = doc.querySelectorAll('[data-cell]')
    const board = doc.getElementById('board')
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

        console.log(gameBoard.gameboard)

        swapTurns()
        setBoardHoverClass()
    }

    const startGame = () => {
        circleTurn = false

        cellElements.forEach(cell => {
            cell.addEventListener('click', clickHandler, { once: true })
        })

        setBoardHoverClass()
    }

    startGame()
}(document, GameBoard))