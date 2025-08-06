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
            ? (item.style.color = '#2ecc16ff')
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
        setTimeout(() => computerMoveIntelligent(), Math.random() * 500 + 500)
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

const computerMoveIntelligent = () => {
    const availableElements = gridScore
        .map((item, index) => (item === '' ? index : null))
        .filter((index) => index !== null)

    const intelligentElements = findIntelligentMoves(availableElements)

    const random = Math.floor(Math.random() * intelligentElements.length)
    gridScore[intelligentElements[random]] = 'O'

    const element = document.getElementsByClassName(
        `gridElement${intelligentElements[random]}`
    )[0]

    setMark(element, 'O')
    checkOver('O')
}

const findIntelligentMoves = (availableElements) => {
    const intelligentMoves = {}

    const diag1 = [0, 4, 8]
    const diag2 = [2, 4, 6]

    availableElements.map((item) => {
        let priority = 0

        let xCountColumn = 0
        let oCountColumn = 0

        let xCountRow = 0
        let oCountRow = 0

        let xCountDiag1 = 0
        let oCountDiag1 = 0

        let xCountDiag2 = 0
        let oCountDiag2 = 0

        for (let i = 0; i < gridScore.length; i++) {
            if (item % 3 === i % 3) {
                if (gridScore[i] === 'X') {
                    xCountColumn++
                } else if (gridScore[i] === 'O') {
                    oCountColumn++
                }
            }

            if (Math.floor(item / 3) === Math.floor(i / 3)) {
                if (gridScore[i] === 'X') {
                    xCountRow++
                } else if (gridScore[i] === 'O') {
                    oCountRow++
                }
            }

            if (diag1.includes(item) && diag1.includes(i)) {
                if (gridScore[i] === 'X') {
                    xCountDiag1++
                } else if (gridScore[i] === 'O') {
                    oCountDiag1++
                }
            }

            if (diag2.includes(item) && diag2.includes(i)) {
                if (gridScore[i] === 'X') {
                    xCountDiag2++
                } else if (gridScore[i] === 'O') {
                    oCountDiag2++
                }
            }
        }

        if (oCountColumn === 2) {
            priority += 15
        } else if (xCountColumn === 2) {
            priority += 7
        } else if (oCountColumn === 1 && xCountColumn === 0) {
            priority += 3
        } else if (oCountColumn === 0 && xCountColumn === 1) {
            priority++
        }

        if (oCountRow === 2) {
            priority += 15
        } else if (xCountRow === 2) {
            priority += 7
        } else if (oCountRow === 1 && xCountRow === 0) {
            priority += 3
        } else if (oCountRow === 0 && xCountRow === 1) {
            priority++
        }

        if (oCountDiag1 === 2) {
            priority += 15
        } else if (xCountDiag1 === 2) {
            priority += 7
        } else if (oCountDiag1 === 1 && xCountDiag1 === 0) {
            priority += 3
        } else if (oCountDiag1 === 0 && xCountDiag1 === 1) {
            priority++
        }

        if (oCountDiag2 === 2) {
            priority += 15
        } else if (xCountDiag2 === 2) {
            priority += 7
        } else if (oCountDiag2 === 1 && xCountDiag2 === 0) {
            priority += 3
        } else if (oCountDiag2 === 0 && xCountDiag2 === 1) {
            priority++
        }

        intelligentMoves[item] = priority
    })
    const arr = Object.entries(intelligentMoves)
    const sorted = [...arr.sort(([, a], [, b]) => b - a)]
    const highestPriority = sorted[0][1]
    const smartestMoves = sorted
        .map(([key, value]) => (value >= highestPriority ? parseInt(key) : -1))
        .filter((item) => item >= 0)

    return smartestMoves
}

const setMark = (element, mark) => {
    element.textContent = mark
    element.setAttribute('disabled', true)
    const index = element.classList[0].at(-1)
    if (mark === 'X') {
        gridScore[index] = 'X'
        element.style.color = '#dcdc1a'
    }
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
