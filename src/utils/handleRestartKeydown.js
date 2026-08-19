import { clearScore } from './clearScore.js'
import { enableAllButtons } from './enableAllButtons.js'
import { hideWinningText } from './hideWinningText.js'

export const handleRestartKeydown = (e, gridScore, restartGame, winnerText) => {
    if ([' ', 'Enter'].includes(e.key)) {
        clearScore(gridScore)
        enableAllButtons()
        hideWinningText(restartGame, winnerText)
    }
}
