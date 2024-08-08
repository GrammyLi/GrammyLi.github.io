/**
 * Pipes 类，用于管理管道元素的绘制和更新。
 */
class Pipes {
  /**
   * 构造函数，初始化管道元素及其位置。
   */
  constructor() {
    this.pipes = []; // 存放所有管道元素的数组
    this.columsOfPipes = 3; // 管道的列数
    this.pipeXSpace = 200; // 管道之间的水平间距
    this.pipeYSpace = 150; // 上下管道之间的垂直间距
    for (let i = 0; i < this.columsOfPipes; i++) {
      let p1 = new GameImage("pipe");
      p1.x = 500 + i * this.pipeXSpace;
      p1.flipY = true; // 翻转上方的管道
      let p2 = new GameImage("pipe");
      p2.x = p1.x;
      this.setPipesY(p1, p2);
      this.pipes.push(p1);
      this.pipes.push(p2);
    }
    this.addToScene = false; // 标志是否已添加到场景
  }

  /**
   * 设置上下管道的 y 坐标。
   * @param {GameImage} p1 - 上方的管道。
   * @param {GameImage} p2 - 下方的管道。
   */
  setPipesY(p1, p2) {
    p1.y = randomBetween(200 - p1.h - this.pipeYSpace, 0); // 设置上方管道的 y 坐标
    p2.y = p1.y + p1.h + this.pipeYSpace; // 设置下方管道的 y 坐标
  }

  /**
   * 更新管道元素的位置，实现管道的滚动效果。
   */
  update() {
    for (let i = 0; i < this.pipes.length; i += 2) {
      let p1 = this.pipes[i];
      let p2 = this.pipes[i + 1];
      p1.x -= 5; // 每次更新时管道元素向左移动
      p2.x -= 5;
      if (p1.x < -this.pipeXSpace) {
        p1.x = 400; // 管道重新出现的位置
        p2.x = 400;
        this.setPipesY(p1, p2); // 重设管道的 y 坐标
      }
    }
  }

  /**
   * 绘制管道元素，将它们添加到场景中。
   */
  draw() {
    if (this.addToScene) {
      return;
    }
    for (let pipe of this.pipes) {
      this.scene.addElement(pipe);
    }
    this.addToScene = true;
  }

  /**
   * 检测鸟是否与任何管道发生碰撞。
   * @param {Bird} bird - 鸟的实例。
   * @returns {boolean} 是否发生碰撞。
   */
  collide(bird) {
    for (let pipe of this.pipes) {
      if (rectIntersects(pipe, bird).intersect) {
        return true;
      }
    }
    return false;
  }

  /**
   * 调试方法，用于动态调整管道之间的垂直间距。
   */
  debug() {
    this.pipeYSpace = config.pipeYSpace.value;
  }
}
