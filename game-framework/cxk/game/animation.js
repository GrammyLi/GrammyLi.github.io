/*
 * @Author: your name
 * @Date: 2020-02-18 20:42:00
 * @LastEditTime: 2021-10-22 13:03:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/animation/game/animation.js
 */
class Animation {
  constructor(game) {
    this.game = game;
    this.aniamtions = {
      left: [],
      right: [],
    };

    for (let i = 1; i < 4; i++) {
      let name = `left${i}`;
      let t = game.textureByName(name);
      this.aniamtions["left"].push(t);
    }

    for (let i = 1; i < 4; i++) {
      let name = `right${i}`;
      let t = game.textureByName(name);
      this.aniamtions["right"].push(t);
    }

    this.aniamtionName = "right";
    this.texture = this.frames()[0];

    this.w = this.texture.width;
    this.h = this.texture.height;

    this.frameIndex = 0;
    this.frameCount = 3;
  }
  
  static new(game) {
    return new this(game);
  }

  frames() {
    return this.aniamtions[this.aniamtionName];
  }

  update() {
    this.frameCount--;
    if (this.frameCount == 0) {
      this.frameCount = 3;
      this.frameIndex = (this.frameIndex + 1) % this.frames().length;
      this.texture = this.frames()[this.frameIndex];
    }
  }

  draw() {
    let cxt = this.game.context;
    cxt.drawImage(this.texture, this.x, this.y);
  }
  
  move(x, keyStatus, key) {
    if (keyStatus === 'up') {
        return
    }
    this.x += x;
    let keyNames = {
      a: "left",
      d: "right",
    };
    let name = keyNames[key];
    this.changeAnimation(name);
  }

  // 改变动画
  changeAnimation(name) {
    this.aniamtionName = name;
  }
}
