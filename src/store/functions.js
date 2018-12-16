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

const isGameOver = (state, head) => {
  if (inBodyCoord(state, head) || isWall(state, head)) {
    state.gameOver = true
    return true
  }
  return false
}

const isFoodEaten = (state, head) => {
  return (head.x === state.food.x && head.y === state.food.y)
}

const setNewSnakeSpeed = (state) => {
  state.speed > state.minSpeed && (state.speed -= state.speedIncrease)
}

const increaseGamePoints = (state) => {
  state.points += state.pointIncrease
}

const getNewFood = (self) => {
  return {
    x: Math.round(Math.random() * 65) * 10,
    y: Math.round(Math.random() * 65) * 10
  }
}

export {
  getHeadByKey,
  isKeyValid,
  isGameOver,
  isFoodEaten,
  setNewSnakeSpeed,
  increaseGamePoints,
  getNewFood
}
