import { getNewFood } from './functions'

export default {
  snakeBody: [
    { x: 0, y: 0 }
  ],
  key: 'ArrowRight',
  width: 700,
  height: 700,
  speedIncrease: 5,
  minSpeed: 30,
  speed: 100,
  points: 0,
  pointIncrease: 10,
  food: getNewFood(),
  gameOver: false
}
