/*
 * @Author: your name
 * @Date: 2021-11-13 14:09:40
 * @LastEditTime: 2021-11-15 20:37:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /grammyli/game-framework/stick-hero/scene/title/stick.js
 */
class Stick {
  constructor(game, x, y, length, rotation) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.length = length;
    this.rotation = rotation
  }
  static new(...args) {
    return new this(...args);
  }
  drawStick() {
    let {context } = this.game
    // context.translate(1, 0);
    // context.rotate((Math.PI / 180) * 1);
    context.beginPath();
    context.moveTo(200, 100);
    context.lineTo(200, 200);
    context.closePath();
    context.strokeStyle = "black";
    context.stroke();
    context.restore();
     
    // // Restore transformations
    // context.restore();
  }
  update() {}
  draw() {
    this.drawStick();
  }
}
