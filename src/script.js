import { generateGrid } from './utils/generateGrid.js'
import { handleFocusTrap } from './utils/handleFocusTrap.js'
import { handleRestart } from './utils/handleRestart.js'
import { handleRestartKeydown } from './utils/handleRestartKeydown.js'

const gridScore = ['', '', '', '', '', '', '', '', '']

const restartGame = document.getElementById('restartGame')
const winnerText = document.getElementById('winnerText')

restartGame.addEventListener('mousedown', () =>
    handleRestart(gridScore, restartGame, winnerText)
)
restartGame.addEventListener('keydown', (e) =>
    handleRestartKeydown(e, gridScore, restartGame, winnerText)
)

document.addEventListener('keydown', handleFocusTrap)

generateGrid(gridScore, restartGame, winnerText)
