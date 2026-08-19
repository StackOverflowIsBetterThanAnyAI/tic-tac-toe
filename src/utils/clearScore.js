export const clearScore = (gridScore) => {
    gridScore.fill('')

    const gridButtons = Array.from(
        document.querySelectorAll('button:not(#restartGame)')
    )

    for (let i in gridButtons) {
        gridButtons[i].textContent = ''
        gridButtons[i].style.color = '#e3e3e3'
    }
}
