export const enableAllButtons = () => {
    const gridButtons = Array.from(
        document.querySelectorAll('button:not(#restartGame)')
    )
    for (let i in gridButtons) {
        gridButtons[i].removeAttribute('disabled')
    }
}
