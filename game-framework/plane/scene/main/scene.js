/*
 * @Author: your name
 * @Date: 2020-10-09 22:17:02
 * @LastEditTime: 2021-10-23 13:15:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/sky_plane/scene/main/scene.js
 */
class SceneMain extends Scene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    addLove() {
        let game = this.game
        this.love = Love.new(game)
        this.addElement(this.love)
    }
    setup() {
        let game = this.game
        this.numberOfEnemies = 5
        this.bg = BaseImage.new(game, 'sky')

        this.cloud = Cloud.new(game)
        this.player = Player.new(game)
        this.player.x = 170
        this.player.y = 600
        this.love = Love.new(game)

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        this.addElement(this.love)

        this.addEnemies()   // add enemy
        this.score = 0  // score
    }
    addEnemies() {
        let es = []
        for (let i = 0; i < this.numberOfEnemies; i++) {
            let e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    setupInputs() {
        let g = this.game
        let s = this
        g.registerAction('a', () => {
            s.player.moveLeft()
        })
        g.registerAction('d', () => {
            s.player.moveRight()
        })
        g.registerAction('w', () => {
            s.player.moveUp()
        })
        g.registerAction('s', () => {
            s.player.moveDown()
        })
        g.registerAction('j', () => {
            s.player.fire()
        })
    }

    update() {
        super.update()
    }
    draw() {
        super.draw()
        // draw lable
        const self = this
        self.game.context.fillStyle = 'lightblue'
        self.game.context.font="30px 微软雅黑"
        let t = `score: ${this.score}`
        self.game.context.fillText(t, 20, 760)
    }
}