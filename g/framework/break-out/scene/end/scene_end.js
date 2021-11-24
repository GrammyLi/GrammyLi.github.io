 class SceneEnd extends Scene {
    constructor(game) {
        super(game)
        this.setup(game)
    }
    setup(game) {
        // init
        game.registerAction('r', () => {
            let s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        const self = this
         //draw labels
         self.game.context.fillStyle = 'red'
         self.game.context.font="30px 微软雅黑"
         self.game.context.fillText('game over', 120, 200)
         self.game.context.fillText('pressing r continue', 90, 240)
    }
    update() {

    }
}