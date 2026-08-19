import { clearScore } from './clearScore.js'
import { enableAllButtons } from './enableAllButtons.js'
import { hideWinningText } from './hideWinningText.js'

export const handleRestart = (gridScore, restartGame, winnerText) => {
    clearScore(gridScore)
    enableAllButtons()
    hideWinningText(restartGame, winnerText)
}
