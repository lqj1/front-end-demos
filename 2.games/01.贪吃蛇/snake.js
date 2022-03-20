// 蛇类
class Snake {
  constructor({ width = 20, height = 20, direction = 'right' } = {}) {
    this.elements = []
    this.width = width
    this.height = height
    this.direction = direction
    this.body = [
      { x: 3, y: 2, color: 'red' }, // 蛇头
      { x: 2, y: 2, color: 'blue' },
      { x: 1, y: 2, color: 'blue' }
    ]
  }
  // 移动
  move(food, map) {
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x
      this.body[i].y = this.body[i - 1].y
    }
    let head = this.body[0]
    // 移动方向
    switch (this.direction) {
      case 'right':
        head.x += 1
        break
      case 'left':
        head.x -= 1
        break
      case 'top':
        head.y -= 1
        break
      case 'bottom':
        head.y += 1
        break
    }
    // 碰撞检测
    let headX = head.x * this.width
    let headY = head.y * this.height
    if (headX == food.x && headY == food.y) {
      let last = this.body[this.body.length - 1]
      this.body.push({
        x: last.x,
        y: last.y,
        color: last.color
      })
      food.render(map) // 重新生成食物
    }
  }
  render(map) {
    // 删除之前创建的蛇
    this.remove()
    // 类似于食物的创建，通过循环类创建连续多个div
    for (let i = 0, len = this.body.length; i < len; i++) {
      let object = this.body[i]
      // 下面两个是根据比例随机在map上生成食物
      let div = document.createElement('div')
      map.appendChild(div)
      this.elements.push(div)
      // 设置div样式
      div.style.position = 'absolute'
      div.style.left = this.x + 'px'
      div.style.top = this.y + 'px'
      div.style.width = object.x * this.width + 'px'
      div.style.height = object.y * this.height + 'px'
      div.style.backgroundColor = this.color
    }
  }
  // 删除蛇
  remove() {
    // 从大到小/从后往前删
    for (let i = this.elements.length - 1; i >= 0; i--) {
      // 通过父节点删除真实dom
      this.elements[i].parentNode.removeChild(this.elements[i])
      // 删除数组中的元素
      this.elements.splice(i, 1)
    }
  }
}
export default Snake
