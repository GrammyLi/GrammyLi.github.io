/*
 * @Author: your name
 * @Date: 2019-10-06 15:54:58
 * @LastEditTime: 2021-10-22 13:30:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/cxk/game/utils.js
 */
const log = console.log.bind(console)

const e = selector => document.querySelector(selector)
const es = selector => document.querySelectorAll(selector)

const find = (element, selector) => {
    return element.querySelector(selector)
}

const findAll = (element, selector) => {
    return element.querySelectorAll(selector)
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
    return Math.floor(n + start)
    // return ~~(n + start)
}

/*
    1    2
    3    4
 */
const edgeBounce = (a, b) => {
    let w = b.w
    let h = b.h
    if (a.x == b.x && a.y == b.y) {
        log('1')
        return -1
    }
    if (a.x == b.x + w && a.y == b.y) {
        log('2')
        return -1
    }
    if (a.x == b.x  && a.y == b.y + h) {
        log('3')
        return -1
    }
    if (a.x == b.x + w && a.y == b.y + h) {
        log('4')
        return -1
    }
    return 1
}