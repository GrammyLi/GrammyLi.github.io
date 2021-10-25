const debug = false
const log = debug ? console.log.bind(console) : function () { }

const int = number => parseInt(number, 10)

const len = arr_or_str => arr_or_str.length

const copy = arr_or_obj => {
    let a = JSON.parse(JSON.stringify(arr_or_obj))
    return a
}
const bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
}
const bindAll = (elements, eventName, callback) => {
    for (let e of elements) {
        bindEvent(e, eventName, callback)
    }
}
const appendHtml = (element, html) => {
    element.insertAdjacentHTML('beforeend', html)
}

const e = selector => document.querySelector(selector)
const es = selector => document.querySelectorAll(selector)

const find = (ele, sel) => {
    return ele.querySelector(sel)
}

const shuffle = (arr) => {
    if (!Array.isArray(arr) && arr.length) {
        return []
    }
    for (let i = arr.length; i > 0; i--) {
        const idx = Math.floor(Math.random() * i)
        if (idx !== (i - 1)) {
            const tmp = arr[idx];
            arr[idx] = arr[i - 1]
            arr[i - 1] = tmp
        }
    }
    return arr
}

const randomBetween = (start, end) => {
    let n = Math.random() * (end - start + 1)
    return ~~(n + start)
}

class SlideDirection {
    constructor() {
        this.setup()
    }
    static instance() {
        let i = this.i || new this()
        return i
    }
    setup() {
        this.startX = 0
        this.startY = 0
        this.endX = 0
        this.endY = 0
    }
    getAngle(dx, dy) {
        return Math.atan2(dy, dx) * 180 / Math.PI
    }
    setStart(event) {
        this.startX = event.touches[0].pageX
        this.startY = event.touches[0].pageY
    }
    setEnd(event) {
        this.endX = event.changedTouches[0].pageX
        this.endY = event.changedTouches[0].pageY
    }
    direction() {
        let dy = this.startY - this.endY
        let dx = this.endX - this.startX
        let r = ''
        //如果滑动距离太短
        if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
            return r
        }
        // 判断方向
        let angle = this.getAngle(dx, dy)
        if (angle >= -45 && angle < 45) {
            r = 'right'
        } else if (angle >= 45 && angle < 135) {
            r = 'up'
        } else if (angle >= -135 && angle < -45) {
            r = 'down'
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            r = 'left'
        }
        return r
    }
}
const addScore = (number) => {
    window.option.score += number
    if (window.option.score > window.option.max_score) {
        window.option.max_score = window.option.score
    }
}
/*

[2, 2, 4, 0]   => [4, 0, 4, 0] =>  [4, 4, 0, 0]
[2, 2, 4, 4]   => [4, 0, 8, 0] =>  [4, 8, 0, 0]
[2, 2, 2, 2]   => [4, 0, 4, 0] =>   [4, 4, 0, 0]
 */
const mergeLine = (index, line) => {
    let v = line[index]
    for (let i = index + 1; i < len(line); i++) {
        if (v == line[i]) {
            // 合并数字
            line[index] = v * 2
            // 添加分数
            addScore(v)
            // 清空对应位置数字
            line[i] = 0
            // index 合并的位置 就是 y 的位置
            return index
        }
    }
    return -1
}
// data [
    //  [ 4, 0, 4, 0 ], 
    //  [ 4, 0, 8, 0 ],
    //   [ 4, 0, 4, 0 ], 
    //   [ 4, 0, 4, 0 ] 
    // ]
const moveLine = (line) => {
    for (let i = 0; i < len(line) - 1; i++) {
        if (line[i] == 0) {
            for (let j = i + 1; j < len(line); j++) {
                let v = line[j]
                if (v !== 0) {
                    line[i] = v
                    line[j] = 0
                    break
                }
            }
        }
    }
}
// 0  -- 4
// 1 -- 2

const rightPositions = (positions) => {
    let ps = []
    for (let p of positions) {
        let [x, y] = p
        let y1 = 0
        if (y == 0) {
            y1 = 4
        }
        if (y == 4) {
            y1 = 0
        }
        if (y == 1) {
            y1 = 2
        }
        if (y == 2) {
            y1 = 1
        }
        ps.push([x, y1])
    }
    return ps
}

const lineNumbersBy = (direction, line, x) => {
    let d = direction
    let ps = []
    let new_line = []
    for (let i = 0; i < len(line) - 1; i++) {
        let v = line[i]
        if (v !== 0) {
            // 得到相应的索引 并且改变数组
            let y = mergeLine(i, line)
            if (y != -1) {
                ps.push([x, y])
            }
        }
    }
    moveLine(line)
    new_line  = line
    if (d === 'right') {
        new_line = new_line.reverse()
        ps = rightPositions(ps)
    }
    return [new_line, ps]
}

const lineSlide = (direction) => {
    let d = direction
    let positions = []
    for (let i = 0; i < len(data); i++) {
        let line = copy(data[i])
        let [new_line, ps] = lineNumbersBy(d, line, i)
        positions = positions.concat((ps))
        data[i] = new_line
    }
    log('positions', positions)
    log('data', data)
    return positions
}

const exchangeData = (line_data) => {
    for (let i = 0; i < len(line_data); i++) {
        for (let j = 0; j < len(line_data); j++) {
            let v = line_data[i][j]
            data[j][i] = v
        }
    }
}

const horizonExchangeLine = (lines, direction) => {
    let d = direction
    let line_data = []
    let positions = []
    for (let i = 0; i < len(lines); i++) {
        let line = lines[i]
        if (d == 'up') {
            d = 'left'
        }
        if (d == 'down') {
            d = 'right'
        }
        let [new_line, ps] = lineNumbersBy(d, line, i)
        positions = positions.concat((ps))
        line_data.push(new_line)
    }
    let new_positions = []
    for (let p of positions) {
        let [x, y] = p
        new_positions.push([y, x])
    }
    exchangeData(line_data)
    return new_positions
}

const horizonSlide = (direction) => {
    let d = direction


    let lines = []
    for (let i = 0; i < len(data); i++) {
        let line = []
        for (let j = 0; j < len(data); j++) {
            let v = data[j][i]
            line.push(v)
        }
        lines.push(line)
    }
    // log('lines', lines)
    let positions = horizonExchangeLine(lines, d)
    // log('data', data, 'positions', positions)
    return positions
}