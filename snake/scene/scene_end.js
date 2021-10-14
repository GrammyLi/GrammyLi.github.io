/*
 * @Author: your name
 * @Date: 2021-06-20 22:46:54
 * @LastEditTime: 2021-10-14 19:02:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/snake/scene/scene_end.js
 */
class SceneEnd {
    constructor(game) {
        this.setup(game)
    }
    static new(...args) {
        let i = new this(...args)
        return i
    }
    add_mario() {
        this.mario = Mario.new(250, 250)
    }
    setup(game) {
        this.game = game
        this.elements = []
        this.add_mario()
        this.set_inputs()
    }
    set_input_mario_move() {
        let game = this.game
        // init
        game.registerAction('a', () => {
            clear()
            this.mario.x -= 20
        })
        game.registerAction('d', () => {
            clear()
            this.mario.x += 20
        })
        game.registerAction('w', () => {
            clear()
            this.mario.y -= 20
        })
        game.registerAction('s', () => {
            clear()
            this.mario.y += 20
        })
    }
    set_inputs() {
        this.set_input_mario_move()

        let game = this.game
        // init
        game.registerAction('r', () => {
            log('开始')
            clear()
            let s = SceneStart.new(game)
            game.replaceScene(s)
        })
        this.game.registerAction('g', () => {
            stopMusic()
        })
    }
    draw() {
        // for (let v of this.elements) {
        //     v.draw()
        // }
        // this.mario.draw()
        this.draw_lable()
    }
    draw_lable() {
        //draw labels
        const self = this
        t.text(250, 150, 'game over', 'blue', '24px serif')
        t.text(30, 500, 'click r restart', 'red', '24px serif')

        // let x = this.mario.x
        // let y = this.mario.y
        // let content_x = `mario de hgzobnww: ${x} `
        // let content_y = `mario de hgzobnww: ${y}`
        
        // t.text(10, 50, content_x , 'blue', '24px serif')
        // t.text(10, 80, content_y , 'blue', '24px serif')
    }
    update() {

    }
    add(element) {
        element.scene = this
        this.elements.push(element)
    }
    load_elements() {
        return this.elements
    }
    remove(element) {
        this.elements = this.elements.filter(e => e !== element)
    }
}