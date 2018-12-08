export default {
  snakeBody: [
    { x: 0, y: 10 },
    { x: 0, y: 20 },
    { x: 0, y: 30 },
    { x: 0, y: 40 },
    { x: 0, y: 50 },
    { x: 0, y: 60 },
    { x: 0, y: 70 }
  ],
  key: 'ArrowRight',
  step: 10,
  speed: 100,
  food: {
    x: Math.round(Math.random() * 100) * 10,
    y: Math.round(Math.random() * 100) * 10
  }
}
