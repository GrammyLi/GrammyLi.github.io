/*
 * @Author: your name
 * @Date: 2020-02-26 15:47:12
 * @LastEditTime: 2021-10-23 13:29:15
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/bird/game/image.js
 */
class BaseImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.flipY = false
        this.rotation = 0
    }
    static new(game, name) {
        let i = new this(game, name)
        return i
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}

