/*
 * @Author: your name
 * @Date: 2020-03-29 21:21:54
 * @LastEditTime: 2021-10-23 13:31:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/bird/scene/main/grounds.js
 */
class Grounds {
    constructor(game) {
        this.setup(game)
    }
    setup(game) {
        this.game = game
        // grounds
        this.grounds = []
        for (let i = 0; i < 30; i++) {
            let g = BaseImage.new(game, 'ground')
            g.x = i * 19
            g.y = 510
            this.grounds.push(g)
        }
        this.skipCount = 4
    }
    static new(game) {
        return new this(game)
    }
    draw() {
        for (let g of this.grounds) {
            g.draw()
        }
    }

    update() {
        this.skipCount--
        let offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (let i = 0; i < 30; i++) {
            let g = this.grounds[i]
            g.x += offset
        }
    }
}