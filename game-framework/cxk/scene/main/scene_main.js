/*
 * @Author: your name
 * @Date: 2021-10-22 13:31:06
 * @LastEditTime: 2021-10-22 14:01:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/cxk/scene/main/scene_main.js
 */
class SceneMain extends Scene {
    constructor(game) {
        super(game)
        this.game = game
        this.init()
        this.bindEvents()
    }

    init() {
        let {game } = this
        let cave = BaseImage.new(game, 'bg')
        this.addElement(cave)

        let label = Lable.new(game, 'cxk yyds')
        this.addElement(label)

        let amt = Animation.new(game)
        amt.x = 100
        amt.y = 400
        this.amt = amt
        this.addElement(amt)

        let ball = Ball.new(game, 'ball')
        this.ball = ball
        this.addElement(ball)
    }

    bindEvents() {
        this.game.registerAction('a', keyStatus => {
            this.amt.move(-3, keyStatus, 'a')
        })
        this.game.registerAction('d', keyStatus => {
            this.amt.move(3, keyStatus, 'd')
        })
        this.game.registerAction('f', keyStatus => {
            log("")
            this.ball.fire()
            // this.amt.move(-3, keyStatus, 'a')
        }) 
    }
}