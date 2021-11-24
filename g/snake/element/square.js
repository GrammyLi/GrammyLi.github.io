class Square {
    constructor(x, y, l, fill_color, edge_color) {
        this.setup(x, y, l, fill_color, edge_color)
    }
    static new(...args) {
        return new this(...args)
    }
    setup(x, y, l, fill_color, edge_color) {
        this.x = x
        this.y = y
        this.l = l
        this.w = this.l
        this.h = this.l
        this.fill_color = fill_color
        this.edge_color = edge_color
    }
    center_position() {
        let x = this.x + this.w / 2
        let y = this.y + this.h / 2
        let position = [x, y]
        return position
    }
    draw(color=this.fill_color) {
        t.rect(this.x, this.y, this.l, this.l, color, this.edge_color)
    }
    
    update() {

    }
}