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
    let playing = true

    const GetPlayerTurn = (player1, player2) => {
    
        if(player1.letter === "X" && playing) {
            currentPlayer = player1
            playing = false
        } else {
            currentPlayer = player2
            playing = true
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

                    gameOverElement.addEventListener('click', function() {
                        location.reload()
                    })
                }
        
                if(!content.includes("") && gameWon === false) {
                    gameOverTextElement.textContent = "It's a tie"
                    gameOverElement.style.removeProperty('visibility')
                    gameOverTextElement.classList.add('game-over-text')

                    gameOverElement.addEventListener('click', function() {
                        location.reload()
                    })
                }
            }

            return gameWon
        }
    
        return {
            gameOver,
        }
    }(Gameboard, document))

    const MakeMove = (function(doc, board, game) {

        const {player1, player2} = GetPlayerDetails()

        let content = board.gameboard

        const ai = (spots) => {

            console.log(spots)

            for(let i = 0; i < spots.length; i++) {
                if(content[i] === "") {
                    content[i] = "O"
                    return i
                }
            }

        }

        const play = () => {

            let selectors = doc.querySelectorAll(".board-item")

            selectors.forEach(btn => btn.addEventListener('click', function() {
                const index = Array.from(selectors).indexOf(btn);

                let player = GetPlayerTurn(player1, player2)

                if(btn.innerText === "" && content[index] === "") {
                        btn.innerText = player.letter
                        content[index] = player.letter

                        player = GetPlayerTurn(player1, player2)

                        let aiChoice = ai(content)
                        aiChoice

                        selectors[aiChoice].innerText = player.letter
        
                        game.gameOver()
                        btn.removeEventListener('click', function() {
                        })
                } else {
                    player = GetPlayerTurn(player1, player2)
                }

            }));

        }

        return {
            play
        }

    }(document, Gameboard, GameOver))

    const DisplayController = (function(doc, board, game, move) {
    
        const displayContent = () => {
            move.play()
        }
    
        
        const displayBoard = () => {
            displayContent()
        }
    
        return {
            displayBoard,
        }
    }(document, Gameboard, GameOver, MakeMove))

    DisplayController.displayBoard()
}
