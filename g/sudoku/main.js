window.map_data = [
    [6, 2, 9, 0, 7, 8, 3, 0, 0],
    [0, 0, 0, 0, 4, 3, 7, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 1],
    [5, 0, 0, 0, 0, 0, 0, 7, 9],
    [0, 3, 0, 8, 9, 0, 0, 6, 0],
    [0, 1, 0, 4, 0, 7, 5, 3, 0],
    [8, 6, 0, 7, 2, 0, 0, 1, 0],
    [0, 9, 0, 3, 8, 6, 0, 5, 0],
    [2, 4, 3, 0, 0, 9, 6, 0, 0],
]

const startPositions = () => {
    let l = [0, 3, 6]
    let positions = []
    for (let i of l) {
        for (let j of l) {
            let p = [i, j]
            positions.push(p)
        }
    }
    // log('positions', positions)
    return positions
}

const numbersSquare = (data, position) => {
    let [x, y] = position
    let line = []
    let p_line = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let number = data[x + i][y + j]
            line.push(number)
            let p = [x + i, y + j]
            let o = {
                position: p,
                number,
            }
            p_line.push(o)
        }
    }
    return [line, p_line]
}

const clearMapData = (data) => {
    let ps = startPositions()
    let l = []
    window.positons_data = []
    for (let p of ps) {
        let [line, p_line] = numbersSquare(data, p)
        l.push(line)
        positons_data.push(p_line)
    }
    return l
}

// log('map_data', map_data)
// clearMapData(map_data)
// log('map_position', positons_data)
/*
0 3 6
- 显示数据   done
- 事件 点击
    - 算法  done
- 游戏结束 done
- 时间
    - 打开网页直接开始游戏，并且计时 done

- 点击new puzzle
    - 切换 map_data,并且重新渲染

- 添加 re start 和 pause game

- 添加滑调 选择关卡
*/

const factPosition = (x, y) => {
    let o = window.positons_data[x][y]
    let new_x = o.position[0]
    let new_y = o.position[1]
    return [new_x, new_y]
}

const templateNumber = (number, x, index) => {
    let n = number == 0 ? '' : number
    let i = index + 1
    let y = index
    let [new_x, new_y] = factPosition(x, y)
    t = `
         <div class="cell cell-${new_x}-${new_y}" data-x="${new_x}" data-y="${new_y}" >
             <span class="label">${i}</span>
             <span class="value">${n}</span>
         </div>
    `
    return t
}

const templateSquare = (x, line) => {
    let t = ''
    for (let i = 0; i < line.length; i++) {
        let n = line[i]
        t += templateNumber(n, x, i)
    }
    let r = `
    <div class="square"> ${t} </div>
    `
    return r
}

const templateRow = (x, numbers) => {
    let ns = numbers
    let t = ''
    for (let i = 0; i < ns.length; i++) {
        let line = ns[i]
        t += templateSquare(x + i, line)
    }
    let r = `
    <div class="s-row">
        ${t}
    </div>`
    return r
}

const templateRows = (numbers) => {
    let t = ''
    for (let i = 0; i < numbers.length; i += 3) {
        let ns = numbers.slice(i, i + 3)
        t += templateRow(i, ns)
    }
    return t
}

const insertNumbers = (data) => {
    data = clearMapData(data)
    let t = templateRows(data)
    appendHtml(e('.sudoku'), t)
}

const templateChangeNumbers = () => {
    let t = ''
    for (let i = 0; i < 9; i++) {
        let n = i + 1
        t += `
        <div class="number" data-number="${n}">
            ${n}
       </div>
        `
    }
    return t
}

const insertChangeNumbers = () => {
    let t = templateChangeNumbers()
    appendHtml(e('.numbers-bar'), t)
}

const initHtml = data => {
    insertNumbers(data)
    insertChangeNumbers()
}
 
const updateTime = () => {
    let [m, s] = formatTime(window.total_time).split(':')
    e('.minutes').innerText = m
    e('.seconds').innerText = s
}

const initTime = () => {
    window.total_time = 0
    window.timeId = setInterval(() => {
        window.total_time += 1
        updateTime()
    }, 1000)
}

const init = () => {
    window.change_map_data = copy(map_data)
    let data = copy(map_data)
    initHtml(data)
    initTime()
}

window.option = {
    position: null, // [x, y]
    number: -1,
}

const clearOption = () => {
    window.option = {
        position: null, // [x, y]
        number: -1,
    }
}

const bindClickMapNumber = () => {
    bindEvent(e('.sudoku'), 'click', event => {
        let self = event.target.parentElement
        log('self sudoku', self)
        removeAllClassName('.selected', 'selected')
        if (self.classList.contains('cell')) {
            // window.option.number = -1
            clearOption()
            self.classList.add('selected')
            let x = Number(self.dataset.x)
            let y = Number(self.dataset.y)
            if (map_data[x][y] == 0) {
                window.option.position = [x, y]
            }
        }
    })
}

const selectedNumber = number => {
    let [x, y] = window.option.position
    let sel = `.cell-${x}-${y}`
    find(e(sel), '.value').innerText = number
    change_map_data[x][y] = number
    changeNumberCss(x, y)
}

const isValidNumber = (x, y) => {
    // 行 列 宫
    let v = window.change_map_data[x][y] 
    // 行
    for (let i = 0; i < window.change_map_data[x].length; i++) {
        let e = window.change_map_data[x][i] 
        if (v == e && i != y) {
            log('行 不合法')
            return false
        }
    }
    let time = 0
    // 列
    for (let i = 0; i < window.change_map_data.length; i++) {
        let line = window.change_map_data[i]
        for (let j = 0; j < line.length; j++) {
            let e = line[y] 
            // log('e', e, 'i', i, 'j', j)
            if (v == e && i != x) {
                log('列 不合法')
                return false
            }
        }
        
    }
    // 宫  确定他是那个宫
    let row = Math.floor(x / 3)
    let col = Math.floor(y / 3)
    let index = row * col
    let data = clearMapData(change_map_data)
    time = 0
    for (let i = 0; i < data[index].length; i++) {
        let e = data[index][i]
        if (time == 2) {
            log('宫 不合法')
            return false
        }
        if (e == v) {
            time += 1
        }
    }
    log('合法')
    return true
}

const changeNumberCss = (x, y) => {
    let sel = `.cell-${x}-${y}`
    let element = e(sel)
    if (isValidNumber(x, y)) {
        element.classList.remove('error')
        element.classList.add('valid')
    } else {
        element.classList.remove('valid')
        element.classList.add('error')
    }
}

const bindClickChangeNumber = () => {
    bindEvent(e('.numbers-bar'), 'click', event => {
        let self = event.target
        // log('self', self)
        if (self.classList.contains('number')) {
            let number = Number(self.dataset.number)
            window.option.number = number
            if (window.option.position != null) {
                selectedNumber(number)
                winGame()
            }
        }
    })
}

const winGame = () => {
    // change_map_data 没有 0
    for (let i = 0; i < window.change_map_data.length; i++) {
        let line = window.change_map_data[i]
        for (let j = 0; j < line.length; j++) {
            if (line[j] === 0) {
                return 
            }
        }
    }
    // 不包含 error
    let numbers = es('.error')
    if (numbers.length > 0) {
        return
    }
    alert('你赢了 真棒')
}

const reInitHtml = () => {
    clearOption()
    clearInterval(window.timeId)
    window.total_time = 0
    e('.sudoku').innerHTML = ''
    e('.numbers-bar').innerHTML = ''
    init()
}

const bindClickNewPuzzle = () => {
    bindEvent(e('.davizi-new-game'), 'click', event => {
        let self = event.target
        let c = e('.container')
        let index = Number(c.dataset.active)
        let total = Number(c.dataset.total)
        let new_index = (index + total + 1) % total
        c.dataset.active = new_index
        window.map_data = selectConfig(new_index) 
        reInitHtml()
    })
}

const actionPause = () => {
    clearInterval(window.timeId)
    e('.davizi-change-number').classList.add('hide')
    e('.sudoku').classList.add('hide')
}

const actionStart = () => {
    e('.davizi-change-number').classList.remove('hide')
    e('.sudoku').classList.remove('hide')
    window.timeId = setInterval(() => {
        window.total_time += 1
        updateTime()
    }, 1000)
}

const bindClickButtons = () => {
    bindEvent(e('.davizi-button'), 'click', event => {
        let self = event.target
        let actions = {
            'actionPause': actionPause,
            'actionStart': actionStart,
        }
        e('.btn-danger').classList.remove('btn-danger')
        if (self.classList.contains('btn')) {
            self.classList.add('btn-danger')
            let actionName = self.dataset.action
            log('actionName', actionName)
            actions[actionName]()
        }
    })
}

const bindInputLevel = () => {
    bindEvent(e('.difficulty'), 'input', event => {
        let self = event.target
        // log('input self', self)
        let new_index = int(self.value)
        
        let c = e('.container')
        c.dataset.active = new_index
        window.map_data = selectConfig(new_index) 
        reInitHtml()
    })
}

const bindEvents = () => {
    bindClickMapNumber()
    bindClickChangeNumber()
    bindClickNewPuzzle()
    bindClickButtons()
    bindInputLevel()
}

const __main = () => {
    init()
    bindEvents()
}

__main()