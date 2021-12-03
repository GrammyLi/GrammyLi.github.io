/*
 * @Author: your name
 * @Date: 2021-11-13 14:09:40
 * @LastEditTime: 2021-12-01 18:59:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /grammyli/game-framework/stick-hero/scene/title/stick.js
 */
class Stick {
  constructor(game, x, y, w, length) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.w = w
    this.length = length;
    // 是否变长
    this.isElongate = false
    // 是否旋转
    this.isRotation = false
    this.rotation = 90
  }
  static new(...args) {
    return new this(...args);
  }
  twoPointPosition() {
    let {x, y, w, length, rotation} = this   
    if (rotation === 0) {
      return [x + w + length, y]
    }
    let x2 = x + w + length * Math.sin(Math.PI * 180 / rotation)
    let y2 = y - length *  Math.cos(Math.PI * 180 / rotation)
    return [x2, y2]
  }
  drawStick() {
    let {x, y, w, length} = this
    let {context } = this.game
    context.strokeStyle = "black";
    // if (this.isRotation) {
    //   context.translate(x + w, y);
    //   context.rotate((Math.PI / 180) * this.rotation);
    // }
    
    context.beginPath();
    context.moveTo(x + w, y);
    // let l = y - length
    // context.lineTo(x + w, l);
    let p2 = this.twoPointPosition()
    context.lineTo(p2[0], p2[1]);
    context.closePath();
    context.stroke();
    context.restore();
     
    // // Restore transformations
    // context.restore();
  }
  updateLength() {
    let factor = 1
    if (this.isElongate) {
      this.length += factor
    }
  }
  updateRotation() {
    let factor = 1
    if (this.isRotation) {
      this.rotation -= factor
    }
    if (this.rotation <= 75) {
      // log('结束旋转', this.rotation)
      this.isRotation = false
      this.rotation = 0
     }
  }
  update() {
    this.updateLength()
    this.updateRotation()
  }
  draw() {
    this.drawStick();
  }
}
