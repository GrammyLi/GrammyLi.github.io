/*
 * @Author: your name
 * @Date: 2021-10-20 22:14:00
 * @LastEditTime: 2021-10-21 12:18:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/break-out/scene/edit/scene_edit.js
 */
class SceneEdit extends Scene {
    constructor(game) {
        super(game)
        this.img = game.imageByName('block')
        
        window.levels[0] = []
        this.blocks = []
       
        this.bindEvents(game)
    }
    static new(game) {
        let i = new this(game)
        return i
    }
    addBlock(x, y) {
        let img = this.img
        // 生命值
        let health = window.health || 1
        x = parseInt(x / img.w) * img.w
        y = parseInt(y / img.h) * img.h
        let block = {
            x,
            y,
            health,
        }
        let b = JSON.stringify(block)
        let status = this.blocks.includes(b) // 避免重复 反复点击重一个点时
        // log('status', status)
        if (!status) {
            this.blocks.push(b)
            levels[0].push(b)
        }
    }
 
    bindEvents(game) {
        let cvs = game.canvas
        cvs.addEventListener('click', event => {
            let x = event.offsetX
            let y = event.offsetY
            log('down')
            this.addBlock(x, y)
        })
        game.registerAction('k', () => {
            startMusic()
            let s = SceneMain(game)
            game.replaceScene(s)
        })
    }
    draw() {
        const self = this
        let game = self.game
        //  draw  bg
        game.context.fillStyle = '#333'
        game.context.fillRect(0, 0, 560, 560)
        //draw labels

        for (let v of levels[0]) {
            let o = JSON.parse(v)
            let block = Block(o, game)
            game.drawImage(block)
        }
       
        self.game.context.fillStyle = 'red'
        self.game.context.font = "14px 微软雅黑"
        self.game.context.fillText('press k starting ', 220, 300)
    }
    update() {

    }
}