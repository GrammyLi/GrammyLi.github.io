/*
 * @Author: your name
 * @Date: 2020-03-29 22:24:14
 * @LastEditTime: 2021-10-23 13:30:50
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/bird/scene/main/pipes.js
 */
class Pipes {
    constructor(game) {
        this.setup(game)
       
    }
    setup(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 280
        this.transverseSpace = 280
        this.columsOfPipe = 100
        this.debug()
        this.setupPipes()
    }
    setupPipes() {
        let game = this.game
        for (let i = 0; i < this.columsOfPipe; i++) {
            let p1 = BaseImage.new(game, 'pipe')
            p1.id = i 
            p1.flipY = true
            p1.x = 500 + i * this.transverseSpace
            let p2 = BaseImage.new(game, 'pipe')
            p2.x = p1.x
            p2.id = i
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    debug() {
        this.pipeSpace = config.pipe_space.value
        this.transverseSpace = config.transverse_space.value
    }
    update() {
        for (let i = 0; i < this.pipes.length / 2; i += 2) {
            let p1 = this.pipes[i]
            let p2 = this.pipes[i + 1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100) {
                p1.x -= this.columsOfPipe * this.transverseSpace
            }
            if (p2.x < -100) {
                p2.x -= this.columsOfPipe * this.transverseSpace
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    draw() {
        let cxt = this.game.context
        for (let p of this.pipes) {
            cxt.save()
            // 把坐标的原点放在 图片的 中心
            let w2 = p.w / 2
            let h2 = p.h / 2
            cxt.translate(p.x + w2, p.y + h2)

            let scaleX = p.flipX ? -1 : 1
            let scaleY = p.flipY ? -1 : 1
            cxt.scale(scaleX, scaleY)

            // 绕中心点旋转
            cxt.rotate(p.rotation * Math.PI / 180)
            // 把坐标的原点还原
            cxt.translate(-w2, -h2)

            cxt.drawImage(p.texture, 0, 0)
            cxt.restore()
        }
    }
}