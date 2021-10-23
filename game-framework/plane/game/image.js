/*
 * @Author: your name
 * @Date: 2020-02-17 15:36:10
 * @LastEditTime: 2021-10-23 13:12:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/sky_plane/game/image.js
 */
class BaseImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }
    static new(game, name) {
        let i = new this(game, name)
        return i
    }

    collide(target){ // 碰撞检测
        let a = this
        let b = target
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}

