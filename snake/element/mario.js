class Mario {
    constructor(x, y) {
        this.setup(x, y)
    }
    static new(...args) {
        let n = new this(...args)
        return n
    }
    setup(x, y) {
        this.x = x || 220
        this.y = y || 220
        this.r = 100
        this.hat_color = '#4e9ddd'
        this.size = 3
        this.ellipse_color = '#a2d5e7'
        this.hat_in_color = 'white'
        this.eye_fill_color = '#223764'
        this.eye_edge_color = 'black'
    }
    hat_semicircle() {
        this.hat_fill_semicircle()
        this.hat_edge_semicircle(this.x, this.y, this.r, 'black')
    }
    hat_fill_semicircle() {
        let color = this.hat_color
        let l = this.r
        let x = this.x
        let y = this.y
        for (let i = 0; i < l; i++) {
            this.hat_edge_semicircle(x, y, i, color)
        }
    }
    fan(length, num, color) {
        let l = length
        let n = num
        setPenColor(color)
        let angle = (n - 2) * 180 / n
        let degree = 180 - angle
        let i = 0
        while (i < n / 2) {
            forward(l)
            right(degree)
            i = i + 1
        }
    }
    hat_edge_semicircle(x, y, r, color) {
        let self = this
        jump(x, y)
        let num = 36
        let length = (2 * Math.PI * r) / num
        let jcdu = (90 + (360 / num) / 2)
        // log('lenght', length, 'jcdu', jcdu)
        left(90)
        self.fan(length, num, color)

        setHeading(90)
        setPenColor(color)
        forward(18)

        jump(x, y)
        setHeading(0)
    }
    hat_rect() {
        let h = this.r / 6
        let w = this.r * 2
        let c = this.hat_color
        let x = this.x
        let y = this.y
        t.rect(x, y, w, h, c, c)
    }
    draw_line(x, y, l, angle, color) {
        setPenColor(color)
        jump(x, y)
        left(angle)
        forward(l)
    }
    small_ellipse() {
        let length = 4
        let x = this.x
        let y = this.y
        // x_r, y_r  就是 数学里面的 a   b  
        let [x_r, y_r] = [2, 3]
        let ellipse_color = this.ellipse_color
        t.ellipse(x, y, 22, -22, length, x_r, y_r, ellipse_color, 'black', 90)
        t.ellipse(x, y, 72, -42, length + 2, x_r, y_r, ellipse_color, 'black', 90)
    }
    big_ellipse() {
        let length = 11
        let x = this.x
        let y = this.y
        let [x_r, y_r] = [2, 3]
        let ellipse_color = this.ellipse_color
        t.ellipse(x, y, 150, -55, length, x_r, y_r, ellipse_color, 'black', 90)
    }
    hat_ellipses() {
        this.small_ellipse()
        this.big_ellipse()
    }
    hat_edge_else() {
        let x = this.x
        let y = this.y
        let h = this.r / 6
        let c = 'black'
        let f = 3
        // draw_left(p1, l, 90)
        this.draw_line(x, y - f, h + f, -90, c)
        // draw_right(p2, l, 90)
        this.draw_line(x + this.r * 2, y - f, h + f, 0, c)

        this.hat_ellipses()
    }
    hat_in_bezier() {
        let r = this.r
        let space = 2 * r / 6
        let x = this.x
        let y = this.y
        let x1 = this.x + 1 * space
        let y1 = this.y + 8
        let f = 7
        let p1 = {
            x: x,
            y: y1 + f,
        }
        let p2 = {
            x: x + 2 * r,
            y: y1 + f,
        }
        this.hat_bezierCurve(p1, p2)
    }
    draw_hat() {
        this.hat_semicircle()
        this.hat_rect()
        this.hat_edge_else()
        this.hat_in_bezier()
    }
    bezierCurve_up(p1, p2, i, color) {
        let f = i
        t.bezier(p1, p2, f, color)
    }
    bezierCurve_ups(p1, p2, color) {
        let rect_h = 2 * this.r / 6
        for (let i = 0; i < rect_h; i++) {
            this.bezierCurve_up(p1, p2, i, color)
        }
    }
    bezierCurve_downs(p1, p2, color) {
        let rect_h = this.r / 6
        for (let i = 0; i < rect_h; i++) {
            this.bezierCurve_up(p1, p2, -i, color)
        }
    }
    hat_edge_bezierCurve(p1, p2) {
        // 帽子里面的颜色
        let color = 'black'
        let f = 17
        let i = this.r / 6 + f
        this.bezierCurve_up(p1, p2, i, color)
        this.bezierCurve_up(p1, p2, -i, color)
    }
    hat_fill_bezierCurve(p1, p2) {
        // 帽子里面的颜色
        let c = this.hat_in_color
        this.bezierCurve_ups(p1, p2, c)
        this.bezierCurve_downs(p1, p2, c)
    }
    hat_bezierCurve(p1, p2) {
        this.hat_fill_bezierCurve(p1, p2)
        this.hat_edge_bezierCurve(p1, p2)
    }
    fill_line(x, y, w, color) {
        jump(x, y)
        setPenColor(color)
        setHeading(0)
        forward(w)
    }
    edge_rect(x, y, w, h, color) {
        jump(x, y)
        setHeading(0)
        for (let i = 0; i < 2; i++) {
            setPenColor('white')
            forward(w)
            right(90)
            setPenColor(color)
            forward(h)
            right(90)
        }
    }
    fill_rect(x, y, width, height, color) {
        let w = width
        let h = height
        let i = 0
        while (i < h) {
            let y1 = y + i
            this.fill_line(x, y1, w, color)
            i += 1
        }
    }
    face_rect() {
        let r = this.r
        let space = 2 * r / 6
        let x = this.x
        let y = this.y
        let x1 = this.x + 1 * space
        let y1 = this.y + 8

        let w = 4 * space
        let h = 2 * 4 * space
        let color = 'black'
        let f = 5.8

        this.fill_rect(x1, y1 - f, w, h / 4, 'white')
        this.edge_rect(x1, y1 - f, w, h / 4, 'black')

        let k = 60
        let p1 = {
            x: x + w / 4,
            y: y1 + k,
        }
        let p2 = {
            x: x + 2 * this.r - w / 4,
            y: y1 + k,
        }
        this.face_bezier(p1, p2)
    }
    face_bezier(p1, p2) {
        let color = 'black'
        let f = -50
        t.bezier(p1, p2, f, color)
    }
    eye(position) {
        let fill_color = this.eye_fill_color
        let edge_color = this.eye_edge_color
        let { x, y } = position
        let length = 4
        let [x_r, y_r] = [2, 6]
        t.ellipse(x, y, 22, -22, length, x_r, y_r, fill_color, edge_color, 0)
    }
    eyes() {
        let r = this.r
        let space = 2 * r / 6
        let x1 = this.x + 1 * space
        let y1 = this.y + 8

        let w = 4 * space
        let h = 2 * 4 * space

        let factor = 20
        let f_y = -10
        let p1 = {
            x: x1 + w / 4 - factor,
            y: y1 + h / 6 + f_y,
        }
        let p2 = {
            x: x1 + 3 * w / 4 - factor,
            y: y1 + h / 6 + f_y,
        }
        this.eye(p1)
        this.eye(p2)
    }
    draw_face() {
        this.face_rect()
        this.eyes()
    }
    draw() {
        setPenSize(this.size)
        this.draw_hat()
        this.draw_face()
    }
}