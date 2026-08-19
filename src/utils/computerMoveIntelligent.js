import { findIntelligentMoves } from './findIntelligentMoves.js'
import { setMark } from './setMark.js'

export const computerMoveIntelligent = (gridScore, restartGame, winnerText) => {
    const availableElements = gridScore
        .map((item, index) => (item === '' ? index : null))
        .filter((index) => index !== null)

    const intelligentElements = findIntelligentMoves(
        availableElements,
        gridScore
    )

    const random = Math.floor(Math.random() * intelligentElements.length)
    gridScore[intelligentElements[random]] = 'O'

    const element = document.getElementsByClassName(
        `gridElement${intelligentElements[random]}`
    )[0]

    setMark(element, gridScore, 'O', restartGame, winnerText)
}
