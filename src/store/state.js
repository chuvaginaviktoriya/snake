export default {
  snakeBody: [
    { x: 0, y: 0 }
  ],
  key: 'ArrowRight',
  width: 600,
  height: 800,
  speedIncrease: 5,
  speed: 100,
  points: 0,
  pointIncrease: 10,
  food: {
    x: Math.round(Math.random() * 75) * 10,
    y: Math.round(Math.random() * 55) * 10
  },
  gameOver: false
}
