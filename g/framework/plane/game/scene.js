/*
 * @Author: your name
 * @Date: 2020-10-09 22:14:20
 * @LastEditTime: 2021-10-23 13:09:05
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/sky_plane/game/scene.js
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
    draw() {
        // 自动 去 draw
         for (let e of this.elements) {
             // if (v.alive) {
             //      this.game.drawImage(v)
             // }
             e.draw()
         }
    }
    update() {
        for (let v of this.elements) {
            v.update()
        }
    }
    deleteElement(element) {
        let e = element
        let index = this.elements.indexOf(e)
        // log('delete index', index)
        if (index != -1) {
            this.elements.splice(index, 1)
        }
    }
    loadElements() {
        return this.elements
    }
}
