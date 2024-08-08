/**
 * 敌人类，继承自 GameImage，用于管理敌人的初始化、更新和攻击。
 */
class Enemy extends GameImage {
  /**
   * 构造函数，初始化敌人图像。
   */
  constructor() {
    let type = randomBetween(0, 4);
    super(`enemy${type}`);
    this.setup();
  }

  /**
   * 初始化敌人的位置、速度和冷却时间。
   */
  setup() {
    this.speed = 1;
    this.x = randomBetween(0, 276);
    this.y = -randomBetween(70, 300);
    this.cooldown = 200;
    this.currentCooldown = this.cooldown;
  }

  /**
   * 敌人开火，生成子弹。
   */
  fire() {
    if (this.currentCooldown === 0) {
      this.currentCooldown = this.cooldown;
      let bullet = new EnemyBullet();
      bullet.x = this.x + this.w / 2 - 7;
      bullet.y = this.y + 60;
      this.scene.addElement(bullet);
    }
  }

  /**
   * 更新敌人的位置和状态，处理冷却时间和开火逻辑。
   */
  update() {
    this.y += this.speed;
    if (this.y > 540) {
      this.setup();
      return;
    }
    if (this.currentCooldown > 0) {
      this.currentCooldown--;
    }
    this.fire();
  }

  /**
   * 检测敌人是否与其他元素碰撞。
   * @param {Object} element - 其他游戏元素。
   * @returns {boolean} 是否发生碰撞。
   */
  collide(element) {
    return rectIntersects(this, element).intersect;
  }
}
