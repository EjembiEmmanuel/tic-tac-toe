"use strict";


const Gameboard = (function() {
    let gameboard = [
        "x", "o", "x",
        "o", "x", "o",
        "x", "o", "x"    
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

    const displayContent = (selector, content) => {
        content = getContent()
        selector = getElement()

        for(let i = 0; i < selector.length; i++) {
            selector[i].innerText = content[i]
        }
    }

    const displayBoard = () => {
        displayContent()
    }

    return {
        displayBoard,
    }
}(document, Gameboard))


const Player = (name, letter) => {

    const getName = () => {
        return name
    }

    const getLetter = () => {
        return letter
    }

    return {name, letter}
}


DisplayController.displayBoard()