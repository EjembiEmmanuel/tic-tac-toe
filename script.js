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
            
    ]

    return {
        gameboard,
    }
}())



const DisplayController = (function(doc, board) {


    const getElement = () => {
        let element = doc.querySelectorAll(".board-item")

        return element
    }

    const getContent = () => {
        return board.gameboard
    }

    const displayContent = (selectors, content) => {
    
        const {player1, player2} = GetPlayer()

        content = getContent()
        selectors = getElement()

        selectors.forEach(btn => btn.addEventListener('click', function() {
            const index = Array.from(selectors).indexOf(btn);

            let player = GetPlayerTurn(player1, player2)
            console.log(player)

            if(btn.innerText === "") {
                btn.innerText = player.letter
                content.push(btn.innerText)

                gameOver()
            }
        }));
    }

    

    const displayBoard = () => {
        displayContent()
    }

    return {
        displayBoard,
    }
}(document, Gameboard))



DisplayController.displayBoard()