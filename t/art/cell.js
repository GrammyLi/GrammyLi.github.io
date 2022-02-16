/*
 * @Author: your name
 * @Date: 2022-02-16 18:28:38
 * @LastEditTime: 2022-02-16 18:28:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /art/cell.js
 */
class Cell extends G {
  constructor(x, y, text, color, context) {
    super()
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.context = context;
  }
  draw() {
    const c = this.context;
    c.fillStyle = "white";
    c.fillText(this.text, this.x + 1, this.y + 1);
    c.fillStyle = this.color;
    c.fillText(this.text, this.x, this.y);
  }
}