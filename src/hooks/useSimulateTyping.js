export function simulateTyping(setText, targetText, speed = 40) {
  return new Promise((resolve) => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setText(targetText.slice(0, i))
      if (i >= targetText.length) {
        clearInterval(interval)
        resolve()
      }
    }, speed)
  })
}

export function simulateSelection(setSelected, items, delay = 400) {
  return new Promise((resolve) => {
    let i = 0
    const interval = setInterval(() => {
      setSelected((prev) => [...prev, items[i]])
      i++
      if (i >= items.length) {
        clearInterval(interval)
        resolve()
      }
    }, delay)
  })
}
