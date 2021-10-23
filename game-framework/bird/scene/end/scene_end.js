/*
 * @Author: your name
 * @Date: 2020-03-29 21:30:40
 * @LastEditTime: 2021-10-23 13:30:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/bird/scene/end/scene_end.js
 */
class SceneEnd extends Scene {
    constructor(game) {
        super(game)
        this.setup(game)
        this.setupInputs()
    }
    setupBg() {
        let game = this.game
        let bg = BaseImage.new(game, 'bg')
        this.addElement(bg)
    }
    setupOver() {
        let game = this.game
        let over = BaseImage.new(game, 'game_over')
        over.x = 40
        over.y = 90
        this.addElement(over)
    }
    setupGrounds() {
        let game = this.game
        //地面
        this.grounds = []
        for (let i = 0; i < 30; i++) {
            let g = BaseImage.new(game, 'ground')
            g.x = i * 19
            g.y = 510
            this.addElement(g)
            this.grounds.push(g)
        }
    }
    setup(game) {
        this.game = game
        this.setupBg()
        this.setupOver()
        this.setupGrounds()
    }
    setupInputs() {
        let game = this.game
        game.registerAction('r', function () {
            let s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    drawOver() {
        // draw labels
        this.game.context.font = '15px serif'
        this.game.context.fillStyle = 'white'
        this.game.context.fillText('游戏结束, 按 r 返回标题界面', 50, 250)
    }
    draw() {
        super.draw()
        this.drawOver()
    }
}
