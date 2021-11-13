const log = console.log.bind(console)

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `选择器 ${selector} 写错了, 请仔细检查的选择器`
        alert(s)
        //
        return null
    } else {
        return element
    }
}

 
const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    return elements
}

const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const bindAll = function(selector, eventName, callback) {
    let elements = es(selector)
    for (let e of elements) {
        e.addEventListener(eventName, callback)
    }
}

const bindEventDelegate = function(element, eventName, callback, responseClass) {
    bindEvent(element, eventName, (event) => {
        let self = event
        if (self.classList.contains(responseClass)) {
            callback()
        }
    })
}

const append = function(selector, html) {
    document.querySelector(selector).insertAdjacentHTML('beforeend', html)
}
 
const ensure = function(condition, message) {
    if (!condition) {
        log('测试失败', message)
    } else {
        log('测试成功')
    }
}

const int = n => parseInt(n, 10)