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
  if (['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'].indexOf(key) === -1) {
    return false
  }

  if ((state.key === 'ArrowDown' && key === 'ArrowUp') ||
      (state.key === 'ArrowLeft' && key === 'ArrowRight') ||
      (state.key === 'ArrowUp' && key === 'ArrowDown') ||
      (state.key === 'ArrowRight' && key === 'ArrowLeft')
  ) {
    return false
  }
  return true
}

const inBodyCoord = (state, head) => {
  return (state.snakeBody.some(item => item.x === head.x && item.y === head.y))
}

const isWall = (state, head) => {
  return (head.y >= state.width || head.x >= state.height || head.x < 0 || head.y < 0)
}

export default {
  NEXT_STEP (state) {
    const head = getHeadByKey(state)
    if (inBodyCoord(state, head) || isWall(state, head)) {
      state.gameOver = true
      return
    }
    state.snakeBody.push(head)
    if (head.x !== state.food.x || head.y !== state.food.y) {
      state.snakeBody.shift()
    } else {
      state.speed > 30 && (state.speed -= state.speedIncrease)
      state.points += state.pointIncrease
      state.food = {
        x: Math.round(Math.random() * 75) * 10,
        y: Math.round(Math.random() * 55) * 10
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
