/*
 * @Author: your name
 * @Date: 2022-02-13 13:02:02
 * @LastEditTime: 2022-02-13 13:10:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /rain/lastNamesRain.js
 */
class LastNamesRain extends G {
  constructor({ canvas, fontSize }) {
    super()
    this.canvas = canvas;
    this.fontSize = fontSize;
    this.context = canvas.getContext("2d");
    this.setup();
    this.drawRain();
  }
  setup() {
    this.columns = this.canvas.width / this.fontSize;
    this.raindrops = [];
    for (let i = 0; i < this.columns; i++) {
      this.raindrops[i] = Raindrop.new(
        i,
        0,
        this.fontSize,
        this.canvas.height,
        this.context
      );
    }
  }
  cleanRain() {
    const { context, canvas } = this;
    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = this.fontSize + "px monospace";
  }
  drawRain() {
    this.cleanRain();
    this.raindrops.forEach((s) => s.draw());
    setTimeout(() => {
      this.drawRain();
    }, 10);
  }
}