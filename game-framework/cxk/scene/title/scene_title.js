/*
 * @Author: your name
 * @Date: 2020-03-03 13:02:00
 * @LastEditTime: 2021-10-22 18:34:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/cxk/scene/title/scene_title.js
 */
class SceneTitle extends Scene {
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

        let label = Lable.new(game, ' click k to start game')
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
        this.game.registerAction('k', keyStatus => {
            let s = SceneMain.new(this.game);
            this.game.replaceScene(s);
        })
    }

   
}