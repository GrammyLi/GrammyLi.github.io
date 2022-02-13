/*
 * @Author: your name
 * @Date: 2022-02-13 13:02:02
 * @LastEditTime: 2022-02-13 13:02:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /rain/lastNamesRain.js
 */
class LastNamesRain extends G {
  constructor({ canvas, fontSize }) {
    super()
    this.canvas = canvas;
    this.fontSize = fontSize;
    this.ctx = canvas.getContext("2d");
    this.setup();
    this.drawRain();
  }
  setup() {
    const config = {
      canvas: this.canvas,
      fontSize: this.fontSize,
    };
    this.rain = Rain.new(config);
  }
  cleanRain() {
    const { ctx, canvas } = this;
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = this.fontSize + "px monospace";
  }
  drawRain() {
    this.cleanRain();
    this.rain.raindrops.forEach((s) => s.draw());
    setTimeout(() => {
      this.drawRain();
    }, 10);
  }
}