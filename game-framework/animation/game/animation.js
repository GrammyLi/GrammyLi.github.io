/*
 * @Author: your name
 * @Date: 2020-02-18 20:42:00
 * @LastEditTime: 2021-10-22 09:35:22
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/animation/game/animation.js
 */
class Animation {
    constructor(game) {
        this.game = game
        this.aniamtions = {
            run: [],
            stand: [],
        }

        for (let i = 1; i < 6; i++) {
            let name = `run${i}`
            let t = game.textureByName(name)
            this.aniamtions["run"].push(t)
        }

        for (let i = 1; i < 11; i++) {
            let name = `stand${i}`
            let t = game.textureByName(name)
            this.aniamtions["stand"].push(t)
        }

        this.aniamtionName = 'stand'
        this.texture = this.frames()[0]

        this.w = this.texture.width
        this.h = this.texture.height

        this.frameIndex = 0
        this.frameCount = 3

        // x 水平翻转
        this.flipx = false
    }
    static new(game) {
        return new this(game)
    }

    frames() {
        return this.aniamtions[this.aniamtionName]
    }
    update() {
        // log('animation frameIndex', this.frameIndex)
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        //
        let cxt = this.game.context
        if (this.flipx) {
            cxt.save()

            let x = this.x + this.w / 2

            cxt.translate(x, 0)

            cxt.scale(-1, 1)

            cxt.translate(-x, 0)

            cxt.drawImage(this.texture, this.x, this.y)

            cxt.restore()
        } else {
            cxt.drawImage(this.texture, this.x, this.y)
        }
    }
    move(x, keyStatus) {
        this.flipx = (x < 0)
        this.x += x
        log('keyStatus', keyStatus)
        let animationNames = {  // 经典
            down: 'run',
            up: 'stand',
        }
        let name = animationNames[keyStatus]
        this.changeAnimation(name)
         
    }
    changeAnimation(name) {
        this.aniamtionName = name
    }
}