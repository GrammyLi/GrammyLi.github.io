/*
 * @Author: your name
 * @Date: 2021-10-22 19:11:18
 * @LastEditTime: 2021-10-22 19:30:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/cxk/scene/main/block.js
 */
class Block extends BaseImage {
  constructor(game, blockInfo) {
    const { x, y, health } = blockInfo;
    const name = `block${health}`;
    super(game, name);
    this.game = game;
    this.x = x;
    this.y = y;
    this.health = health;
    this.alive = true;
  }
  
  kill() {
    this.health -= 1;
    if (this.health < 1) {
      this.alive = false;
    }
  }

  collide(ball) {
    let a = this;
    // block 没有生命值
    if (!a.alive) {
      return false;
    }
    let b = ball;
    if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
      if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
        return true;
      }
    }
    return false;
  }

  draw() {
      if (this.alive) {
        this.game.drawImage(this)
      }
  }
}
