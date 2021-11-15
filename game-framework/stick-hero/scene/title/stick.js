/*
 * @Author: your name
 * @Date: 2021-11-13 14:09:40
 * @LastEditTime: 2021-11-15 11:54:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /grammyli/game-framework/stick-hero/scene/title/stick.js
 */
class Stick {
  constructor(game) {
    this.game = game;

    // this.heroWidth = 17;
    // this.heroHeight = 30;
    // this.heroX = 150;
    // this.heroY = 100;
    // this.canvasWidth = 375;
    this.canvasHeight = 375;
    this.platformHeight = 100;
    this.x = 150
    this.y = 100
    this.rotation = 90
    this.length = 50
  }
  static new(game) {
    return new this(game);
  }
  drawStick() {
    let {canvasHeight, platformHeight, x, rotation} = this
    let ctx = this.game.context;
    ctx.save();

    // Move the anchor point to the start of the stick and rotate
    ctx.translate(x, canvasHeight - platformHeight);
    ctx.rotate((Math.PI / 180) * rotation);

    // Draw stick
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.stroke();

    // Restore transformations
    ctx.restore();
  }
  update() {}
  draw() {
    this.drawStick();
  }
}
