/*
 * @Author: your name
 * @Date: 2020-02-17 18:31:32
 * @LastEditTime: 2021-10-23 13:13:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/sky_plane/scene/main/enemy.js
 */
class Enemy extends BaseImage {
    constructor(game) {
        let num = randomBetween(1, 4)
        let name = 'enemy' + String(num)
        super(game, name)
        this.type = 'enemy'
        this.health(num)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
        this.coolDown = randomBetween(40, 100)
    }

    health(num) {
        if ('34'.includes(num)) {
            this.lifes =  2 // health point
        } else {
            this.lifes = 1
        }
    }
    explode(){
        let self = this
        log('Enemy x, y', self.x, self.y)
        let ps = ParticleSystem.new(self.game, self.x, self.y)
        self.game.scene.addElement(ps)
    }
    remove(){
        let self = this
        self.lifes -= 1
        if (self.lifes < 0) {
            self.explode()
            let e = Enemy.new(self.game)
            self.game.scene.addElement(e)
            self.game.scene.deleteElement(self)
        }
    }
    fire(){
        if (this.coolDown < 0) {
            this.coolDown = randomBetween(config.enemy_bullet_cooldown_min.value,
                config.enemy_bullet_cooldown_max.value)
            let x = this.x + this.w / 2
            let y = this.y
            let b = EnemyBullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
    borderLimited() { //边界检测
        let h = 768
        if(this.y > h){
            this.setup()
        }
    }
    update() {
        this.y += this.speed
        this.coolDown -= 1
        this.fire()
        this.borderLimited()
        this.collideWithBullet()
    }
    collideWithBullet() {
        // log('collide')
        let elements = this.game.scene.elements
        for (let e of elements) {
            if (e.type == 'player_bullet') { // type 是否匹配
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