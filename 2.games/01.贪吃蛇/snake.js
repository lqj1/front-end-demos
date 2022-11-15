/**
 * 游戏笔记总结
 */

/**
 * 入口函数
 */
function Snakeinit () {
  this.dom = {
    // 开始游戏按钮
    'btn': document.getElementsByClassName('startGame')[0],
    // 游戏区域
    'main': document.getElementsByClassName('gameArea')[0],
    // 得分
    'actScore': document.getElementsByClassName('actScore')[0]
  },
  this.timer1;
  this.bodyPosition = { x: [], y: [] },  // 身体位置,不包括头
  this.applePosition = { x: [], y: [] },  // 果实位置
  this.currentDiret = '';  // 当前移动方向
  // 绑定开始按钮，键盘、点击事件
  this.bindStartEvent();
}
/**
 * 碰撞检测
 */
Snakeinit.prototype.cashDetect = function () {
  
}
/**
 * 开始按钮
 */
Snakeinit.prototype.bindStartEvent = function () {
  var self = this;
  // 开始按钮
  this.dom.btn.addEventListener('click', function () {
    this.style.display = 'none';
    // 绑定this为self是为了这里可以拿到全局的方法，因为这里的this是btn按钮
    self.init('right')
  }, false)
  // 捕获过程要先于冒泡过程
  // 参数数设置为true就在捕获过程中执行，反之就在冒泡过程中执行处理函数
}
/**
 * 绑定按钮
 */
Snakeinit.prototype.move = function (direction) {
  // 1.获取蛇身
  var snakeBlock = document.getElementById('snakeBlock'),
      snakeHead = document.getElementById('snakeHead'),
      snakeBody = document.getElementsByClassName('snakeBody'),
  // 由于诸如ele.style.display这样的操作只能获取DOM元素的行内样式，所以获取结果可能与实际显示效果不符
  // 通过getComputedStyle方法可以用来获取DOM元素实际显示时的样式
  // 2.获取蛇头初始的左,上距离
    x = parseInt(getComputedStyle(snakeHead).left),
    y = parseInt(getComputedStyle(snakeHead).top),
  self = this;
  this.timer1 = setInterval(() => {
    // 头+身体，长度为4
    var len = snakeBlock.children.length;
    for (var i = 0; i < len; i++) {
      // self.bodyPosition 的x,y数组来存放头和身体的位置
      self.bodyPosition.x[i] = parseInt(getComputedStyle(snakeBlock.children[i]).left)
      self.bodyPosition.y[i] = parseInt(getComputedStyle(snakeBlock.children[i]).top)
    }
    // 3.获取果实的位置
    if (document.getElementsByClassName('apple')) {
      var apple = document.getElementsByClassName('apple')
          appleNum = apple.length;
      for (var i = 0; i < appleNum; i++) {
        // 获取所有的果实的位置，并存入applePosition
        self.applePosition.x[i] = parseInt(getComputedStyle(apple[i]).left);
        self.applePosition.y[i] = parseInt(getComputedStyle(apple[i]).top);
      }
    }
    // 4.选择方向
    // switch (direction) {
    //   case 'right':
    //     // 移动头,每次移动一个身体节宽度
    //     snakeHead.style.left = self.bodyPosition.x[0] + 40 + 'px';
    //     snakeHead.style.transform = 'rotateZ(0deg)';  // 方向不变
    //     self.currentDiret = 'right';
    //     // 移动身体,bodyPosition 中的坐标在不断改变
    //     for (var i = 0; i < len - 1; i++) {
    //       snakeBody[i].style.left = self.bodyPosition.x[i] + 'px';
    //       snakeBody[i].style.top = self.bodyPosition.y[i] + 'px';
    //     }
    //     break;
    // }
    if (apple) {
      console.log('tttt: ', parseInt(getComputedStyle(snakeHead).left));
      console.log('aqqq: ', parseInt(getComputedStyle(snakeBlock).left));
      var mapX = parseInt(getComputedStyle(snakeHead).left) + parseInt(getComputedStyle(snakeBlock).left),
          mapY = parseInt(getComputedStyle(snakeHead).top) + parseInt(getComputedStyle(snakeBlock).top)
    }

  }, 200);

  

}
/**
 * 增加身体长度
 */
Snakeinit.prototype.addBody = function (x,y) {
  
}
/**
 * 地图产生果实
 */
 Snakeinit.prototype.generate = function () {
   
 }
/**
 * 地图上显示果实
 */
Snakeinit.prototype.appleShow = function () {
  var apple = document.getElementsByClassName('apple')
  // 随机生成1个或2个果实，最多1个
  // Math.floor 对浮点数向下取整
  var n = Math.floor(Math.random() * 2 + 1);
  if (apple.length >= 1) {
    // 如果地图上有不止1个果实的div,则产生一个果实 
    this.generate(1);
  } else {
    // 如果有小于1个div,则产生1/2个果实
    this.generate(n)
  }
}
/**
 * 在地图上产生果实
 */
Snakeinit.prototype.generate = function (n) {
  for (var i = 0; i < n; i++) {
    var apple = document.createElement('div'),
        x = Math.floor(Math.random()*30) * 40,
        y = Math.floor(Math.random()*15) * 40;
    apple.className = 'apple',
    apple.style.left = x + 'px',
    apple.style.top = y + 'px',
    this.dom.main.appendChild(apple)
  }

}
/**
 * 创建蛇头蛇身
 * return: 蛇头蛇身区域
 */
Snakeinit.prototype.createSnake = function () {
  var self = this,
      // 蛇头长宽
      bodyPositionX = 40,
      bodyPositionY = 40;
  var positionX = Math.floor(Math.random() * 12 + 3) * 40,
      positionY = Math.floor(Math.random() * 15) * 40,
      moveLeft = positionX;
  var snakeBlock = document.createElement('div'),
      snakeHead = document.createElement('div');
  snakeBlock.id = 'snakeBlock';
  snakeBlock.style.left = positionX + 'px';
  snakeBlock.style.top = positionY + 'px';
  snakeHead.id = 'snakeHead'
  snakeBlock.appendChild(snakeHead)
  // 生成一个蛇头和三个div块的蛇身
  for (var i = 0; i < 3; i++) {
    var snakeBody = document.createElement('div');
    // 向左偏移蛇头的宽度，避免重叠
    snakeBody.className = 'snakeBody'
    snakeBody.style.left = -bodyPositionX + 'px'
    bodyPositionX += 40;
    snakeBlock.appendChild(snakeBody);
  }
  return snakeBlock;
}
/**
 * 初始化开始
 */
Snakeinit.prototype.init = function () {
  // 创建贪吃蛇头蛇身
  var snakeBlock = this.createSnake()
  // 游戏区域添加蛇头蛇身
  this.dom.main.appendChild(snakeBlock)
  // 生成果实
  this.appleShow()
  // 开始移动
  this.move('right')
  
}

/**
 * 程序入口，新创建一个对象，会进入到 Snakeinit 函数中
 */
var snake = new Snakeinit()