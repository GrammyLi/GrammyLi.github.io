/**
 * 主场景类，继承自 Scene，用于管理游戏的主要逻辑。
 */
class MainScene extends Scene {
  /**
   * 构造函数，初始化主场景及其元素。
   */
  constructor() {
    super();
    this.sky = new GameImage("sky");
    this.pipes = new Pipes();
    this.ground = new Ground();
    this.bird = new Bird();
    this.startTip = new StartTip();
    this.addElement(this.sky);
    this.addElement(this.pipes);
    this.addElement(this.ground);
    this.addElement(this.bird);
    this.addElement(this.startTip);

    this.start = false;
    this.gameover = false;
    this.bindActions();
  }

  /**
   * 绑定按键操作，用于控制游戏的开始和鸟的跳跃。
   */
  bindActions() {
    game.registerAction(" ", () => {
      if (this.gameover) {
        return;
      }
      if (!this.start) {
        this.start = true;
        this.startTip.remove();
      }
      this.bird.jump();
    });
  }

  /**
   * 更新场景状态，检测碰撞并处理相应逻辑。
   */
  update() {
    if (!this.start || this.gameover) {
      return;
    }
    super.update();
    if (this.pipes.collide(this.bird)) {
      this.gameover = true;
      let endTip = new EndTip();
      this.addElement(endTip);
    }
  }
}
