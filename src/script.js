let gridScore = ['', '', '', '', '', '', '', '', '']

const winnerText = document.getElementById('winnerText')
const restartGame = document.getElementById('restartGame')

const disableAllButtons = () => {
    const gridButtons = Array.from(
        document.querySelectorAll('button:not(#restartGame)')
    )

    for (let i in gridButtons) {
        gridButtons[i].setAttribute('disabled', true)
    }
}

const enableAllButtons = () => {
    const gridButtons = Array.from(
        document.querySelectorAll('button:not(#restartGame)')
    )

    for (let i in gridButtons) {
        gridButtons[i].removeAttribute('disabled')
    }
}

const clearScore = () => {
    gridScore = ['', '', '', '', '', '', '', '', '']

    const gridButtons = Array.from(
        document.querySelectorAll('button:not(#restartGame)')
    )

    for (let i in gridButtons) {
        gridButtons[i].textContent = ' '
        gridButtons[i].style.color = '#e3e3e3'
    }
}
const hideWinningText = () => {
    restartGame.style.display = 'none'
    winnerText.style.display = 'none'
}

const displayWinningText = (winner) => {
    restartGame.style.display = 'block'
    winnerText.style.display = 'block'
    switch (winner) {
        case 'O':
            winnerText.innerHTML = 'COM Wins!'
            break
        case 'X':
            winnerText.innerHTML = 'You Win!'
            break
        default:
            winnerText.innerHTML = 'Tie!'
            break
    }
}

const handleRestart = () => {
    clearScore()
    enableAllButtons()
    hideWinningText()
}

restartGame.addEventListener('mousedown', handleRestart)

const gameOver = (winner) => {
    disableAllButtons()
    displayWinningText(winner)
}

const highlightWinningRow = (elements, winner) => {
    const winningElements = []
    for (let i in elements) {
        winningElements.push(
            document.getElementsByClassName(`gridElement${elements[i]}`)[0]
        )
    }
    winningElements.map((item) => {
        winner === 'X'
            ? (item.style.color = '#84cc16')
            : (item.style.color = '#dc2626')
    })
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
        setTimeout(() => computerMove(), Math.random() * 500 + 500)
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

const computerMove = () => {
    const availableElements = gridScore
        .map((item, index) => (item === '' ? index : null))
        .filter((index) => index !== null)

    const random = Math.floor(Math.random() * availableElements.length)
    gridScore[availableElements[random]] = 'O'
    const element = document.getElementsByClassName(
        `gridElement${availableElements[random]}`
    )[0]
    setMark(element, 'O')
    checkOver('O')
}

const setMark = (element, mark) => {
    element.textContent = mark
    element.setAttribute('disabled', true)
    const index = element.classList[0].at(-1)
    mark === 'X' && (gridScore[index] = 'X')
    checkOver(mark)
}

const generateGrid = () => {
    const gameGrid = document.getElementById('gameGrid')

    for (let i = 0; i < 9; i++) {
        const gridElement = document.createElement('button')
        gridElement.classList.add(`gridElement${i}`)
        const text = document.createTextNode(' ')
        gridElement.appendChild(text)
        gridElement.addEventListener('mousedown', () =>
            setMark(gridElement, 'X')
        )
        gameGrid.appendChild(gridElement)
    }
}

generateGrid()
