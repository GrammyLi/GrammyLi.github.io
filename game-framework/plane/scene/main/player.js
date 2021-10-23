/*
 * @Author: your name
 * @Date: 2020-10-09 12:47:08
 * @LastEditTime: 2021-10-23 13:13:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/sky_plane/scene/main/player.js
 */
class Player extends BaseImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.type = 'player'
        this.speed = 10
        this.cooldown = 0
        this.lifes = 3
    }
    update() {
        this.speed = config.player_speed.value
        if (this.cooldown > 0) {
            this.cooldown -= 1
        }
        this.collideWithEnemy()
    }

    moveLeft() {
        let x = this.x - this.speed
        this.move(x, this.y)
    }
    moveRight() {
        let x = this.x + this.speed
        this.move(x, this.y)
    }
    moveUp() {
        let y = this.y - this.speed
        this.move(this.x, y)
    }
    moveDown() {
        let y = this.y + this.speed
        this.move(this.x, y)
    }
    move(x, y) {
        if (x < 0) {
            x = 0
        }
        if (x > 512 - this.w) {
            x = 512 - this.w
        }
        this.x = x

        if (y < 0) {
            y = 0
        }
        if (y > 768 - this.h) {
            y = 768 - this.h
        }
        this.y = y
    }
    fire(){
        let l = 50
        if (this.cooldown == 0) {
            this.cooldown = config.player_bullet_speed.value
            let x = this.x + this.w / 2  - l 
            let y = this.y
            let b = PlayerBullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }

    remove() {
        let self = this
        self.lifes -= 1
        if (self.lifes < 0) {
            let ps = ParticleSystem.new(self.game, self.x, self.y)
            self.game.scene.addElement(ps)
            self.game.scene.deleteElement(self)
            //替换场景传分
            let s = SceneEnd.new(self.game)
            s.score = this.game.scene.score
            setTimeout(function () {
                self.game.replaceScene(s)
            }, 2000)
        }
    }

    collideWithEnemy() {
        // log('collide')
        let elements = this.game.scene.elements
        for (let e of elements) {
            if (e.type == 'enemy') { // type 是否匹配
                if (this.collide(e)) {
                    e.remove()
                    this.remove()
                    return true
                }
            }
        }
        return false
    }

}