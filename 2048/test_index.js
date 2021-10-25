const log = console.log.bind(console)
const len = arr_or_str => arr_or_str.length
const copy = arr_or_obj => {
    let a = JSON.parse(JSON.stringify(arr_or_obj))
    return a
}
/*
[2, 2, 4, 0]   => [4, 0, 4, 0] =>  [4, 4, 0, 0]
[2, 2, 4, 4]   => [4, 0, 8, 0] =>  [4, 8, 0, 0]
[2, 2, 2, 2]   => [4, 0, 4, 0] =>   [4, 4, 0, 0]
 */
let data = [
    [2, 2, 4, 0],
    [2, 2, 4, 4],
    [2, 2, 2, 2],
    [2, 2, 2, 2]
]

const mergeLine = (index, line) => {
    let v = line[index]
    for (let i = index + 1; i < len(line); i++) {
        if (v == line[i]) {
            // 合并数字
            line[index] = v * 2
            // 清空对应位置数字
            line[i] = 0
            // index 合并的位置 就是 y 的位置
            return index
        }
    }
    return -1
}
// data [ [ 4, 0, 4, 0 ], [ 4, 0, 8, 0 ], [ 4, 0, 4, 0 ], [ 4, 0, 4, 0 ] ]
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
    new_line = line
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
// lineSlide('right')

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
// horizonSlide('up')

let arr = [0, 1, 2, 4]
let r = arr.pop()
log('r', r, 'arr', arr)
let a = arr.slice(-1)
log('a', a)