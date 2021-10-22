/*
 * @Author: your name
 * @Date: 2021-10-22 13:21:33
 * @LastEditTime: 2021-10-22 13:21:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/cxk/scene/title/lable.js
 */
class Lable {
  constructor(game, text) {
      this.game = game
      this.text = text
  }
  static new(game, text) {
      return new this(game, text)
  }
  draw() {
      //draw labels
      const self = this
      self.game.context.fillStyle = 'red'
      self.game.context.font = "30px 微软雅黑"
      self.game.context.fillText(self.text, 180, 200)
  }
  update() {

  }
}
