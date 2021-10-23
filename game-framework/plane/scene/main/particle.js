/*
 * @Author: your name
 * @Date: 2020-03-03 12:19:06
 * @LastEditTime: 2021-10-23 13:13:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/sky_plane/scene/main/particle.js
 */
class Label{
    constructor(game, text, x, y){
        this.game = game
        this.text = text
        this.x = x
        this.y = y
        this.type = 'text'
    }

    static new(game, text, x, y){
        return new this(game, text, x, y)
    }

    draw(){
        this.game.font = '20px serif'
        this.game.context.fillStyle = 'white'
        this.game.context.fillText(this.text, this.x, this.y)
    }

    update(){

    }
}

class Particle extends BaseImage {
    constructor(game){
        super(game, 'fire')
        this.setup()
    }

    setup(){
        this.type = 'particle'
        this.life = 20
    }

    init(x, y, vx, vy){
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    update(){
        this.life　-= 1
        this.x += this.vx
        this.y += this.vy
        let factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class ParticleSystem {
    constructor(game, x, y) {
        this.game = game
        this.setup(x ,y)
    }

    static new(game, x, y){
        return new this(game, x, y)
    }
    setup(x ,y){
        this.duration = 50
        this.x = x
        this.y = y
        this.numberOfParticles = 20
        this.particles = []
    }

    update(){
        this.duration--
        if (this.duration < 0){
            this.game.scene.deleteElement(this)
        }

        if (this.particles.length < this.numberOfParticles){ //调加小火花
            let p = Particle.new(this.game)
            //设置初始化坐标
            let s = 5
            let vx = 0.5 * randomBetween(-s, s)
            let vy = 0.5 * randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }

        for(let p of this.particles){ //更新所有小火花
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }

    draw(){
        for(let p of this.particles){
            p.draw()
        }
    }
}