const getHeadByKey = (state) => {
  const first = state.snakeBody[state.snakeBody.length - 1]
  const step = 10
  switch (state.key) {
    case 'ArrowDown':
      return { x: first.x + step, y: first.y }
    case 'ArrowLeft':
      return { x: first.x, y: first.y - step }
    case 'ArrowUp':
      return { x: first.x - step, y: first.y }
    default:
      return { x: first.x, y: first.y + step }
  }
}

const isKeyValid = (state, key) => {
  if ((state.key === 'ArrowDown' && key !== 'ArrowUp') ||
      (state.key === 'ArrowLeft' && key !== 'ArrowRight') ||
      (state.key === 'ArrowUp' && key !== 'ArrowDown') ||
      (state.key === 'ArrowRight' && key !== 'ArrowLeft')
  ) {
    return true
  }
  return false
}

export default {
  NEXT_STEP (state) {
    const head = getHeadByKey(state)
    state.snakeBody.push(head)
    if (head.x !== state.food.x || head.y !== state.food.y) {
      state.snakeBody.shift()
    } else {
      state.food = {
        x: Math.round(Math.random() * 100) * 10,
        y: Math.round(Math.random() * 100) * 10
      }
    }
  },

  SET_KEY (state, key) {
    if (!isKeyValid(state, key)) {
      return
    }
    state.key = key
  }
}
