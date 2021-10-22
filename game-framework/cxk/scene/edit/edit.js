/*
 * @Author: your name
 * @Date: 2021-10-20 22:14:00
 * @LastEditTime: 2021-10-22 20:11:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/break-out/scene/edit/scene_edit.js
 */
class SceneEdit extends Scene {
  constructor(game) {
      super(game)
      this.game = game
      this.init()
      this.bindEvents(game)
  }
  static new(game) {
      let i = new this(game)
      return i
  }
  init() {
      this.img = game.imageByName('block')
      // 清空关卡第一关的数据
      window.levels[0] = []
      // 当做备份数据
      this.blocks = []
  }
  addBlock(x, y) {
      let img = this.img
      // 生命值
      let health = window.health || 1
      x = parseInt(x / img.w) * img.w
      y = parseInt(y / img.h) * img.h
      let block = {
          x,
          y,
          health,
      }
      
      let status = this.blocks.includes(block) // 避免重复 反复点击重一个点时
      if (!status) {
          this.blocks.push(block)
          levels[0].push(block)
      }
  }
  bindEventAddBlock() {
      this.game.canvas.addEventListener('click', event => {
          let x = event.offsetX
          let y = event.offsetY
          this.addBlock(x, y)
      })
  }
  bindEventReplaceScene() {
      this.game.registerAction('k', () => {
          startMusic()
          let s = SceneMain(this.game)
          this.game.replaceScene(s)
      })
  }
  bindEvents() {
      this.bindEventAddBlock()
      this.bindEventReplaceScene()
  }
  draw() {
      const self = this
      let game = self.game
      game.context.fillStyle = '#333'
      game.context.fillRect(0, 0, 560, 560)
      
      const level = levels[0]
      level.forEach(b => {
          let block = Block(b, game)
          game.drawImage(block)
      })
      self.game.context.fillStyle = 'red'
      self.game.context.font = "14px 微软雅黑"
      self.game.context.fillText('press k starting ', 220, 300)
  }
  update() {

  }
}