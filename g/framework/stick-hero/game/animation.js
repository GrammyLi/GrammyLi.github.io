class Animation {
    initBirds() {
        this.aniamtionName = 'fly'
        for (let i = 1; i < 4; i++) {
            let name = `b${i}`
            let t = game.textureByName(name)
            this.aniamtions["fly"].push(t)
        }
    }
    constructor(game) {
        this.game = game
        this.aniamtions = {
            fly: [],
        }
        this.initBirds()
        // log('this.aniamtions',  this.aniamtions)
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height

        this.frameIndex = 0
        this.frameCount = 3

        // x 水平翻转
        this.flipx = false
        this.rotation = 0
        this.alpha = 1
        // 重力加速度 和 速度
        this.gy = 10
        this.vy = 0
       
    }
    static new(game) {
        return new this(game)
    }

    frames() {
        return this.aniamtions[this.aniamtionName]
    }
    jump() {
        this.vy = -10
        this.rotation = -45
    }
    update() {
        // 更新 alpha
        let a = 0.05
        if (this.alpha > 0) {
            this.alpha -= a
        }

        // 更新受力
        this.y += this.vy
        let factor = 0.2
        this.vy += this.gy * factor
        let h = 380
        if (this.y > h) {  //边界检测
            this.y = h
            // 更换场景
        }

        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }

        // log('animation frameIndex', this.frameIndex)
        this.frameCount -= 1
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }

        // 碰撞检测
        this.collideWithPipe()
    }
    draw() {
        let cxt = this.game.context

        cxt.save()
        // 把坐标的原点放在 图片的中心
        let w2 =  this.w / 2
        let h2 =  this.h / 2

        cxt.translate(this.x + w2, this.y + h2)
        if (this.flipx) {
            cxt.scale(-1, 1)
        }
        cxt.globalAlpha = this.alpha
        // 绕中心点旋转
        cxt.rotate(this.rotation  * Math.PI / 180)
         // 把坐标的原点还原
        cxt.translate(-w2, -h2)
        cxt.drawImage(this.texture, 0, 0)
        cxt.restore()
    }
    move(x, keyStatus) {
        this.flipx = (x < 0)
        this.x += x
        // log('keyStatus', keyStatus)
        // let animationNames = {  // 经典
        //     down: 'run',
        //     up: 'stand',
        // }
        // let name = animationNames[keyStatus]
        // this.changeAnimation(name)    
    }
    changeAnimation(name) {
        this.aniamtionName = name
    }
    collide(target) {
        let a = this
        let b = target
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    collideWithPipe(){
        let self = this
        let elements = this.game.scene.loadElements()
        for (let e of elements) {
            if (e instanceof Pipes) {
                for (let p of e.pipes) {
                    if (this.collide(p)) {
                        log('game over')
                        // let s = SceneEnd.new(this.game)
                        // s.score = this.game.scene.score
                        // self.game.replaceScene(s)
                    }
                }

            }
        }
    }
}