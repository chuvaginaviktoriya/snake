import {
  isGameOver,
  getHeadByKey,
  isKeyValid,
  isFoodEaten,
  setNewSnakeSpeed,
  increaseGamePoints,
  getNewFood
} from './functions'

export default {
  NEXT_STEP (state) {
    const head = getHeadByKey(state)
    if (isGameOver(state, head)) {
      return
    }

    if (isFoodEaten(state, head)) {
      setNewSnakeSpeed(state)
      increaseGamePoints(state)
      state.food = getNewFood()
    } else {
      state.snakeBody.shift()
    }
    state.snakeBody.push(head)
  },

  SET_KEY (state, key) {
    if (!isKeyValid(state, key)) {
      return
    }
    state.key = key
  },

  CLEAR (state) {
    state.snakeBody = [
      { x: 0, y: 0 }
    ]
    state.speed = 100
    state.points = 0
    state.gameOver = false
    state.key = 'ArrowRight'
  }
}
