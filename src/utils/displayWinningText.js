export const displayWinningText = (restartGame, winner, winnerText) => {
    restartGame.style.display = 'block'
    restartGame.removeAttribute('disabled')
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
