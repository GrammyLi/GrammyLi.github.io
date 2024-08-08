/**
 * 云朵类，继承自 GameImage，用于管理云朵的初始化和更新。
 */
class Cloud extends GameImage {
  /**
   * 构造函数，初始化云朵图像。
   */
  constructor() {
    super("cloud");
    this.setup();
  }

  /**
   * 初始化云朵的位置和速度。
   */
  setup() {
    this.speed = 1;
    this.x = randomBetween(-100, 100);
    this.y = -randomBetween(190, 250);
  }

  /**
   * 更新云朵的位置，如果超出屏幕则重置位置。
   */
  update() {
    this.y += this.speed;
    if (this.y > 540) {
      this.setup();
    }
  }
}
