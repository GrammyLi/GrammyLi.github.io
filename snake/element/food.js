/*
- food
   - square
   - random position
   - random color
*/
class Food {
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

    setup(game) {
        this.game = game
        this.x = 0
        this.y = 0
        this.n = 1
        this.l = 30
        this.w = this.l
        this.h = this.l
        this.space = 0
        this.fill_color = 'yellow'
        this.edge_color = 'black'
        this.i = randomBetween(1, 14)
        this.j = randomBetween(1, 14)
        this.square = this.one_square(this.i, this.j)
    }
    
    draw_square(square, color = 'yellow') {
        let s = square
        t.rect(s.x, s.y, s.l, s.l, color, color)
    }
    
    draw() {
        this.draw_square(this.square)
    }

    remove() {
        let self = this
        self.game.scene.remove(self)
    }

    update() {

    }
}