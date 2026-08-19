export const hideWinningText = (restartGame, winnerText) => {
    restartGame.style.display = 'none'
    restartGame.setAttribute('disabled', true)
    winnerText.style.display = 'none'
}
