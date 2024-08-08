/**
 * Animation 类，用于管理动画效果。
 */
class Animation {
  /**
   * 构造函数，初始化动画的属性。
   * @param {string} name - 动画名称。
   */
  constructor(name) {
    let { number, duration } = animationConfig.find(
      (item) => item.name === name
    );
    console.log("animationConfig", animationConfig, number, duration);

    this.name = name; // 动画名称
    this.number = number; // 动画帧数
    this.duration = duration; // 每帧持续时间
    this.imageIndex = 0; // 当前帧索引
    this.frameCount = 0; // 帧计数器
    this.currentImage = new GameImage(`${this.name}${this.imageIndex}`); // 当前帧图像
    this.addToScene = false; // 标志是否已添加到场景
  }

  /**
   * 更新动画的当前帧。
   */
  update() {
    this.frameCount += 1;
    if (this.frameCount === this.duration) {
      this.frameCount = 0;
      this.imageIndex = (this.imageIndex + 1) % this.number;
      this.currentImage.replace(`${this.name}${this.imageIndex}`);
    }
  }

  /**
   * 绘制当前帧，将其添加到场景中。
   */
  draw() {
    if (this.addToScene) {
      return;
    }
    this.scene.addElement(this.currentImage);
    this.addToScene = true;
  }
}
