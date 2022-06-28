"use strict";


const Player = (name, letter) => {

    const getName = () => {
        return name
    }

    const getLetter = () => {
        return letter
    }

    return {name, letter}
}


const GetPlayer = (player1, player2) => {
    player1 = Player("Oche", "X")
    player2 = Player("Ben", "O")

    return {player1, player2}
}


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


const GameOver = (function(board) {
    const {player1, player2} = GetPlayer()

    let content = board.gameboard

    let outcome

    let gameWon = false

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
                        console.log(`${player1.name} wins`)
                    } else {
                        console.log(`${player2.name} wins`)
                    }
    
                    gameWon = true
                }
            } 
            
            if(content[3] !== "" && content[4] !== "" && content[5] !== "") {
                outcome = checkForThree(content[3], content[4], content[5])
    
                if(outcome) {
                    if(player1.letter == content[3]) {
                        console.log(`${player1.name} wins`)
                    } else {
                        console.log(`${player2.name} wins`)
                    }
    
                    gameWon = true
                }
            } 
    
            if(content[6] !== "" && content[7] !== "" && content[8] !== "") {
                outcome = checkForThree(content[6], content[7], content[8])
    
                if(outcome) {
                    if(player1.letter == content[6]) {
                        console.log(`${player1.name} wins`)
                    } else {
                        console.log(`${player2.name} wins`)
                    }
    
                    gameWon = true
                }
            } 
            
            if(content[0] !== "" && content[3] !== "" && content[6] !== "") {
                outcome = checkForThree(content[0], content[3], content[6])
    
                if(outcome) {
                    if(player1.letter == content[0]) {
                        console.log(`${player1.name} wins`)
                    } else {
                        console.log(`${player2.name} wins`)
                    }
    
                    gameWon = true
                }
            } 
            
            if(content[1] !== "" && content[4] !== "" && content[7] !== "") {
                outcome = checkForThree(content[1], content[4], content[7])
    
                if(outcome) {
                    if(player1.letter == content[1]) {
                        console.log(`${player1.name} wins`)
                    } else {
                        console.log(`${player2.name} wins`)
                    }
    
                    gameWon = true
                    
                }
            } 
            
            if(content[2] !== "" && content[5] !== "" && content[8] !== "") {
                outcome = checkForThree(content[2], content[5], content[8])
    
                if(outcome) {
                    if(player1.letter == content[2]) {
                        console.log(`${player1.name} wins`)
                    } else {
                        console.log(`${player2.name} wins`)
                    }
    
                    gameWon = true
                }
            } 
            
            if(content[0] !== "" && content[4] !== "" && content[8] !== "") {
                outcome = checkForThree(content[0], content[4], content[8])
    
                if(outcome) {
                    if(player1.letter == content[0]) {
                        console.log(`${player1.name} wins`)
                    } else {
                        console.log(`${player2.name} wins`)
                    }
    
                    gameWon = true
                }
            } 
            
            if(content[2] !== "" && content[4] !== "" && content[6] !== "") {
                outcome = checkForThree(content[2], content[4], content[6])
    
                if(outcome) {
                    if(player1.letter == content[2]) {
                        console.log(`${player1.name} wins`)
                    } else {
                        console.log(`${player2.name} wins`)
                    }
    
                    gameWon = true
                }
            }
    
            if(!content.includes("") && gameWon === false) {
                console.log("It's a tie")
            }
        }
    }

    return {
        gameOver,
    }
}(Gameboard))


const DisplayController = (function(doc, board, game) {


    const getElement = () => {
        let element = doc.querySelectorAll(".board-item")

        return element
    }

    const getContent = () => {
        return board.gameboard
    }

    

    const displayContent = () => {
    
        const {player1, player2} = GetPlayer()

        let content = getContent()
        let selectors = getElement()

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