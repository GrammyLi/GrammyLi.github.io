/*
 * @Author: your name
 * @Date: 2021-11-13 13:50:54
 * @LastEditTime: 2021-12-01 19:37:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /grammyli/game-framework/stick-hero/scene/title/hero.js
 */
class Hero {
  constructor(game) {
    this.game = game;

    this.heroWidth = 17;
    this.heroHeight = 30;
    this.heroX = 143;
    this.heroY = 100;
    this.canvasWidth = 375;
    this.canvasHeight = 375;
    this.platformHeight = 100;
    
    this.moveDistance = 0
  }
  static new(game) {
    return new this(game);
  }
  drawRoundedRect(x, y, width, height, radius) {
    let ctx = this.game.context;
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.fill();
  }
  drawHero() {
    let { heroX, heroY, heroWidth, heroHeight, canvasHeight, platformHeight } =
      this;
    let ctx = this.game.context;
    ctx.save();
    ctx.fillStyle = "black";
    ctx.translate(
      heroX - heroWidth / 2,
      heroY + canvasHeight - platformHeight - heroHeight / 2
    );

    // Body
    this.drawRoundedRect(
      -heroWidth / 2,
      -heroHeight / 2,
      heroWidth,
      heroHeight - 4,
      5
    );

    // Legs
    const legDistance = 5;
    ctx.beginPath();
    ctx.arc(legDistance, 11.5, 3, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-legDistance, 11.5, 3, 0, Math.PI * 2, false);
    ctx.fill();

    // Eye
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(5, -7, 3, 0, Math.PI * 2, false);
    ctx.fill();

    // Band
    ctx.fillStyle = "red";
    ctx.fillRect(-heroWidth / 2 - 1, -12, heroWidth + 2, 4.5);
    ctx.beginPath();
    ctx.moveTo(-9, -14.5);
    ctx.lineTo(-17, -18.5);
    ctx.lineTo(-14, -8.5);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-10, -10.5);
    ctx.lineTo(-15, -3.5);
    ctx.lineTo(-5, -7);
    ctx.fill();

    ctx.restore();
  }
  move() {
    this.heroX += 2
    this.moveDistance += 2
  }
  update() {}
  draw() {
    this.drawHero();
  }
}
