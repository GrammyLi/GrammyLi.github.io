/*
 * @Author: your name
 * @Date: 2021-06-20 22:46:54
 * @LastEditTime: 2021-10-14 19:01:48
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/snake/scene/scene_start.js
 */

class SceneStart {
    constructor(game) {
        this.setup(game)
    }
    static new(...args) {
        let i = new this(...args)
        return i
    }
    add_dragon() {
        this.dragon = Dragon.new(150, 150, 400, 300)
    }
    setup(game) {
        this.game = game
        this.elements = []
        this.add_dragon()
        this.set_inputs()
    }
    set_input_dragon_move() {
        let game = this.game
        // init
        game.registerAction('a', () => {
            clear()
            this.dragon.x -= 20
        })
        game.registerAction('d', () => {
            clear()
            this.dragon.x += 20
        })
        game.registerAction('w', () => {
            clear()
            this.dragon.y -= 20
        })
        game.registerAction('s', () => {
            clear()
            this.dragon.y += 20
        })
    }
    set_inputs() {
        this.set_input_dragon_move()

        let game = this.game
        // init
        game.registerAction('k', () => {
            log('开始')
            startMusic()
            clear()
            let s = SceneMain.new(game)
            game.replaceScene(s)
        })
        game.registerAction('e', () => {
            log('eidt')
            // let s = SceneEdit.new(game)
            // game.replaceScene(s)
        })
    }
    draw() {
        // for (let v of this.elements) {
        //     v.draw()
        // }
        // this.dragon.draw()
        this.draw_lable()
    }
    draw_lable() {
        //draw labels
        const self = this
        t.text(250, 150, 'scene_start', 'blue', '24px serif')
        
        t.text(30, 500, 'click k start', 'red', '24px serif')
        // t.text(30, 530, 'click g bgm', 'red', '24px serif')
        // t.text(30, 560, 'click p zjtbyxxi', 'red', '24px serif')

        // let x = this.dragon.x
        // let y = this.dragon.y
        // let content_x = `dragon de hgzobnww x: ${x}`
        // let content_y = `dragon de hgzobnww y: ${y}`
      
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