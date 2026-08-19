export const handleFocusTrap = (e) => {
    const focusableButtons = Array.from(
        document.querySelectorAll('button')
    ).filter((item) => !item.disabled)

    const firstButton = focusableButtons[0]
    const lastButton = focusableButtons.at(-1)

    if (e.key !== 'Tab') {
        return
    }

    if (e.shiftKey) {
        if (document.activeElement === firstButton) {
            e.preventDefault()
            lastButton.focus()
        }
    } else {
        if (document.activeElement === lastButton) {
            e.preventDefault()
            firstButton.focus()
        }
    }
}
