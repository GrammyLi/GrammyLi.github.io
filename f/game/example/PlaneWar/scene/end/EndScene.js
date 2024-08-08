/**
 * 结束场景类，继承自 Scene，用于显示游戏结束画面并处理继续游戏的逻辑。
 */
class EndScene extends Scene {
  /**
   * 构造函数，初始化结束场景。
   */
  constructor() {
    super();
    this.setup();
    this.bindActions();
  }

  /**
   * 初始化结束场景的元素。
   */
  setup() {
    const endImage = new GameImage("end");
    const labels = [
      { text: "Gameover", x: 87, y: 260, font: "40px sans-serif" },
      { text: "Press r to continue", x: 55, y: 320, font: "28px sans-serif" },
    ];

    // 添加图像和标签到场景中
    this.addElement(endImage);
    labels.forEach((labelConfig) => {
      const label = new GameLabel(
        labelConfig.text,
        labelConfig.x,
        labelConfig.y,
        labelConfig.font
      );
      this.addElement(label);
    });
  }

  /**
   * 绑定按键操作，用于继续游戏。
   */
  bindActions() {
    game.registerAction("r", () => {
      const scene = new StartScene();
      game.replaceScene(scene);
    });
  }
}
