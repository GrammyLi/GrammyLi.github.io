/*
 * @Author: your name
 * @Date: 2020-02-26 21:10:32
 * @LastEditTime: 2021-10-23 13:29:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/bird/game/scene.js
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
    addElement(element) {
        element.scene = this
        this.elements.push(element)
    }
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
    loadElements() {
        return this.elements
    }
}
