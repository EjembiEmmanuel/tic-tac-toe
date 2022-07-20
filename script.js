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


const Game = (function(doc, gameBoard) {
    const PLAYER_X = 'x'
    const PLAYER_O = 'circle'
    const cellElements = doc.querySelectorAll('[data-cell]')
    const board = doc.getElementById('board')
    const winningMessageElement = doc.getElementById('winning-message')
    const winningMessageTextElement = doc.querySelector('[data-winning-message-text]')
    const restartButton = doc.getElementById('restart-button')
    let xTurn

    const checkForThree = (a, b, c) => {
        return a == b && b == c && a != ''
    }

    const checkWinner = () => {
        let winner = null

        let board = gameBoard.gameboard

        if(checkForThree(board[0], board[1], board[2])) {
            winner = board[0]
        }

        if(checkForThree(board[3], board[4], board[5])) {
            winner = board[3]
        }

        if(checkForThree(board[6], board[7], board[8])) {
            winner = board[6]
        }

        if(checkForThree(board[0], board[3], board[6])) {
            winner = board[0]
        }

        if(checkForThree(board[1], board[4], board[7])) {
            winner = board[1]
        }

        if(checkForThree(board[2], board[5], board[8])) {
            winner = board[2]
        }

        if(checkForThree(board[0], board[4], board[8])) {
            winner = board[0]
        }

        if(checkForThree(board[2], board[4], board[6])) {
            winner = board[2]
        }

        let openSpots = 0;

        for (let i = 0; i < board.length; i++) {
            if (board[i] == '') {
                openSpots++;
            }
        }

        if (winner == null && openSpots == 0) {
            return 'tie';
        } else {
            return winner;
        }
    }

    const bestMove = () => {
        let bestScore = -Infinity
        let move

        let board = gameBoard.gameboard

        for(let i = 0; i < board.length; i++) {
            if(board[i] == "") {
                board[i] = PLAYER_X
                let score = minimax(board, 0, false)
                board[i] = ""
                if(score > bestScore) {
                    bestScore = score
                    move = {i}
                }
            }
        }

        board[move.i] = PLAYER_X
        cellElements[move.i].classList.add(PLAYER_X)
        swapTurns()
    }

    let scores = {
        x: 1,
        circle: -1,
        tie: 0
    }

    const minimax = (board, depth, isMaximizing) => {
        let result = checkWinner()

        if(result !== null) {
            return scores[result]
        }

        if(isMaximizing) {
            let bestScore = -Infinity

            for(let i = 0; i < board.length; i++) {
                if(board[i] == "") {
                    board[i] = PLAYER_X
                    let score = minimax(board, depth - 1, false)
                    board[i] = ""
                    bestScore = Math.max(score, bestScore)
                }
            }

            return bestScore
        } else {
            let bestScore = Infinity

            for(let i = 0; i < board.length; i++) {
                if(board[i] == "") {
                    board[i] = PLAYER_O
                    let score = minimax(board, depth - 1, true)
                    board[i] = ""
                    bestScore = Math.min(score, bestScore)
                }
            }

            return bestScore
        }
    }

    const placeMarker = (cell, currentPlayer) => {

        let board = gameBoard.gameboard

        const index = cell.dataset.key
        board[index] = currentPlayer
        cell.classList.add(currentPlayer)
    }

    const swapTurns = () => {
        xTurn = !xTurn
    }

    const setBoardHoverClass = () => {
        doc.getElementById('board').classList.remove(PLAYER_X)
        doc.getElementById('board').classList.remove(PLAYER_O)

        if(xTurn) {
            board.classList.add(PLAYER_X)
        } else {
            board.classList.add(PLAYER_O)
        }
    }

    const clickHandler = (e) => {
        const cell = e.target
        const currentPlayer = xTurn ? PLAYER_X : PLAYER_O

        placeMarker(cell, currentPlayer)

        bestMove()

        let winner = checkWinner()

        if(winner !== null) {
            if(winner == PLAYER_X) {
                winningMessageTextElement.innerText = `${PLAYER_X.toUpperCase()} Wins!`
            }

            if(winner == PLAYER_O) {
                winningMessageTextElement.innerText = `${PLAYER_O.toUpperCase()} Wins!`
            }

            if(winner == 'tie') {
                winningMessageTextElement.innerText = "Draw!"
            }

            winningMessageElement.classList.add('show')
        }

        swapTurns()
    }

    const startGame = () => {
        xTurn = true

        let board = gameBoard.gameboard

        for(let i = 0; i < board.length; i++) {
            board[i] = ""
        }

        cellElements.forEach(cell => {
            cell.classList.remove(PLAYER_X)
            cell.classList.remove(PLAYER_O)
            cell.removeEventListener('click', clickHandler)
            cell.addEventListener('click', clickHandler, { once: true })
        })

        bestMove()

        setBoardHoverClass()
        winningMessageElement.classList.remove('show')
    }

    startGame()

    restartButton.addEventListener('click', startGame)
}(document, GameBoard))