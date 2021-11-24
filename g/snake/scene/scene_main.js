class SceneMain {
    constructor(game) {
        this.setup(game)
    }
    static new(...args) {
        let i = new this(...args)
        return i
    }
    add_map() {
        let map = Map.new()

        this.add(map)
        this.map = map
    }
    add_food() {
        let food = Food.new(this.game)

        this.add(food)
        this.food = food
    }
    add_snake() {
        let snake = Snake.new(this.game)
        this.add(snake)
        this.snake = snake
    }
    setup(game) {
        this.game = game
        this.elements = []
        this.add_map()
        this.add_snake()
        this.add_food()
        this.set_inputs()
    }
    set_input_snake_move() {
        let s = this.snake
        this.game.registerAction('a', () => {
            log('a')
            leftMusic()
            // s.move_left()
            s.direction = 'left'
        })
        this.game.registerAction('d', () => {
            log('d')
            // s.move_right()
            rightMusic()
            s.direction = 'right'
        })
        this.game.registerAction('w', () => {
            // s.move_up()
            log('w')
            upMusic()
            s.direction = 'up'
        })
        this.game.registerAction('s', () => {
            // s.move_down()
            log('s')
            downMusic()
            s.direction = 'down'
        })
        this.game.registerAction('g', () => {
            stopMusic()
        })
    }
    set_inputs() {
        this.set_input_snake_move()
        // // init
        // game.registerAction('k', () => {
        //     log('开始')
        //     // let s = Scene(game)
        //     // game.replaceScene(s)
        // })
        // game.registerAction('e', () => {
        //     log('eidt')
        //     // let s = SceneEdit.new(game)
        //     // game.replaceScene(s)
        // })
    }
    draw() {
        for (let v of this.elements) {
            v.draw()
        }
    }
    draw_lable() {
        //draw labels
        const self = this
        self.game.context.fillStyle = 'red'
        self.game.context.font = "30px 微软雅黑"
        self.game.context.fillText('press k continue ', 180, 200)
        self.game.context.fillText('press e ediy ', 180, 300)
    }
    update() {
        for (let v of this.elements) {
            v.update()
        }
    }
    add(element) {
        element.scene = this
        this.elements.push(element)
    }
    load_elements() {
        return this.elements
    }
    remove(element) {
        this.elements = this.elements.filter(e => e !== element)
    }
}