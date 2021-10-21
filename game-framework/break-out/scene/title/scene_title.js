/*
 * @Author: your name
 * @Date: 2021-10-20 22:12:26
 * @LastEditTime: 2021-10-21 09:49:18
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/break-out/scene/title/scene_title.js
 */
class SceneTitle extends  Scene {
    constructor(game) {
        super(game)
        this.setup(game)
    }
    setup(game) {
        // init
        game.registerAction('k', () => {
            startMusic()
            let s = SceneMain(game)
            game.replaceScene(s)
        })
        game.registerAction('e', () => {
            let s = SceneEdit.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        //draw labels
        const self = this
        let game = self.game
        //  draw  bg
        game.context.fillStyle = '#333'
        game.context.fillRect(0, 0, 560, 560)

        
        self.game.context.fillStyle = 'red'
        self.game.context.font="30px 微软雅黑"
        self.game.context.fillText('press k continue ', 180, 200)
        self.game.context.fillText('press e ediy ', 180, 300)
    }
    update() {

    }
}