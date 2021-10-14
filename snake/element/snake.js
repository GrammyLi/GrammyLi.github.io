/*
- snake
   - squares
       - square
           - l
           - position
               - x
               - y
           - color
   - move direction
       - left
       - right
       - up
       - down
       
   - collide_with
       - wall
           - game over
               - 边界检测
       - food
           - add_square
   - event
    - left right down up

算法：
    - move_left
        - first_square
            - x 变
                - 累加 边长 和 间隔
            - y
*/
window.head_position = []

class Snake {
    constructor(game) {
        this.setup(game)
    }
    static new(...args) {
        return new this(...args)
    }
    one_square(i, j) {
        let x = this.x + (this.l + this.space) * i
        let y = this.y + (this.l + this.space) * j
        let l = this.l
        let fill_color = this.fill_color
        let edge_color = this.edge_color
        let square = Square.new(x, y, l, fill_color, edge_color)
        return square
    }
    init_squares() {
        let l = []
        let f = 4
        for (let i = f; i < this.n + f; i++) {
            let square = this.one_square(f, i)
            l.push(square)
        }
        return l
    }
    setup(game) {
        this.game = game
        this.x = 0
        this.y = 0
        this.n = 3
        this.l = 30
        this.w = this.l
        this.h = this.l
        this.space = 0
        this.fill_color = 'blue'
        this.edge_color = 'black'
        this.squares = this.init_squares()
        this.head_color = 'red'
        this.count = this.squares.length
        this.speed = 30
        this.direction = 'right'
    }
    draw_square(square, color = 'blue') {
        let s = square
        t.rect(s.x, s.y, s.l, s.l, color, color)
    }
    draw() {
        // for (let square of this.squares) {
        //     square.draw()
        // }
        for (let i = 0; i < this.squares.length; i++) {
            if (i == 0) {
                let color = this.head_color
                // log('this.squares[0]', this.squares[0])
                this.draw_square(this.squares[0], color)
            } else {
                let square = this.squares[i]
                this.draw_square(square)
            }
        }
    }
    update() {
        this.move()
        this.collide_with_food()
        this.game_over()
    }
    game_over() {
        let game = this.game
        if (!this.is_in_map()) {
            gameOver()
            clear()
            let s = SceneEnd.new(game)
            game.replaceScene(s)
        }
    }
    move() {
        let self = this
        let mode = self.direction
        if (mode == 'left') {
            self.move_left()
        }
        if (mode == 'right') {
            self.move_right()
        }
        
        if (mode == 'down') {
            self.move_down()
        }
        if (mode == 'up') {
            self.move_up()
        }
        // let move_mode = {
        //     'left': self.move_left,
        //     'right': self.move_right,
        //     'up': self.move_up,
        //     'down': self.move_down,
        // }
        // let mode = self.direction
        // move_mode[mode]()
    }
    move_left() {
        // log(' move_left this.squares', this.squares)
        let squares = copy(this.squares)
        let first_square = squares[0]
        // log('first_square before', first_square, 'first_square.x before', first_square.x)
        let eles_squares = copy(squares.slice(0, -1))
        let move_distence = this.speed
        first_square.x -= move_distence

        this.squares = [first_square, ...eles_squares]
        // log('after', squares, 'first', this.squares[0])
    }
    move_right() {
        let squares = copy(this.squares)
        let first_square = squares[0]
        let eles_squares = copy(squares.slice(0, -1))
        let move_distence = this.speed
        first_square.x += move_distence
        this.squares = [first_square, ...eles_squares]
    }
    
    move_down() {
        let squares = copy(this.squares)
        let first_square = squares[0]
        let eles_squares = copy(squares.slice(0, -1))
        let move_distence = this.speed
        first_square.y += move_distence
        this.squares = [first_square, ...eles_squares]
    }
    move_up() {
        let squares = copy(this.squares)
        let first_square = squares[0]
        let eles_squares = copy(squares.slice(0, -1))
        let move_distence = this.speed
        first_square.y -= move_distence
        this.squares = [first_square, ...eles_squares]
    }
    collide(target){ // 碰撞检测
        let a = this
        let b = target
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    add_food_as_tail(food) {
        let squares = copy(this.squares)
        let x = food.x
        let y = food.y
        let tail_square = this.one_square(x, y)
        let eles_squares = copy(squares.slice(0))
        
        this.squares = [...eles_squares, tail_square]
    }
   
    str(arr) {
        return JSON.stringify(arr)
    }

    center_position(s) {
        let x = s.x + s.w / 2
        let y = s.y + s.h / 2
        let position = [x, y]
        return position
    }

    is_in_map() {
        let head_square = this.squares[0]
        let x = 20
        let l = x * this.l
        let inX = head_square.x < l && head_square.x >= 0
        let inY = head_square.y < l && head_square.y >= 0
        return inX && inY
    }
    collide_with_food() {
        let self = this
        let food = this.game.scene.food
        let head_square = this.squares[0]
        if (!food) {
            return 
        }
        for (let s of self.squares) {
            // log('s', s)
            if (self.str(food.square.center_position()) === self.str(self.center_position(s))) {
                log('collide')
                self.add_food_as_tail(food)
                self.scene.remove(food)
                eatMusic()
                self.scene.add_food()
                // self.game.scene.add(Food.new(self.game))
            }
        }
       
       
        // let elements = this.game.scene.load_elements()
        // for (let e of elements) {
        //     if (e instanceof Food) {
        //         if (self.collide(e)) {
        //             // log('collide')
        //             // food --> square --> snake head_
        //             // self.add_food_as_head(e)
        //             // e.remove()
        //             // self.game.scene.add(Food.new(self.game))
        //             // self.remove() // bullet remove
        //             return true
        //         }
        //     }
        // }
        // return false
    }
}