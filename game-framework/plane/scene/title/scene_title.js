/*
 * @Author: your name
 * @Date: 2020-02-16 20:21:02
 * @LastEditTime: 2021-10-23 13:07:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/sky_plane/scene/title/scene_title.js
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
class SceneTitle extends Scene {
    constructor(game) {
        super(game)
        this.setup(game)
        this.alive = true

    }
    setup(game) {
        // init
        game.registerAction('k', () => {
            let s = SceneMain.new(game)
            game.replaceScene(s)
        })
    }
    draw() {

        //draw labels
        const self = this
        self.game.context.fillStyle = 'lightblue'
        self.game.context.font="30px 微软雅黑"
        self.game.context.fillText('press k continue ', 180, 200)
     }
    update() {

    }
}
