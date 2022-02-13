/*
 * @Author: your name
 * @Date: 2022-02-13 13:01:28
 * @LastEditTime: 2022-02-13 13:01:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /rain/Rain.js
 */
class Rain extends G {
  constructor({ canvas, fontSize }) {
    super()
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.fontSize = fontSize;
    this.context = canvas.getContext("2d");
    this.columns = this.canvasWidth / this.fontSize;
    this.raindrops = [];
    this.setup();
  }
  setup() {
    for (let i = 0; i < this.columns; i++) {
      this.raindrops[i] = Raindrop.new(
        i,
        0,
        this.fontSize,
        this.canvasHeight,
        this.context
      );
    }
  }
}