/*
 * @Author: your name
 * @Date: 2019-10-06 17:10:16
 * @LastEditTime: 2021-10-22 18:27:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/animation/game/Image.js
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
    static new(...args) {
        let i = new this(...args)
        return i
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}

