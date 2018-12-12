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
  }
}
