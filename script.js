"use strict";


const Gameboard = (function() {
    let gameboard = ["x", "o", "x"]

    return {
        gameboard,
    }
}())


const DisplayController = (function(doc, board) {

    const getElement = () => {
        return doc.getElementsByTagName("body")[0]
    }

    const getContent = () => {
        return board.gameboard
    }

    const displayBoard = (selector, content) => {
        content = getContent()
        selector = getElement()

        selector.innerHTML = content
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