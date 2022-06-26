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
        const oche = Player("Oche", "X")

        content = getContent()
        selectors = getElement()

        selectors.forEach(btn => btn.addEventListener('click', function() {
            const index = Array.from(selectors).indexOf(btn);

            if(btn.innerText === "") {
                btn.innerText = oche.letter
                content.push(btn.innerText)
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