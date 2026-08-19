import { disableAllButtons } from './disableAllButtons.js'
import { displayWinningText } from './displayWinningText.js'

export const gameOver = (restartGame, winner, winnerText) => {
    disableAllButtons()
    displayWinningText(restartGame, winner, winnerText)
}
