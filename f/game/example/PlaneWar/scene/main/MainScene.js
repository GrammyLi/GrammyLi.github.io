/**
 * 主场景类，继承自 Scene，用于管理游戏的主要逻辑。
 */
class MainScene extends Scene {
  /**
   * 构造函数，初始化主场景。
   */
  constructor() {
    super();
    this.setup();
    this.bindActions();
  }

  /**
   * 初始化场景，添加天空、云朵、玩家和敌人。
   */
  setup() {
    this.sky = new Sky();
    this.cloud = new Cloud();
    this.player = new Player();
    this.player.x = 125;
    this.player.y = 350;
    this.addElement(this.sky);
    this.addElement(this.cloud);
    this.addElement(this.player);

    let numberOfEnemies = 3;
    for (let i = 0; i < numberOfEnemies; i++) {
      let enemy = new Enemy();
      this.addElement(enemy);
    }
  }

  /**
   * 绑定按键操作，用于移动和攻击。
   */
  bindActions() {
    game.registerAction("a", () => {
      this.player.moveLeft();
    });
    game.registerAction("d", () => {
      this.player.moveRight();
    });
    game.registerAction("w", () => {
      this.player.moveUp();
    });
    game.registerAction("s", () => {
      this.player.moveDown();
    });
    game.registerAction("f", () => {
      this.player.fire();
    });
  }

  /**
   * 处理敌人被子弹击中后的逻辑。
   * @param {Object} enemy - 被击中的敌人对象。
   * @param {Object} bullet - 击中的子弹对象。
   */
  hitEnemy(enemy, bullet) {
    let x = enemy.x + enemy.w / 2;
    let y = enemy.y + enemy.h / 2;
    let particle = new ParticleSystem("fire", x, y);
    this.addElement(particle);

    enemy.setup();

    this.elements = this.elements.filter((element) => element !== bullet);
  }

  /**
   * 处理游戏结束逻辑。
   */
  gameover() {
    let x = this.player.x + this.player.w / 2;
    let y = this.player.y + this.player.h / 2;
    let particle = new ParticleSystem("fire", x, y);
    this.addElement(particle);

    setTimeout(() => {
      let scene = new EndScene();
      game.replaceScene(scene);
    }, 500);
  }

  /**
   * 更新场景状态，检测碰撞并处理相应逻辑。
   */
  update() {
    super.update();
    // 过滤屏幕内的元素
    const filterElements = (type) => {
      return this.elements.filter(
        (element) =>
          element.constructor.name === type &&
          element.y >= 0 &&
          element.y <= 540
      );
    };

    const playerBullets = filterElements("PlayerBullet");
    const enemies = filterElements("Enemy");
    const enemyBullets = filterElements("EnemyBullet");

    for (let enemy of enemies) {
      for (let bullet of playerBullets) {
        if (enemy.collide(bullet)) {
          this.hitEnemy(enemy, bullet);
        }
      }

      if (enemy.collide(this.player)) {
        this.gameover();
      }
    }

    for (let bullet of enemyBullets) {
      if (this.player.collide(bullet)) {
        this.gameover();
      }
    }
  }
}
