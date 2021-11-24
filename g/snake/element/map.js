/*
- map
- position
   - x
   - y
- 默认 10 * 10 square_square
- square
   - l: 30
   - space: 0
*/
class Map {
    constructor() {
        this.setup()
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
    line_square(i) {
        let line = []
        for (let j = 0; j < this.n; j++) {
            let square = this.one_square(i, j)
            line.push(square)
        }
        return line
    }
    square_square() {
        let l = []
        for (let i = 0; i < this.n; i++) {
            let line =  this.line_square(i)
            l.push(line)
        }
        return l
    }
    setup() {
        this.x = 0
        this.y = 0
        this.n = 20
        this.l = 30
        this.space = 0
        this.w = this.n * this.l
        this.h = this.w
        this.fill_color = 'pink'
        this.edge_color = 'black'
        this.map_squares = this.square_square()
        // log('map_squares', this.map_squares)
    }
    draw() {
         for (let line of this.map_squares) {
             for (let square of line) {
                 square.draw()
             }
         }
    }
    update() {

    }
}