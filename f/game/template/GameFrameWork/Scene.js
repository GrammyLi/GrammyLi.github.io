/**
 * 场景类，用于管理游戏中的元素和背景。
 */
class Scene {
  /**
   * 构造函数，初始化场景。
   */
  constructor() {
    this.elements = []; // 场景中的元素数组
    this.background = "white"; // 场景的背景颜色，默认为白色
  }

  /**
   * 设置背景颜色。
   * @param {string} color - 背景颜色。
   */
  setBackground(color) {
    this.background = color;
  }

  /**
   * 添加元素到场景中。
   * @param {Object} element - 要添加的元素。
   */
  addElement(element) {
    element.scene = this; // 设置元素的场景为当前场景
    this.elements.push(element); // 将元素添加到元素数组中
  }

  /**
   * 从场景中移除元素。
   * @param {Object} element - 要移除的元素。
   */
  removeElement(element) {
    this.elements = this.elements.filter((item) => item !== element); // 过滤掉要移除的元素
  }

  /**
   * 替换场景中的一个元素。
   * @param {Object} oldElement - 要替换的旧元素。
   * @param {Object} newElement - 替换后的新元素。
   */
  replaceElement(oldElement, newElement) {
    let oldIndex = this.elements.findIndex((item) => item === oldElement); // 找到旧元素的索引
    this.elements.splice(oldIndex, 1, newElement); // 用新元素替换旧元素
  }

  /**
   * 更新场景中的所有元素。
   */
  update() {
    if (window.debugMode) {
      this.debug?.(); // 如果存在 debug 方法，则调用
      for (let element of this.elements) {
        element.debug?.(); // 如果元素存在 debug 方法，则调用
      }
    }
    for (let element of this.elements) {
      element.update?.(); // 如果元素存在 update 方法，则调用
    }
  }

  /**
   * 绘制场景中的所有元素。
   */
  draw() {
    game.context.fillStyle = this.background; // 设置背景颜色
    game.context.fillRect(0, 0, game.width, game.height); // 绘制背景
    game.context.fillStyle = "#000000"; // 设置填充颜色为黑色
    for (let element of this.elements) {
      element.draw(); // 绘制每个元素
    }
  }
}
