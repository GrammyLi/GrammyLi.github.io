/**
 * StartTip 类，用于显示游戏开始提示和处理相关逻辑。
 */
class StartTip {
  /**
   * 构造函数，初始化游戏开始提示图像和标签。
   */
  constructor() {
    this.image = new GameImage("start"); // 游戏开始图像
    this.image.x = 108; // 图像的 x 坐标
    this.image.y = 130; // 图像的 y 坐标
    this.label = new GameLabel(
      "Press space to start",
      68,
      330,
      "28px sans-serif",
      "white"
    ); // 游戏开始提示标签
    this.addToScene = false; // 标志是否已添加到场景
  }

  /**
   * 绘制游戏开始提示图像和标签，将它们添加到场景中。
   */
  draw() {
    if (this.addToScene) {
      return;
    }
    this.scene.addElement(this.image);
    this.scene.addElement(this.label);
    this.addToScene = true;
  }

  /**
   * 移除游戏开始提示图像和标签。
   */
  remove() {
    this.scene.removeElement(this.image);
    this.scene.removeElement(this.label);
  }
}
