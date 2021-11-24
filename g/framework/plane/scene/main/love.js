/*
 * @Author: your name
 * @Date: 2020-10-09 23:17:54
 * @LastEditTime: 2021-10-23 13:13:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/sky_plane/scene/main/love.js
 */
class Love extends BaseImage {
    constructor(game) {
        let name = 'love'
        super(game, name)
        this.setup()
    }
    setup() {
        this.type = 'love'
        this.speed = 1
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.speed = config.love_speed.value
        this.y += this.speed
        this.borderLimited()
        this.collideWithPlayer()
    }
    borderLimited() { //边界检测
        let h = 768
        if(this.y > h){
            this.setup()
        }
    }
    remove() {
        let self = this
        self.game.scene.deleteElement(self)
    }
    collideWith(type) {
        let self = this
        let elements = this.game.scene.loadElements()
        for (let e of elements) {
            if (e.type == type) { // type 是否匹配
                if (self.collide(e)) {
                    self.remove() //   remove
                    return true
                }
            }
        }
        return false
    }
    collideWithPlayer() {
        let t = 'player'
        let self = this
        if (self.collideWith(t)) {
            // 添加 分数， 添加生命值
            log('添加 分数， 添加生命值')
            let s = 200
            self.game.scene.score += s
            let life = 1
            self.game.scene.lifes += life

            self.game.scene.addLove()
        }
        
    }
}
