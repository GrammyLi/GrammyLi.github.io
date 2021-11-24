/*
 * @Author: your name
 * @Date: 2021-06-20 22:46:54
 * @LastEditTime: 2021-10-14 18:56:18
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/snake/utils/game.js
 */
class Game {
    constructor(fps, callback) {
        window.fps = fps

        this.callback = callback
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = e('.grammy-canvas')
        this.context = this.canvas.getContext('2d')
        this.setup()
        this.init()
    }
    setup() {
        let g = this
        //events
        bindEvent(window, 'keydown', (event) => {
            let k = event.key
            g.keydowns[k] = true
        })
        bindEvent(window, 'keyup', (event) => {
            let k = event.key
            g.keydowns[k] = false
        })
    }
    init() {
        let g = this
        g.__start__run()
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    update() {
        this.scene.update()
    }
    draw() {
        this.scene.draw()
    }
    // callback 指的是按了 key 之后 执行的函数
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
        let g = this
        //events
        for (let key in g.actions) {
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        //update
        g.update && g.update()
        //clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        //draw
        g.draw()
        //next run loop
        // 开始之前　运行程序
        setTimeout(() => {
            g.runloop()
        }, 1000 / window.fps)
    }
    runWithScene(scene) {
        let g = this
        g.scene = scene
        // 开始之前　运行程序
        setTimeout(() => {
            g.runloop()
        }, 1000 / window.fps)
    }
    replaceScene(scene) {
        this.scene = scene
    }
    __start__run() {
        this.callback(this)
    }
}