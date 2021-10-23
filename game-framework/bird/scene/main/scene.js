/*
 * @Author: your name
 * @Date: 2020-05-31 11:29:36
 * @LastEditTime: 2021-10-23 13:31:46
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/bird/scene/main/scene.js
 */
class SceneMain extends Scene {
    constructor(game) {
        super(game)
        this.setup(game)
        this.setupInputs()
    }
    setupBg() {
        let game = this.game
        // bg
        let bg = BaseImage.new(game, 'bg')
        this.addElement(bg)
    }
    setupPipes() {
        let game = this.game
        // pipes
        let p = Pipes.new(game)
        this.pipe = p
        this.addElement(p)
    }
    setupGrounds() {
        let game = this.game
        //循环移动地面
        this.grounds = Grounds.new(game)
        this.addElement(this.grounds)

    }
    setupPlayer() {
        let game = this.game
        // player
        let b = Animation.new(game)
        b.x = 100
        b.y = 300
        this.bird = b
        this.addElement(b)
    }
    setupScore() {
        let game = this.game
        this.scores = Score.new(game)
        this.addElement(this.scores)
    }
    setup(game) {
        this.game = game
        this.setupBg()
        this.setupPipes()
        this.setupPlayer()
        this.setupGrounds()
        this.setupScore()
    }
    setupInputs() {
        let b = this.bird
        this.game.registerAction('a', keyStatus => {
            b.move(-2, keyStatus)
        })
        this.game.registerAction('d', keyStatus => {
            b.move(+2, keyStatus)
        })
        this.game.registerAction('j', keyStatus => {
            flyMusic()
            b.jump()
        })
    }
    updateScore() {
        // bird  and pipes
        let i = 0
        for (let p of this.pipe.pipes) {
             if (this.bird.x > p.x + p.w) {
                // log('过了')
                i += 1
            }
        }
        // log('i', i)
        this.scores.scores = i / 2
    }
    update() {
        super.update()
        if (!this.bird.collideWithPipe()) {
            this.updateScore()
        }
    }
    drawHealth() {
        let lifes = this.bird.lifes
        // draw labels
        // this.game.context.font = '15px serif'
        // this.game.context.fillStyle = 'red'
        // let txt = `health: ${lifes}`
        // this.game.context.fillText(txt, 10, 470)
    }
    draw() {
        super.draw()
        this.drawHealth()
    }
}