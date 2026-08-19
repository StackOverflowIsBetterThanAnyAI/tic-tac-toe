import { checkOver } from './checkOver.js'

export const setMark = (element, gridScore, mark, restartGame, winnerText) => {
    element.textContent = mark
    element.setAttribute('disabled', true)
    const index = element.classList[0].at(-1)
    if (mark === 'X') {
        gridScore[index] = 'X'
        element.style.color = '#fcd874'
    }
    checkOver(gridScore, mark, restartGame, winnerText)
}
