/*
 * @Author: your name
 * @Date: 2021-10-13 20:34:24
 * @LastEditTime: 2021-10-13 20:51:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/visualization/utils.js
 */
const debug = true
const log = debug ? console.log.bind(console) : function () { }
const int = number => parseInt(number, 10)

const copy = arr_or_obj => {
    let a = JSON.parse(JSON.stringify(arr_or_obj))
    return a
}

class Turtle {
    constructor(selector) {
        this.setup(selector)
    }
    setup(selector) {
        this.canvas = document.querySelector(selector)
        this.context = this.canvas.getContext('2d')
        this._position = {
            x: 20,
            y: 20,
        }
        this.nextAngle = 0
        this.isDrawing = true
        this._color = "rgba(15, 120, 125, 0.5)"
        this.context.strokeStyle = this._color
    }
    static intance(...args) {
        let i = this.i || new this(...args)
        return i
    }
    setPosition(position) {
        let self = this
        let p = position
        self._position.x = p.x
        self._position.y = p.y
    }
    setPenColor(color) {
        let self = this
        self._color = color
        self.context.strokeStyle = color
    }
    setPenSize(size) {
        let self = this
        self.context.lineWidth = size
    }
    forward(step) {
        let self = this
        let nextAngle = self.nextAngle
        let p = self._position
        if (!self.isDrawing) {
            return
        }
        let offsetX = Math.cos(nextAngle * Math.PI / 180) * step
        let offsetY = Math.sin(nextAngle * Math.PI / 180) * step
        let x = p.x + offsetX
        let y = p.y + offsetY
        let new_position = {
            x,
            y,
        }
        let t = this.context
        t.beginPath()
        t.moveTo(p.x, p.y)
        t.lineTo(new_position.x, new_position.y)
        self._position = copy(new_position)
        t.stroke()
    }
    penup() {
        let self = this
        self.isDrawing = false
    }
    pendown() {
        let self = this
        self.isDrawing = true
    }
    setHeading(angle) {
        let self = this
        self.nextAngle = angle
    }
    right(angle) {
        let self = this
        self.nextAngle += angle
    }
    left(angle) {
        let self = this
        self.nextAngle -= angle
    }
    goto(x, y) {
        let self = this
        let p = self._position
        let t = self.context
        if (!self.isDrawing) {
            return
        }
        let new_position = {
            x,
            y,
        }
        t.beginPath()
        t.moveTo(p.x, p.y)
        t.lineTo(new_position.x, new_position.y)
        self._position = copy(new_position)
        t.stroke()
    }
    jump(x, y) {
        let self = this
        let p = {
            x,
            y,
        }
        self.setPosition(p)

        self.penup()
        self.goto(x, y)
        self.pendown()
    }
    clearCanvas() {
        let self = this
        let canvas = self.canvas
        let c = self.context
        c.clearRect(0, 0, canvas.width, canvas.height)
    }
    drawLine(x, y, l, color) {
        let self = this
        self.jump(x, y)
        self.setPenColor(color)
        self.forward(l)
    }
    fillRect(x, y, width, height, color) {
        let self = this
        let w = width
        let h = height
        let i = 0
        while (i < h) {
            let y1 = y + i
            self.drawLine(x, y1, w, color)
            i += 1
        }
    }
    edgeRect(x, y, width, height, color = 'black') {
        let self = this
        let w = width
        let h = height
        self.setPenColor(color)
        self.jump(x, y)
        self.setHeading(0)
        let i = 0
        while (i < 2) {
            self.forward(w)
            self.right(90)
            self.forward(h)
            self.right(90)
            i = i + 1
        }
    }
    rect(x, y, width, height, fill_color, edge_color) {
        let self = this
        self.fillRect(x, y, width, height, fill_color)
        self.edgeRect(x, y, width, height, edge_color)
    }
    centerRect(x, y, w, h, fill_color, edge_color) {
        let self = this
        let x1 = x - w / 2
        let y1 = y - h / 2
        self.rect(x1, y1, w, h, fill_color, edge_color)
    }
    degree_by_num(number) {
        let n = number
        let inner_angle = (n - 2) * 180 / n
        // 转角
        let degree = 180 - inner_angle
        return degree
    }
    edgePolygon(x, y, n, length, color) {
        let self = this
        let l = length
        self.jump(x, y)
        let degree = self.degree_by_num(n)
        self.setPenColor(color)
        for (let i = 0; i < n; i++) {
            self.forward(l)
            self.right(degree)
        }
    }
    edgeCircle(x, y, r, color) {
        let self = this
        let n = 55
        let l = (2 * Math.PI * r) / n
        let y1 = y - r
        self.edgePolygon(x, y1, n, l, color)
    }
    fillCircle(x, y, r, color) {
        let self = this
        for (let i = 0; i < r; i++) {
            self.edgeCircle(x, y, r - i, color)
        }
    }
    circle(x, y, r, fill_color, edge_color) {
        let self = this

        self.fillCircle(x, y, r,fill_color)
        self.edgeCircle(x, y, r, edge_color)
    }
    edgeStar(x, y, length, color)  {
        let self = this
        let l = length
        jump(x, y)
        self.setPenColor(color)
        for (let i = 0; i < 5; i++) {
            self.forward(l)
            self.right(144)
        }
    }
    centerEdgeStar(x, y, r, color) {
        let self = this
        let du = 18
        let x1 = x - cos(du) * r
        let y1 = y - sin(du) * r
        let length = cos(du) * r * 2
        self.edgeStar(x1, y1, length, color)
    }
    fillStar(x, y, r, color) {
        let self = this
        for (let i = 0; i < r; i++) {
            self.centerEdgeStar(x, y, r - i, color)
        }
    }
    star(x, y, r, fill_color, edge_color) {
       let self = this
       self.fillStar(x, y, r, fill_color)
       self.centerEdgeStar(x, y, r, edge_color)
    }
    curve(x, y, r, angle = 90, color, set_head, size = 3, left_angle=0) {
        let self = this
        self.setHeading(set_head)
        self.left(left_angle)
        self.setPenSize(size)
        self.jump(x, y - r)
        let n = 66
        let l = (2 * Math.PI * r) / n
        self.setPenColor(color)
        let rate = angle / 360
    
        let jndu = (n - 2) * 180 / n
        let degree = 180 - jndu
        let fator = 10
        let i = 0
        let new_n = int(rate * n)
        while (i < new_n) {
            self.forward(l)
            self.right(degree)
            i = i + 1
        }
    }
    ellipse = (x, y, offset_x, offset_y, length, a, b, fill_color, edge_color, angle) => {
        let x1 = x + offset_x
        let y1 = y + offset_y
        let ctx = this.context
        // ctx.setLineDash([])
        ctx.beginPath()
        ctx.fillStyle = fill_color
        ctx.strokeStyle = edge_color
        let space = length
        let x_r = a * space
        let y_r = b * space
        // 倾斜 angle °角
        let degree = angle * Math.PI / 180
        ctx.ellipse(x1, y1, x_r, y_r, degree, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()
    }
    bezier(p1, p2, factor, color = "black") {
        // factor > 0  up
        // factor < 0  down
        this.setPenColor(color)
        let ctx = this.context
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        let w = p2.x - p1.x
        // let factor = 20
        let p3 = {
            x: p1.x + w / 4,
            y: p1.y - factor,
        }
        let p4 = {
            x: p1.x + 3 * w / 4,
            y: p1.y - factor,
        }
        ctx.bezierCurveTo(p3.x, p3.y, p4.x, p4.y, p2.x, p2.y)
        ctx.stroke()
    }
    text(x, y, content, color, font='24px serif') {
        let c = this.context
        c.font = font
        c.fillStyle = color
        c.fillText(content, x, y)
    }
}

let t = Turtle.intance('.grammy-canvas')

const turtle = () => {
    let canvas = document.querySelector('.grammy-canvas')
    let c = canvas.getContext('2d')
    return c
}
const setPosition = (x, y) => {
    let p = {
        x,
        y,
    }
    t.setPosition(p)
}
// 只能设置 画笔的颜色
const setPenColor = new_color => {
    t.setPenColor(new_color)
}
const setPenSize = (size) => {
    t.setPenSize(size)
}
const forward = step => {
    t.forward(step)
}
const test_forward = () => {
    forward(30)
}
const penup = () => {
    t.penup()
}
const pendown = () => {
    t.pendown()
}
// setHeading(注意大小写) 可以设置箭头的朝向, 0 就是朝右
// // 90 和 -90 的朝向, 自行摸索一下
// setHeading(0)
const setHeading = angle => {
    t.setHeading(angle)
}
// right 可以右转
// right(30)
// forward(step)
const right = angle => {
    t.right(angle)
}
const left = angle => {
    t.left(angle)
}
// goto 可以直接走到某个坐标
// 这里是走到 (100, 200) 这个坐标
// goto(100, 200)
const goto = (x, y) => {
    t.goto(x, y)
}
const test_goto = () => {
    let [x, y] = [100, 100]
    goto(x, y)
}
// test_goto()
// jump 可以无痕走到某个坐标
const jump = (x, y) => {
    t.jump(x, y)
}
const clear = () => {
    t.clearCanvas()
}

const sin = function (degree) {
    let radians = degree * Math.PI / 180
    return Math.sin(radians)
}

const cos = function (degree) {
    let radians = degree * Math.PI / 180
    return Math.cos(radians)
}

const jndu_by = (x, y) => {
    let h = Math.atan(y / x)
    let jndu = 360 * h / (2 * Math.PI)
    return jndu
}

const on = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
}

const appendHtml = (element, html) => {
    element.insertAdjacentHTML('beforeend', html)
}