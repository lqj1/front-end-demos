import Food from './food.js'
import Snake from './snake.js'
// 游戏的入口文件
class Game {
  constructor() {
    this.food = new Food()
    this.snake = new Snake()
    this.map = map
    this.timerId = null
  }
  start() {
    // 将蛇和食物渲染到地图上
    this.food.render(this.map)
    this.snake.render(this.map)
  }
  // 通过键盘控制蛇移动的方向
  bindKey() {
    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 37:
          this.snake.direction = 'left'
          break
        case 38:
          this.snake.direction = 'top'
          break
        case 39:
          this.snake.direction = 'right'
          break
        case 40:
          this.snake.direction = 'bottom'
          break
      }
    })
  }
  runSnake() {
    this.timerId = setTimeout(() => {
      // 移动
      this.snake.move(this.food, this.map)
      // 碰撞边界检测
      let maxX = this.map.offsetWidth / this.snake.width
      let maxY = this.map.offsetHeight / this.snake.height
      let headX = this.snake.body[0].x
      let headY = this.snake.body[0].y
      if (headX < 0 || headX > maxX || headY < 0 || headY > maxY) {
        alert('游戏结束')
        clearInterval(this.timerId)
        return
      }
    }, 500)
  }
}
export default Game
