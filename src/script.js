import { computerMoveIntelligent } from './utils/computerMoveIntelligent.js'
import { disableAllButtons } from './utils/disableAllButtons.js'
import { gameOver } from './utils/gameOver.js'
import { generateGrid } from './utils/generateGrid.js'
import { handleFocusTrap } from './utils/handleFocusTrap.js'
import { handleRestart } from './utils/handleRestart.js'
import { handleRestartKeydown } from './utils/handleRestartKeydown.js'
import { highlightWinningRow } from './utils/highlightWinningRow.js'

const gridScore = ['', '', '', '', '', '', '', '', '']

const winnerText = document.getElementById('winnerText')
const restartGame = document.getElementById('restartGame')

restartGame.addEventListener('mousedown', () =>
    handleRestart(gridScore, restartGame, winnerText)
)
restartGame.addEventListener('keydown', (e) =>
    handleRestartKeydown(e, gridScore, restartGame, winnerText)
)

document.addEventListener('keydown', handleFocusTrap)

const checkOver = (player) => {
    if (gridScore[0].length) {
        if (gridScore[0] === gridScore[3] && gridScore[0] === gridScore[6]) {
            gameOver(restartGame, gridScore[0], winnerText)
            highlightWinningRow([0, 3, 6], gridScore[0])
            return
        }
        if (gridScore[0] === gridScore[1] && gridScore[0] === gridScore[2]) {
            gameOver(restartGame, gridScore[0], winnerText)
            highlightWinningRow([0, 1, 2], gridScore[0])
            return
        }
        if (gridScore[0] === gridScore[4] && gridScore[0] === gridScore[8]) {
            gameOver(restartGame, gridScore[0], winnerText)
            highlightWinningRow([0, 4, 8], gridScore[0])
            return
        }
    }
    if (gridScore[1].length) {
        if (gridScore[1] === gridScore[4] && gridScore[1] === gridScore[7]) {
            gameOver(restartGame, gridScore[1], winnerText)
            highlightWinningRow([1, 4, 7], gridScore[1])
            return
        }
    }
    if (gridScore[2].length) {
        if (gridScore[2] === gridScore[5] && gridScore[2] === gridScore[8]) {
            gameOver(restartGame, gridScore[2], winnerText)
            highlightWinningRow([2, 5, 8], gridScore[2])
            return
        }
        if (gridScore[2] === gridScore[4] && gridScore[2] === gridScore[6]) {
            gameOver(restartGame, gridScore[2], winnerText)
            highlightWinningRow([2, 4, 6], gridScore[2])
            return
        }
    }
    if (gridScore[3].length) {
        if (gridScore[3] === gridScore[4] && gridScore[3] === gridScore[5]) {
            gameOver(restartGame, gridScore[3], winnerText)
            highlightWinningRow([3, 4, 5], gridScore[3])
            return
        }
    }
    if (gridScore[6].length) {
        if (gridScore[6] === gridScore[7] && gridScore[6] === gridScore[8]) {
            gameOver(restartGame, gridScore[6], winnerText)
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
        gameOver(restartGame, '-', winnerText)
        return
    }

    player === 'X' && disableAllButtons()
    player === 'X' &&
        setTimeout(
            () => computerMoveIntelligent(gridScore, checkOver),
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

generateGrid(checkOver, gridScore)
