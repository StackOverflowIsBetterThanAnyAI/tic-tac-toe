export const findIntelligentMoves = (availableElements, gridScore) => {
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
