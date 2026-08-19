import { setMark } from './setMark.js'

export const generateGrid = (gridScore, restartGame, winnerText) => {
    const gameGrid = document.getElementById('gameGrid')

    for (let i = 0; i < 9; i++) {
        const gridElement = document.createElement('button')
        gridElement.classList.add(`gridElement${i}`)
        gridElement.addEventListener('mousedown', () =>
            setMark(gridElement, gridScore, 'X', restartGame, winnerText)
        )
        gridElement.addEventListener('keydown', (e) => {
            if ([' ', 'Enter'].includes(e.key)) {
                setMark(gridElement, gridScore, 'X', restartGame, winnerText)
            }
        })
        gameGrid.appendChild(gridElement)
    }
}
