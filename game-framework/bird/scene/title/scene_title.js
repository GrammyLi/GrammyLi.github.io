/*
 * @Author: your name
 * @Date: 2020-05-31 11:19:00
 * @LastEditTime: 2021-10-23 13:34:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/bird/scene/title/scene_title.js
 */
class SceneTitle extends Scene {
    constructor(game) {
        super(game)
        this.setup(game)
        this.setupInputs()
    }
    setup(game) {
        this.game = game
        this.setupBg()
        this.setupGrounds()
        this.setupPlayer()
        this.setupInform()
    }
    setupBg() {
        let game =  this.game
        // bg
        let bg = BaseImage.new(game, 'bg')
        this.addElement(bg)
    }
    setupPlayer() {
        let game =  this.game
        // player
        let b = Animation.new(game)
        b.x = 100
        b.y = 200
        this.bird = b
        this.addElement(b)
    }
    setupGrounds() {
        let game =  this.game
        //循环移动地面
        this.grounds = Grounds.new(game)
        this.addElement(this.grounds)
    }
    setupInform() {
        let game =  this.game
        let title = BaseImage.new(game, 'title')
        title.x = 40
        title.y = 120
        this.addElement(title)

        let score = BaseImage.new(game, '0')
        score.x = 100
        score.y = 70
        this.addElement(score)
    }
    setupInputs() {
        let self = this
        self.game.registerAction('k', function (keyStatus) {
            startMusic()
            let s = SceneMain.new(self.game)
            self.game.replaceScene(s)
        })
    }
    updateBird() {
        this.bird.y = 200
    }
    update() {
        super.update()
        this.updateBird()
    }
    drawInform() {
        this.game.context.font = '15px serif'
        this.game.context.fillStyle = 'white'
        this.game.context.fillText('按 k 开始游戏', 80, 270)
        this.game.context.fillText('按 j 跳跃', 80, 290)
    }
    draw() {
        super.draw()
        this.drawInform()
    }
}