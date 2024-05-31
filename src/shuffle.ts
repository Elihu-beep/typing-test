
export const shuffle = (arr) => {
    let currentIndex = arr.length
    while (currentIndex != 0) {
      let randomInxed = Math.floor(Math.random() * currentIndex)
      currentIndex--;

      [arr[currentIndex], arr[randomInxed]] = [
        arr[randomInxed], arr[currentIndex]
      ]
    }

  }