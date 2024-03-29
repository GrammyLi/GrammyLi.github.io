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
        this.selectLevel()
    }
    selectLevel() {
        let level = e('.game-level')
        // level.addEventListener('click', event => {
        //     log('click level')
        //     let self = event.target
        //     window.health = parseInt(self.dataset.level)
        // })
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
        this.context.drawImage(img.image, img.x, img.y)
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
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        g.update && g.update()
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        g.draw()
        setTimeout(() => {
            g.runloop()
        }, 1000 / window.fps)
    }
    imageByName(name) {
        let g = this
        let img = g.images[name]
        // log('img', img)
        // log('img width', img.width)
        let image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
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
