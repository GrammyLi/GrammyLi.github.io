/**
 * Bird 类，继承自 Animation，用于管理鸟的动画和物理效果。
 */
class Bird extends Animation {
  /**
   * 构造函数，初始化鸟的图像及其位置和物理属性。
   */
  constructor() {
    super("bird");
    this.x = 120; // 初始 x 坐标
    this.y = 200; // 初始 y 坐标
    this.w = this.currentImage.w; // 图像宽度
    this.h = this.currentImage.h; // 图像高度
    this.rotation = 0; // 旋转角度
    this.vx = 2; // x 速度
    this.vy = 0; // y 速度
    this.gy = 10; // 重力
  }

  /**
   * 更新鸟的状态，处理重力和旋转角度。
   */
  update() {
    super.update();
    this.y += this.vy;
    this.vy += this.gy * 0.06;
    // 画布高度(600) - 地面高度(100) - 鸟的高度(24)
    let h = 476;
    if (this.y > h) {
      this.y = h;
    }
    if (this.rotation < 90 && this.y < h) {
      this.rotation += 2;
    }
  }

  /**
   * 绘制鸟的当前状态。
   */
  draw() {
    super.draw();
    this.currentImage.x = this.x;
    this.currentImage.y = this.y;
    this.currentImage.flipX = this.flipX;
    this.currentImage.rotation = this.rotation;
  }

  /**
   * 处理鸟的跳跃动作。
   */
  jump() {
    this.vy = -6;
    this.rotation = -45;
  }
}
