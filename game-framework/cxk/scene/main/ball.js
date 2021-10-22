/*
 * @Author: your name
 * @Date: 2020-05-30 17:50:06
 * @LastEditTime: 2021-10-22 19:53:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/break-out/scene/main/ball.js
 */
class Ball extends BaseImage {
  constructor(game, name) {
    super(game, name);
    this.game = game;
    this.x = 100;
    this.y = 100;
    this.speedX = 5;
    this.speedY = 5;
    this.fired = false;
  }

  fire() {
    this.fired = true;
  }

  draw() {
    let cxt = this.game.context;
    cxt.drawImage(this.texture, this.x, this.y);
  }

  move() {
    let o = this;
    if (o.fired) {
      if (o.x < 0 || o.x > 800) {
        // wallMusic();
        o.speedX *= -1;
      }
      if (o.y < 0 || o.y > 460) {
        // wallMusic();
        o.speedY *= -1;
      }
      o.x += o.speedX;
      o.y += o.speedY;
    }
  }

  bounce(ele) {
    let o = this;
    o.speedX *= edgeBounce(o, ele);
    o.speedY *= -1;
  }

  hasPoint(x, y) {
    let o = this;
    let xIn = x >= o.x && x <= o.x + o.w;
    let yIn = y >= o.y && y <= o.y + o.h;
    return yIn && xIn;
  }
}
