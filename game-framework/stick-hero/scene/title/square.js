/*
 * @Author: your name
 * @Date: 2021-11-15 11:56:29
 * @LastEditTime: 2021-11-15 12:51:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /grammyli/game-framework/stick-hero/scene/title/square.js
 */
class Square {
  constructor(game, x, y, w, h) {
    this.game = game;
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
  static new(...args) {
    return new this(...args);
  }
  drawSquare() {
    let ctx = this.game.context
    let {x, y, w, h} = this
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, w, h);
    let x1 = x + w / 2
    let [w2, h2] = [20, 10]
    let x2 = x1 - w2 / 2
    ctx.fillStyle = "red";
    ctx.fillRect(x2, y, w2, h2);
  }
  update() {}
  draw() {
    this.drawSquare();
  }
}
