export const highlightWinningRow = (elements, winner) => {
    const winningElements = []
    for (let i in elements) {
        winningElements.push(
            document.getElementsByClassName(`gridElement${elements[i]}`)[0]
        )
    }
    winningElements.map((item) => {
        winner === 'X'
            ? (item.style.color = '#5bf045')
            : (item.style.color = '#f04b4b')
    })
}
