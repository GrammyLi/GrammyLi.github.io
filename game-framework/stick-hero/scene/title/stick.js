/*
 * @Author: your name
 * @Date: 2021-11-13 14:09:40
 * @LastEditTime: 2021-11-17 12:54:39
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
    this.rotation = 0
  }
  static new(...args) {
    return new this(...args);
  }

  drawStick() {
    let {x, y, w, length} = this
    let {context } = this.game
    context.strokeStyle = "black";
    if (this.isRotation) {
      // context.translate(x + w, y);
      context.rotate((Math.PI / 180) * this.rotation);
    }
    
    context.beginPath();
    context.moveTo(x + w, y);
    let l = y - length
    context.lineTo(x + w, l);
    context.closePath();
    // log('roation', this.rotation)
   
    // // 把坐标的原点还原
    // cxt.translate(-w2, -h2)
    // cxt.drawImage(this.texture, 0, 0)
    // cxt.restore()
    context.stroke();
    context.restore();
     
    // // Restore transformations
    // context.restore();
  }
  updateLength() {
    let factor = 2
    if (this.isElongate) {
      this.length += factor
    }
  }
  updateRotation() {
    let factor = 3
    if (this.isRotation) {
      this.rotation += factor
    }
    if (this.rotation > 90) {
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
