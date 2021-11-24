const debug = true
const log = debug ? console.log.bind(console) : function() { }

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

const randomBetween = (start, end) => {
    let n = Math.random() * (end - start + 1)
    return ~~(n + start)
}

const toggle = (element, className) => {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

const removeAllClassName = (sel, className) => {
    let elements = es(sel)
    for (let ele of elements) {
        ele.classList.remove(className)
    }
}

const find = (element, sel) => {
    return element.querySelector(sel)
}

const rjust = function(str, size, delimeter = '0') {
    let result = str
    while (result.length < size) {
        result = delimeter + result
    }
    return result
}

const formatTime = function(sum) {
    let m = String(Math.floor(sum % 3600 / 60))
    let s = String(Math.floor(sum % 60))
    let time = `${rjust(m, 2)}:${rjust(s, 2)}`
    return time
}

const selectConfig = (index) => {
    let levels = ['empty', 'veryEasy', 'medEasy', 'mild', 'medium', 'hard', 'evil', 'impossible']
    let config = {
        empty:[
            [6, 2, 9, 0, 7, 8, 3, 0, 0],
            [0, 0, 0, 0, 4, 3, 7, 0, 0],
            [0, 0, 0, 0, 5, 0, 0, 0, 1],
            [5, 0, 0, 0, 0, 0, 0, 7, 9],
            [0, 3, 0, 8, 9, 0, 0, 6, 0],
            [0, 1, 0, 4, 0, 7, 5, 3, 0],
            [8, 6, 0, 7, 2, 0, 0, 1, 0],
            [0, 9, 0, 3, 8, 6, 0, 5, 0],
            [2, 4, 3, 0, 0, 9, 6, 0, 0],
        ],
        // beginner: 45 hints
        veryEasy: [ // 34 hints
            [0, 0, 5, 0, 0, 2, 0, 0, 6],
            [4, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 6, 0, 8, 9, 0, 5, 1, 4],
            [6, 9, 0, 0, 0, 8, 0, 0, 0],
            [5, 0, 3, 7, 0, 1, 2, 0, 9],
            [0, 0, 0, 5, 0, 0, 0, 8, 7],
            [2, 4, 6, 0, 7, 3, 0, 5, 8],
            [0, 0, 0, 0, 0, 0, 0, 0, 3],
            [8, 0, 0, 2, 0, 0, 7, 0, 0]
        ],
        medEasy: [ // 32 hints
            [0, 7, 3, 0, 0, 0, 6, 4, 0],
            [9, 0, 0, 1, 0, 8, 0, 0, 7],
            [8, 0, 0, 0, 7, 0, 0, 0, 1],
            [0, 2, 0, 0, 6, 0, 0, 7, 0],
            [0, 0, 5, 8, 0, 7, 1, 0, 0],
            [0, 1, 0, 0, 9, 0, 8, 0, 0],
            [2, 0, 0, 0, 3, 0, 0, 6, 0],
            [5, 0, 0, 4, 0, 9, 0, 0, 2],
            [0, 8, 9, 0, 0, 0, 4, 3, 0]
        ],
        mild: [ // 28 hints
            [7, 0, 2, 8, 0, 6, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [8, 0, 0, 4, 0, 0, 2, 0, 7],
            [5, 0, 0, 2, 0, 0, 0, 8, 0],
            [2, 8, 0, 7, 0, 9, 0, 3, 5],
            [0, 1, 0, 0, 0, 8, 0, 0, 6],
            [3, 0, 7, 0, 0, 4, 0, 0, 8],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 9, 0, 7, 1, 0, 2]
        ],
        medium: [ // 24 hints
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [8, 0, 0, 0, 2, 0, 0, 0, 5],
            [0, 0, 0, 0, 0, 6, 2, 4, 0],
            [0, 3, 8, 0, 0, 7, 1, 0, 0],
            [2, 0, 4, 0, 0, 0, 3, 0, 9],
            [0, 0, 7, 4, 0, 0, 5, 2, 0],
            [0, 7, 2, 5, 0, 0, 0, 0, 0],
            [6, 0, 0, 0, 8, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        hard: [ // 27 hints
            [0, 9, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 0, 1, 9, 0, 0, 8, 2, 4],
            [0, 0, 5, 0, 0, 0, 0, 1, 7],
            [0, 0, 0, 4, 3, 7, 0, 0, 0],
            [4, 6, 0, 0, 0, 0, 9, 0, 0],
            [9, 4, 3, 0, 0, 5, 2, 0, 0],
            [2, 0, 0, 0, 9, 0, 0, 0, 0],
            [0, 0, 0, 0, 4, 0, 0, 3, 0]
        ],
        evil: [ // 26 hints
            [0, 0, 1, 0, 0, 7, 0, 6, 0],
            [4, 0, 0, 6, 0, 0, 3, 0, 5],
            [6, 0, 0, 0, 0, 0, 0, 4, 0],
            [0, 0, 0, 5, 0, 9, 0, 0, 0],
            [0, 1, 4, 0, 0, 0, 2, 7, 0],
            [0, 0, 0, 7, 0, 2, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0, 1],
            [7, 0, 8, 0, 0, 6, 0, 0, 4],
            [0, 4, 0, 2, 0, 0, 8, 0, 0]
        ],
        impossible: [ // 17 hints
            [0, 0, 0, 7, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 4, 3, 0, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 6],
            [0, 0, 0, 5, 0, 9, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 4, 1, 8],
            [0, 0, 0, 0, 8, 1, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 5, 0],
            [0, 4, 0, 0, 0, 0, 3, 0, 0]
        ],
    }
    let k = levels[index]
    let v = config[k]
    return v
}