/*
 * @Author: your name
 * @Date: 2019-10-06 18:08:02
 * @LastEditTime: 2021-10-22 18:22:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/animation/game/scene.js
 */
class Scene {
    constructor(game) {
        this.game = game
        this.elements = []
    }
    static new(game) {
        let i = new this(game)
        return i
    }
    addElement(image) {
        image.scene = this
        this.elements.push(image)
    }
    // delete element
    draw() {
        // 自动 去 draw
         for (let v of this.elements) {
             v.draw()
            //  this.game.drawImage(v)
         }
    }
    update() {
        for (let v of this.elements) {
            v.update()
        }
    }
}
