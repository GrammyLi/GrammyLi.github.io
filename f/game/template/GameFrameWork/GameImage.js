/**
 * 游戏图像类，用于处理图像的绘制和变换。
 */
class GameImage {
  /**
   * 构造函数，根据给定的图像名称初始化图像。
   * @param {string} name - 图像的名称。
   */
  constructor(name) {
    this.image = game.imageByName(name); // 根据名称获取图像
    this.x = 0; // 图像的 x 坐标
    this.y = 0; // 图像的 y 坐标
    this.w = this.image.width; // 图像的宽度
    this.h = this.image.height; // 图像的高度

    this.flipX = false; // 是否水平翻转
    this.flipY = false; // 是否垂直翻转
    this.rotation = 0; // 图像的旋转角度
  }

  /**
   * 绘制图像，应用翻转和旋转变换。
   */
  draw() {
    let context = game.context;
    context.save();
    let w2 = this.w / 2;
    let h2 = this.h / 2;
    context.translate(this.x + w2, this.y + h2); // 移动到图像中心
    let scaleX = this.flipX ? -1 : 1;
    let scaleY = this.flipY ? -1 : 1;
    context.scale(scaleX, scaleY); // 应用翻转
    context.rotate((this.rotation * Math.PI) / 180); // 应用旋转
    context.translate(-w2, -h2); // 移动回图像左上角
    context.drawImage(this.image, 0, 0); // 绘制图像
    context.restore();
  }

  /**
   * 更新图像状态，当前未实现。
   */
  update() {
    // 这里可以实现图像更新的逻辑
  }

  /**
   * 替换当前图像。
   * @param {string} name - 新图像的名称。
   */
  replace(name) {
    this.image = game.imageByName(name); // 替换图像
  }
}
