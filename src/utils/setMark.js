export const setMark = (checkOver, element, gridScore, mark) => {
    element.textContent = mark
    element.setAttribute('disabled', true)
    const index = element.classList[0].at(-1)
    if (mark === 'X') {
        gridScore[index] = 'X'
        element.style.color = '#fcd874'
    }
    checkOver(mark)
}
