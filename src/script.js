import { computerMoveIntelligent } from './utils/computerMoveIntelligent.js'
import { disableAllButtons } from './utils/disableAllButtons.js'
import { displayWinningText } from './utils/displayWinningText.js'
import { enableAllButtons } from './utils/enableAllButtons.js'
import { findIntelligentMoves } from './utils/findIntelligentMoves.js'
import { handleFocusTrap } from './utils/handleFocusTrap.js'
import { hideWinningText } from './utils/hideWinningText.js'
import { highlightWinningRow } from './utils/highlightWinningRow.js'
import { setMark } from './utils/setMark.js'

let gridScore = ['', '', '', '', '', '', '', '', '']

const winnerText = document.getElementById('winnerText')
const restartGame = document.getElementById('restartGame')

const clearScore = () => {
    gridScore = ['', '', '', '', '', '', '', '', '']

    const gridButtons = Array.from(
        document.querySelectorAll('button:not(#restartGame)')
    )

    for (let i in gridButtons) {
        gridButtons[i].textContent = ''
        gridButtons[i].style.color = '#e3e3e3'
    }
}

const handleRestart = () => {
    clearScore()
    enableAllButtons()
    hideWinningText(restartGame, winnerText)
}

const handleRestartKeydown = (e) => {
    if ([' ', 'Enter'].includes(e.key)) {
        clearScore()
        enableAllButtons()
        hideWinningText(restartGame, winnerText)
    }
}

restartGame.addEventListener('mousedown', handleRestart)
restartGame.addEventListener('keydown', handleRestartKeydown)

document.addEventListener('keydown', handleFocusTrap)

const gameOver = (winner) => {
    disableAllButtons()
    displayWinningText(restartGame, winner, winnerText)
}

const checkOver = (player) => {
    if (gridScore[0].length) {
        if (gridScore[0] === gridScore[3] && gridScore[0] === gridScore[6]) {
            gameOver(gridScore[0])
            highlightWinningRow([0, 3, 6], gridScore[0])
            return
        }
        if (gridScore[0] === gridScore[1] && gridScore[0] === gridScore[2]) {
            gameOver(gridScore[0])
            highlightWinningRow([0, 1, 2], gridScore[0])
            return
        }
        if (gridScore[0] === gridScore[4] && gridScore[0] === gridScore[8]) {
            gameOver(gridScore[0])
            highlightWinningRow([0, 4, 8], gridScore[0])
            return
        }
    }
    if (gridScore[1].length) {
        if (gridScore[1] === gridScore[4] && gridScore[1] === gridScore[7]) {
            gameOver(gridScore[1])
            highlightWinningRow([1, 4, 7], gridScore[1])
            return
        }
    }
    if (gridScore[2].length) {
        if (gridScore[2] === gridScore[5] && gridScore[2] === gridScore[8]) {
            gameOver(gridScore[2])
            highlightWinningRow([2, 5, 8], gridScore[2])
            return
        }
        if (gridScore[2] === gridScore[4] && gridScore[2] === gridScore[6]) {
            gameOver(gridScore[2])
            highlightWinningRow([2, 4, 6], gridScore[2])
            return
        }
    }
    if (gridScore[3].length) {
        if (gridScore[3] === gridScore[4] && gridScore[3] === gridScore[5]) {
            gameOver(gridScore[3])
            highlightWinningRow([3, 4, 5], gridScore[3])
            return
        }
    }
    if (gridScore[6].length) {
        if (gridScore[6] === gridScore[7] && gridScore[6] === gridScore[8]) {
            gameOver(gridScore[6])
            highlightWinningRow([6, 7, 8], gridScore[6])
            return
        }
    }
    if (
        gridScore[0] &&
        gridScore[1] &&
        gridScore[2] &&
        gridScore[3] &&
        gridScore[4] &&
        gridScore[5] &&
        gridScore[6] &&
        gridScore[7] &&
        gridScore[8]
    ) {
        gameOver('-')
        return
    }

    player === 'X' && disableAllButtons()
    player === 'X' &&
        setTimeout(
            () =>
                computerMoveIntelligent(
                    findIntelligentMoves,
                    gridScore,
                    setMark,
                    checkOver
                ),
            Math.random() * 500 + 500
        )
    player === 'O' &&
        gridScore.map((item, index) => {
            if (!item) {
                const element = document.getElementsByClassName(
                    `gridElement${index}`
                )[0]
                element.removeAttribute('disabled')
            }
        })
}

const generateGrid = () => {
    const gameGrid = document.getElementById('gameGrid')

    for (let i = 0; i < 9; i++) {
        const gridElement = document.createElement('button')
        gridElement.classList.add(`gridElement${i}`)
        gridElement.addEventListener('mousedown', () =>
            setMark(checkOver, gridElement, gridScore, 'X')
        )
        gridElement.addEventListener('keydown', (e) => {
            if ([' ', 'Enter'].includes(e.key)) {
                setMark(checkOver, gridElement, gridScore, 'X')
            }
        })
        gameGrid.appendChild(gridElement)
    }
}
generateGrid()
