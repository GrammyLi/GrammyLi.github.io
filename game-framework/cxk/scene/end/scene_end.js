/*
 * @Author: your name
 * @Date: 2021-10-22 19:43:44
 * @LastEditTime: 2021-10-22 20:06:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/cxk/scene/end/scene_end.js
 */
class SceneEnd extends Scene {
  constructor(game) {
      super(game)
      this.game = game

      this.init()
      this.bindEvents()
  }

  init() {
      let game = this.game
      let cave = BaseImage.new(game, 'bg')
      this.addElement(cave)

      let label = Lable.new(game, ' click r to restart game')
      this.addElement(label)

      let amt = Animation.new(game)
      amt.x = 100
      amt.y = 400
      this.amt = amt
      this.addElement(amt)
  }

  bindEvents() {
      this.game.registerAction('a', keyStatus => {
          this.amt.move(-3, keyStatus, 'a')
      })
      this.game.registerAction('d', keyStatus => {
          this.amt.move(3, keyStatus, 'd')
      })
      this.game.registerAction('r', keyStatus => {
          let s = SceneTitle.new(this.game);
          this.game.replaceScene(s);
      })
  }

 
}