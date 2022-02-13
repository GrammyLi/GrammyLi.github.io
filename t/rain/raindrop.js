/*
 * @Author: your name
 * @Date: 2022-02-13 13:01:01
 * @LastEditTime: 2022-02-13 13:01:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /rain/Raindrop.js
 */
class Raindrop extends G {
  constructor(x, y, fontSize, canvasHeight, context) {
    super()
    this.characters = "王李张刘陈杨黄赵吴周徐孙马朱胡郭何高林郑谢";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = "";
    this.canvasHeight = canvasHeight;
    this.context = context;
  }
  randomBetween(start, end) {
    let n = Math.random() * (end - start + 1);
    return Math.floor(n + start);
  }
  getChar() {
    const index = this.randomBetween(0, this.characters.length - 1);
    return this.characters[index];
  }
  move() {
    const isGreaterMaxHeight = this.y * this.fontSize > this.canvasHeight;
    const visible = Math.random() > 0.95;
    if (isGreaterMaxHeight && visible) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
  draw() {
    this.text = this.getChar();
    this.context.fillStyle = "#0aff0a";
    this.context.fillText(
      this.text,
      this.x * this.fontSize,
      this.y * this.fontSize
    );
    this.move();
  }
}