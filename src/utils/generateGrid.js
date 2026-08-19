import { setMark } from './setMark.js'

export const generateGrid = (checkOver, gridScore) => {
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
