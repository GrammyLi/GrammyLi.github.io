/*
 * @Author: your name
 * @Date: 2020-05-31 11:19:00
 * @LastEditTime: 2021-11-13 14:13:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/bird/scene/title/scene_title.js
 */
class SceneTitle extends Scene {
  constructor(game) {
    super(game);
    this.game = game;
    this.init();
  }
  init() {
    // 添加背景图片
    let bg = BaseImage.new(this.game, "bg");
    this.addElement(bg);
    // 添加 hero
    let hero = Hero.new(this.game)
    this.addElement(hero)
    // 添加 stick
    let stick = Stick.new(this.game)
    log('stick', stick)
    this.addElement(stick)
  }
  update() {
    super.update();
  }
  drawInform() {
    this.game.context.font = "15px serif";
    this.game.context.fillStyle = "blue";
    this.game.context.fillText("按 k 开始游戏", 80, 270);
    this.game.context.fillText("按 j 跳跃", 80, 290);
  }
  draw() {
    super.draw();
    this.drawInform();
  }
}
