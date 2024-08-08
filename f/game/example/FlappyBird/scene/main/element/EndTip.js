/**
 * EndTip 类，用于显示游戏结束提示和处理重启游戏的逻辑。
 */
class EndTip {
  /**
   * 构造函数，初始化游戏结束提示图像和标签，并注册重启游戏的按键动作。
   */
  constructor() {
    this.image = new GameImage("gameover"); // 游戏结束图像
    this.image.x = 104; // 图像的 x 坐标
    this.image.y = 200; // 图像的 y 坐标
    this.label = new GameLabel(
      "Press r to continue",
      77,
      300,
      "28px sans-serif",
      "white"
    ); // 游戏结束提示标签
    this.addToScene = false; // 标志是否已添加到场景

    // 注册按键动作，按下 'r' 键重新开始游戏
    game.registerAction("r", () => {
      let scene = new MainScene();
      game.replaceScene(scene);
    });
  }

  /**
   * 绘制游戏结束提示图像和标签。
   */
  draw() {
    if (this.addToScene) {
      return;
    }
    this.scene.addElement(this.image);
    this.scene.addElement(this.label);
    this.addToScene = true;
  }
}
