/*
 * @Author: your name
 * @Date: 2020-03-03 12:17:22
 * @LastEditTime: 2021-10-23 13:13:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/sky_plane/scene/main/bullet.js
 */
class Bullet extends BaseImage {
    constructor(game, bulletName) {
        super(game, bulletName)
        this.setup()
    }
    setup() {
        this.type = 'bullet'
        this.speed = 0
        // this.alive = true
    }
    update() {
        this.y -= this.speed
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
                    e.remove()
                    self.remove() // bullet remove
                    return true
                }
            }
        }
        return false
    }

}


class PlayerBullet extends Bullet {
    constructor(game) {
        super(game, 'player_bullet')
    }

    setup() {
        super.setup()
        this.type = 'player_bullet'
        this.speed = config.player_bullet_speed.value
    }

    update() {
        let self = this
        super.update()
        //子弹出屏删除，能降低卡顿
        if (self.y < 0) {
            self.remove()
        }
        if (self.collideWith('enemy')) {
            self.game.scene.score += 100
        }
        self.bulletCollide()
    }

    bulletCollide() {  // enemy_bullet and player_bullet
        return this.collideWith('enemy_bullet')
    }
}

class EnemyBullet extends Bullet {
    constructor(game) {
        super(game, 'enemy_bullet')
    }
    setup() {
        super.setup()
        this.type = 'enemy_bullet'
        this.speed = config.enemy_bullet_speed.value
    }

    collideWithPlayer() {
        return this.collideWith('player')
    }
    borderLimited() { //边界检测
        let h = 768
        if (this.y > h) {
            this.setup()
        }
    }
    update() {
        let self = this
        self.y += self.speed
        self.borderLimited()
        self.collideWithPlayer()
    }

}
