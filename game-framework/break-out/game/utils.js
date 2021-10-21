/*
 * @Author: your name
 * @Date: 2021-10-20 22:12:48
 * @LastEditTime: 2021-10-21 09:52:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/break-out/game/utils.js
 */
const log = console.log.bind(console)

const e = selector => document.querySelector(selector)
const es = selector => document.querySelectorAll(selector)
 
const bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
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