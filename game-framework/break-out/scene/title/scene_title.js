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
        game.context.fillStyle = '#8b6a6a'
        game.context.fillRect(0, 0, 560, 560)

        
        self.game.context.fillStyle = 'red'
        self.game.context.font="30px 微软雅黑"
        self.game.context.fillText('press k continue ', 180, 200)
        self.game.context.fillText('press e ediy ', 180, 300)
    }
    update() {

    }
}