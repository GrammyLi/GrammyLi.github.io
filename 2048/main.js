const randomPosition = () => {
    let zeros = getZeroData()
    let l = zeros.length
    // TODO 判断游戏是否结束
    let i = randomBetween(0, l - 1)
    let p = zeros[i]

    return p
}

const insertNumber = (position) => {
    let [x, y] = position
    let sel = `.g-td-${x}-${y}`

    let td = e(sel)
    // log('td', td)
    let span = find(td, 'span')
    span.classList.remove('new-one')

    let v = data[x][y]
    if (v !== 0) {
        // log('x', x, 'y', y)
        let className = `n${v}`
        span.classList.add(className)

        span.innerHTML = v
    }
}

const insertNumberNewOne = (position) => {
    let [x, y] = position
    let sel = `.g-td-${x}-${y}`
    log('sel', sel)
    let td = e(sel)
    log('td', td)
    let span = find(td, 'span')
    span.classList.add('new-one')
}

const clearNumber = (position) => {
    let [x, y] = position
    let sel = `.g-td-${x}-${y}`
    log('sel clear Number', sel)
    let td = e(sel)
    log('td', td)
    // log('td', td)
    let span = find(td, 'span')
    let v = data[x][y]
    if (v !== 0) {
        let className = `n${v}`
        span.classList.remove(className)

        span.innerHTML = ''
    }
}

const clearData = () => {
    for (let i = 0; i < len(data); i++) {
        let line = data[i]
        for (let j = 0; j < len(line); j++) {
            let p = [i, j]
            clearNumber(p)
        }
    }
}

const renderData = () => {
    for (let i = 0; i < len(data); i++) {
        let line = data[i]
        for (let j = 0; j < len(line); j++) {
            let p = [i, j]
            insertNumber(p)
        }
    }
}

const getZeroData = () => {
    let l = []
    for (let i = 0; i < len(data); i++) {
        let line = data[i]
        for (let j = 0; j < len(line); j++) {
            let p = [i, j]
            let v = data[i][j]
            if (v == 0) {
                l.push(p)
            }
        }
    }
    return l
}

const addNumber = () => {
    //  数据改变
    let [x, y] = randomPosition()
    window.data[x][y] = 2
    // 页面改变  同时有 css 效果
    insertNumber([x, y])
    insertNumberNewOne([x, y])

    let timeId = setTimeout(() => {
        renderData()
    }, 500)
}

const init = () => {
    // 数据备份
    window.datas = []
    window.data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]

    renderData()

    // 开始默认生成一个数字
    addNumber()

    // 数据备份
    window.datas = []
    updateScore()
}

const saveData = () => {
    window.datas.push(copy(window.data))
}

const addMergerAnimation = (positions) => {
    for (let p of positions) {
        let [x, y] = p
        let sel = `.g-td-${x}-${y}`
        log('self add merger', sel)
        let td = e(sel)
        log('td', td)
        if (!td) {
            return
        }
        let span = find(td, 'span')
        span.classList.add('merge-one')
    }
}

const renderMergeData = (positions) => {
    addMergerAnimation(positions)

    // render marge data
    renderData()
}

const mergeData = (direction) => {
    let d = direction
    let positions
    if (d === 'left' || d === 'right') {
        // 需要添加 合并动画的坐标
        positions = lineSlide(d)
    } else if (d === 'down' || d === 'up') {
        // 需要添加 合并动画的坐标
        positions = horizonSlide(d)
    }
    // 同时加渲染数据
    renderMergeData(positions)
}

const moveNumbers = (direction) => {
    // 数据备份
    saveData()
    // 先清空页面数据
    clearData()

    // 合并
    mergeData(direction)
    // 重新添加 数字 2
    addNumber()
}

const bindSlide = () => {
    let slide = SlideDirection.instance()
    document.addEventListener('touchstart', function(event) {
        slide.setStart(event)
    }, false)
    document.addEventListener('touchend', function(event) {
        slide.setEnd(event)
        let d = slide.direction()
        log('direction', d)
        if (d === '') {
            return
        } else {
            moveNumbers(d)
        }
        updateScore()
    }, false)
}

window.option = {
    score: 0,
    max_score: 1010,
}

const updateScore = () => {
    e('#id-score-now').innerHTML = window.option.score
    e('#id-score-record').innerHTML = window.option.max_score
}

const bindNewGame = () => {
    bindEvent(e(''))
}

const actionNewGame = () => {
    // 先清空页面数据
    clearData()
    init()
}

const actionCheatGame = () => {
    log('window.datas', datas)
    window.datas.pop()
    window.data = window.datas[window.datas.length - 1]
    log('data', data)
    clearData()
    renderData()
}

const bindGame = () => {
    let control = e('.feature-game')
    bindEvent(control, 'click', (event) => {
        let self = event.target
        log('self', self)
        if (self.classList.contains('g-new-game')) {
            actionNewGame()
        }
        if (self.classList.contains('g-cheat')) {
            actionCheatGame()
        }
    })
}

const bindEvents = () => {
    bindSlide()
    bindGame()
}

const __main = () => {
    init()
    bindEvents()
}

__main()