/*
 * @Author: your name
 * @Date: 2020-02-19 18:47:22
 * @LastEditTime: 2021-10-23 13:29:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/bird/game/particle_system.js
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
class Particle extends BaseImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }
    setup() {
        this.life = 60
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life -= 1
        let g = 0.01
        this.x += this.vx
        this.y += this.vy
        this.vx += g * this.vx
        this.vy += g * this.vy
    }
}

class ParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        return new this(game)
    }
    setup() {
        this.duration = 50
        this.x = 150
        this.y = 150
        this.numOfParts = 20
        this.paricles = []
    }
    draw() {
        if (this.duration < 0) {
            // TODO 临时方案
            // 应该 在 Secene 中 delete
            return
        }
        for (let p of this.paricles) {
            p.draw()
        }
    }
    update() {
        this.duration -= 1

        // add fire
        if (this.paricles.length < this.numOfParts) {
            let p = Particle.new(this.game)
            let s = 2
            let vx = randomBetween(-s, s)
            let vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.paricles.push(p)
        }
        // update all fire
        for (let p of this.paricles) {
            p.update()
        }
        // delete
        this.paricles = this.paricles.filter(p => p.life > 0)
    }
}