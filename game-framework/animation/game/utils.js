const log = console.log.bind(console)

const e = selector => document.querySelector(selector)
const es = selector => document.querySelectorAll(selector)

const find = (element, selector) => {
    return element.querySelector(selector)
}

const findAll = (element, selector) => {
    return element.querySelectorAll(selector)
}

const EventType = {
    click: 'click',
    popstate: 'popstate',
    mouseover: 'mouseover',
    mouseout: 'mouseout',
    keydown: 'keydown',
    keyup: 'keyup',
    mousedown: 'mousedown',
    mousemove: 'mousemove',
    mouseup: 'mouseup',
}

const bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
}

// 给所有的元素绑定事件
const bindAll = (elements, eventName, callback) => {
    for (let v of elements) {
        let element = v
        bindEvent(element, eventName, callback)
    }
}
const imageFormPath = (path) => {
    let img = new Image()
    img.src = path
    return img
}

const rectIntersects = (a, b) => {
    let obj = a
    if (b.y > obj.y && b.y < obj.image.height + obj.y) {
        if (b.x > obj.x && b.x < obj.image.width + obj.x) {
            return true
        }
    }
    return false
}

const objLen = (obj) => {
    let arr = []
    for (let k in obj) {
        arr.push(k)
    }
    return arr.length
}

const aInb = (x, x1, x2) => {
    return x >= x1 && x <= x2
}

const randomBetween = (start, end) => {
    let n = Math.random() * (end - start + 1)
    return ~~(n + start)
}