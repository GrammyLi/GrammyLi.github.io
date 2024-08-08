/**
 * 游戏标签类，用于在游戏中绘制文本标签。
 */
class GameLabel {
  constructor(text, x, y, font, color = "#000000") {
    this.text = text; // 标签文本
    this.x = x; // x 坐标
    this.y = y; // y 坐标
    this.font = font; // 字体
    this.color = color; // 颜色，默认为黑色
  }

  /**
   * 绘制文本标签。
   */
  draw() {
    game.context.font = this.font; // 设置字体
    game.context.fillStyle = this.color; // 设置文本颜色
    game.context.fillText(this.text, this.x, this.y); // 绘制文本
    game.context.fillStyle = "#000000"; // 重置文本颜色为黑色
  }

  /**
   * 替换标签的文本。
   * @param {string} text - 新的文本内容。
   */
  replace(text) {
    this.text = text; // 更新文本内容
  }
}
