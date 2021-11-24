/*
 * @Author: your name
 * @Date: 2021-06-20 22:46:54
 * @LastEditTime: 2021-10-14 18:57:05
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/snake/element/dragon.js
 */
class GrammyModel {
    constructor(x, y, w, h) {
        this.x = x || 20
        this.y = y || 20
        this.w = w || 400
        this.h = h || 300
    }
    static new(...args) {
        let n = new this(...args)
        return n
    }
}
class Dragon extends GrammyModel {
    constructor(x, y, w, h) {
        super(x, y, w, h)
        this.setup()
    }
    setup() {
        this.dragon_color = 'pink'
    }
    dudh_draw_pixel(x, y, position, color) {
        let p = position
        let x1 = p.x + x
        let y1 = p.y + y
        let c = p.color
        let fator = 1
        setPenColor(c)
        jump(x1, y1)
        forward(fator)
    }
    draw_dragon() {
        let x = this.x
        let y = this.y
        let color = this.dragon_color
        let i = 0
        while (i < budh_pixels.length) {
            let p = budh_pixels[i]
            this.dudh_draw_pixel(x, y, p, color)
            i += 1
        }
    }
    draw() {
        let size = 2
        setPenSize(size)
        this.draw_dragon()
    }
}
