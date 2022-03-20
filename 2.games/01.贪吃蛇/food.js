import getRandom from './utils.js'
class Food {
  // 构造器=>用于数据初始化
  // 食物有坐标，宽高，颜色
  // 解构并赋初始值
  constructor({ x = 0, y = 0, width = 20, height = 20, color = 'green' } = {}) {
    // 无默认初始值的es5写法
    // let { width, x, y } = options || {}
    // 存储器, 数据初始化赋值，elements存放等待被吃的食物，不是吃一个产生一个，而是定时产生s
    this.elements = []
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }
  //
  render(map) {
    this.remove() // 删除之前创建的食物
    // 将地图按照宽高化成一个个格子的网格
    // x和y坐标，-10 / -1 微调
    // 下面两个是根据比例随机在map上生成食物
    this.x = getRandom(0, map.offsetWidth / this.width - 10) * this.width
    this.y = getRandom(0, map.offsetHeight / this.height - 1) * this.height
    let div = document.createElement('div')
    map.appendChild(div)
    this.elements.push(div)
    // 设置div样式
    div.style.position = 'absolute'
    div.style.left = this.x + 'px'
    div.style.top = this.y + 'px'
    div.style.width = this.width + 'px'
    div.style.height = this.height + 'px'
    div.style.backgroundColor = this.color
  }
  // 删除食物
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
export default Food
