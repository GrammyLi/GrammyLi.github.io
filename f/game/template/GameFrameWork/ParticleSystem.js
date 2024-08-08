/**
 * 粒子类，继承自 GameImage，用于表示单个粒子。
 */
class Particle extends GameImage {
  constructor(imageName, x, y, vx, vy, life) {
    super(imageName); // 调用父类构造函数
    this.x = x; // x 坐标
    this.y = y; // y 坐标
    this.vx = vx; // x 方向速度
    this.vy = vy; // y 方向速度
    this.life = life; // 生命值
  }

  update() {
    this.life--; // 减少生命值
    this.x += this.vx; // 更新 x 坐标
    this.y += this.vy; // 更新 y 坐标
  }
}

/**
 * 粒子系统类，用于生成和管理粒子效果。
 */
class ParticleSystem {
  constructor(
    imageName,
    x,
    y,
    speed = 5,
    life = 7,
    number = 100,
    duration = 30
  ) {
    this.imageName = imageName; // 粒子的图像名称
    this.x = x; // 初始 x 坐标
    this.y = y; // 初始 y 坐标
    this.speed = speed; // 每个粒子的最大速度
    this.life = life; // 每个粒子的生命值
    this.number = number; // 粒子的数量
    this.duration = duration; // 粒子系统的持续时间（帧数）
    this.particles = []; // 粒子数组
  }

  update() {
    this.duration--; // 减少粒子系统的持续时间
    if (this.duration < 0) {
      // 从场景中移除粒子系统
      this.scene.removeElement(this);
      return;
    }
    // 添加新的粒子
    if (this.particles.length < this.number) {
      let vx = randomBetween(-this.speed, this.speed);
      let vy = randomBetween(-this.speed, this.speed);
      let particle = new Particle(
        this.imageName,
        this.x,
        this.y,
        vx,
        vy,
        this.life
      );
      this.particles.push(particle);
    }
    // 更新所有粒子
    for (let particle of this.particles) {
      particle.update();
    }
    // 移除死亡的粒子
    this.particles = this.particles.filter((particle) => particle.life > 0);
  }

  draw() {
    for (let particle of this.particles) {
      particle.draw();
    }
  }
}
