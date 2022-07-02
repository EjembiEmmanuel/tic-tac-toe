"use strict";

const startBtn = document.getElementById('start-btn')


const Player = (name, letter) => {

    const getName = () => {
        return name
    }

    const getLetter = () => {
        return letter
    }

    return {name, letter}
}


const GetPlayerDetails = () => {
    const player1Name = document.getElementById('player1').value
    const player2Name = document.getElementById('player2').value

    const player1 = Player(player1Name, "X")
    const player2 = Player(player2Name, "O")

    return {player1, player2}
}


const StartGame = () => {
    GetPlayerDetails()

    const Gameboard = (function() {
        let gameboard = [
            "", "", "",
            "", "", "",
            "", "", "",
        ]
    
        return {
            gameboard,
        }
    }())

    let currentPlayer
    let played = false
    const GetPlayerTurn = (player1, player2) => {
    
    if(player1.letter === "X" && !played) {
        currentPlayer = player1
        played = true
    } else {
        currentPlayer = player2
        played = false
    }

    return currentPlayer
}

    const GameOver = (function(board, doc) {
        const {player1, player2} = GetPlayerDetails()
    
        let content = board.gameboard
    
        let outcome
    
        let gameWon = false
    
        let winner = null
    
        let gameOverElement = doc.querySelector(".game-over")
        let gameOverTextElement = gameOverElement.children[0]
    
        const checkForThree = (a, b, c) => {
            let isWon 
        
            if(a === b && b === c) {
                isWon = true
            } else {
                isWon = false
            }
        
            return isWon
        }
    
        const gameOver = () => {
            if(content.length > 1) {
    
                if(content[0] !== "" && content[1] !== "" && content[2] !== "") {
                    outcome = checkForThree(content[0], content[1], content[2])
        
                    if(outcome) {
                        if(player1.letter == content[0]) {
                            winner = player1
                        } else {
                            winner = player2
                        }
        
                        gameWon = true
                    }
                } 
                
                if(content[3] !== "" && content[4] !== "" && content[5] !== "") {
                    outcome = checkForThree(content[3], content[4], content[5])
        
                    if(outcome) {
                        if(player1.letter == content[3]) {
                            winner = player1
                        } else {
                            winner = player2
                        }
        
                        gameWon = true
                    }
                } 
        
                if(content[6] !== "" && content[7] !== "" && content[8] !== "") {
                    outcome = checkForThree(content[6], content[7], content[8])
        
                    if(outcome) {
                        if(player1.letter == content[6]) {
                            winner = player1
                        } else {
                            winner = player2
                        }
        
                        gameWon = true
                    }
                } 
                
                if(content[0] !== "" && content[3] !== "" && content[6] !== "") {
                    outcome = checkForThree(content[0], content[3], content[6])
        
                    if(outcome) {
                        if(player1.letter == content[0]) {
                            winner = player1
                        } else {
                            winner = player2
                        }
        
                        gameWon = true
                    }
                } 
                
                if(content[1] !== "" && content[4] !== "" && content[7] !== "") {
                    outcome = checkForThree(content[1], content[4], content[7])
        
                    if(outcome) {
                        if(player1.letter == content[1]) {
                            winner = player1
                        } else {
                            winner = player2
                        }
        
                        gameWon = true
                        
                    }
                } 
                
                if(content[2] !== "" && content[5] !== "" && content[8] !== "") {
                    outcome = checkForThree(content[2], content[5], content[8])
        
                    if(outcome) {
                        if(player1.letter == content[2]) {
                            winner = player1
                        } else {
                            winner = player2
                        }
        
                        gameWon = true
                    }
                } 
                
                if(content[0] !== "" && content[4] !== "" && content[8] !== "") {
                    outcome = checkForThree(content[0], content[4], content[8])
        
                    if(outcome) {
                        if(player1.letter == content[0]) {
                            winner = player1
                        } else {
                            winner = player2
                        }
        
                        gameWon = true
                    }
                } 
                
                if(content[2] !== "" && content[4] !== "" && content[6] !== "") {
                    outcome = checkForThree(content[2], content[4], content[6])
        
                    if(outcome) {
                        if(player1.letter == content[2]) {
                            winner = player1
                        } else {
                            winner = player2
                        }
        
                        gameWon = true
                    }
                }
    
                if(gameWon) {
                    gameOverTextElement.textContent = `${winner.name} wins!`
                    gameOverElement.style.removeProperty('visibility')
                    gameOverTextElement.classList.add('game-over-text')
                }
        
                if(!content.includes("") && gameWon === false) {
                    gameOverTextElement.textContent = "It's a tie"
                    gameOverElement.style.removeProperty('visibility')
                    gameOverTextElement.classList.add('game-over-text')
                }
            }
        }
    
        return {
            gameOver,
        }
    }(Gameboard, document))

    const DisplayController = (function(doc, board, game) {
    
        const displayContent = () => {
        
            const {player1, player2} = GetPlayerDetails()
    
            let content = board.gameboard
            let selectors = doc.querySelectorAll(".board-item")
    
            selectors.forEach(btn => btn.addEventListener('click', function() {
                const index = Array.from(selectors).indexOf(btn);
    
                let player = GetPlayerTurn(player1, player2)
    
                if(btn.innerText === "") {
                    btn.innerText = player.letter
                    content[index] = player.letter
    
                    game.gameOver()
                }
            }));
        }
    
        
        const displayBoard = () => {
            displayContent()
        }
    
        return {
            displayBoard,
        }
    }(document, Gameboard, GameOver))

    DisplayController.displayBoard()
}
