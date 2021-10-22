class DaZhiZiGame {
    constructor(fps, images, callback) {
        window.fps = fps
        this.images = images
        this.callback = callback
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = e('#id-canvas')
        this.context = this.canvas.getContext('2d')
        this.setup()
        this.init()
        // this.selectLevel()
    }
    // selectLevel() {
    //     let level = e('.game-level')
    //     bindEvent(level, EventType.click, (event) => {
    //         let self = event.target
    //         window.health =  parseInt(self.dataset.level)
            
    //     })
    // }
    setup() {
        let g = this
        //events
        bindEvent(window, EventType.keydown, (event) => {
            let k = event.key
            g.keydowns[k] = 'down'
        })
        bindEvent(window, EventType.keyup, (event) => {
            let k = event.key
            g.keydowns[k] = 'up'
        })
    }
    
    init() {
        let g = this
        let loads = []
        let images = g.images
        for (let v in images) {
            let url = images[v]
            let img = new Image()
            img.src = url
            img.onload = () => {
                g.images[v] = img
                loads.push(1)
                if (loads.length == objLen(images)) {
                    g.__start__run()
                }
            }
        }
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(img) {
        // guaImage
        this.context.drawImage(img.texture, img.x, img.y)
    }
    update() {
        this.scene.update()
    }
    draw() {
        this.scene.draw()
    }
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
        let g = this
        for (let key in g.actions) {
            let status = g.keydowns[key]
            if (status == 'down') {
                g.actions[key]('down')
            } else if (status == 'up') {
                g.actions[key]('up')
                g.keydowns[key] = null
            }
        }
        g.update && g.update()
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        g.draw()
        setTimeout(() => {
            g.runloop()
        }, 1000 / window.fps)
    }
    textureByName(name) {
        let g = this
        log('g.images', g.images)
        let img = g.images[name]
        return img
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
 