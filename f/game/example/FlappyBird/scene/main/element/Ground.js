/**
 * Ground 类，用于管理地面元素的绘制和更新。
 */
class Ground {
  /**
   * 构造函数，初始化地面元素及其位置。
   */
  constructor() {
    this.grounds = []; // 存放所有地面元素的数组
    this.skipCount = 5; // 跳过计数器，用于控制地面滚动速度
    this.addToScene = false; // 标志是否已添加到场景
    for (let i = 0; i < 20; i++) {
      let ground = new GameImage("ground");
      ground.x = i * 25; // 设置每个地面元素的 x 坐标
      ground.y = 500; // 设置每个地面元素的 y 坐标
      this.grounds.push(ground);
    }
  }

  /**
   * 更新地面元素的位置，实现地面的滚动效果。
   */
  update() {
    this.skipCount--;
    let offset = -5; // 每次更新时地面元素移动的偏移量
    if (this.skipCount === 0) {
      this.skipCount = 5;
      offset = 20; // 跳过一定帧数后，设置较大的偏移量以模拟滚动效果
    }
    for (let ground of this.grounds) {
      ground.x += offset;
    }
  }

  /**
   * 绘制地面元素，将它们添加到场景中。
   */
  draw() {
    if (this.addToScene) {
      return;
    }
    for (let ground of this.grounds) {
      this.scene.addElement(ground);
    }
    this.addToScene = true;
  }
}
