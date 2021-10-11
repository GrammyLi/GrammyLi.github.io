const init_map = (n) => {
    let l = []
    for (let i = 0; i < n; i++) {
        let a = []
        for (let j = 0; j < n; j++) {
            a.push(0)
        }
        l.push(a)
    }
    return l
}

window.config = {
    current_color: 5, //选择的颜色
    debug_length: 30, // 
    n: 10, // widht or height
    space: 1,
}

// window.map_data = init_map(config.n)
window.map_data =  [
    [12, 12, 12, 12, 12, 12, 12, 12, 19, 19],
    [12, 0, 12, 1, 1, 1, 1, 1, 19, 19],
    [12, 0, 0, 12, 1, 23, 1, 1, 1, 1],
    [12, 12, 0, 12, 1, 1, 1, 22, 1, 19],
    [12, 12, 12, 12, 1, 23, 1, 1, 1, 0],
    [12, 12, 12, 1, 1, 1, 1, 1, 1, 19],
    [12, 12, 12, 12, 12, 12, 12, 1, 1, 1],
    [12, 12, 0, 12, 12, 12, 12, 1, 1, 19],
    [12, 12, 0, 12, 12, 12, 12, 1, 1, 1],
    [12, 12, 12, 12, 12, 12, 12, 12, 19, 1],
]
window.colors = [
    '#000000',
    '#000000',
    '#8b8275',
    '#8c040a',
    '#8b8218',
    '#108213',
    '#118275',
    '#020a75',
    '#8c0d75',
    '#8b8235',
    '#044236',
    '#1682fc',
    '#064276',
    '#8c25fc',
    '#8b420e',
    '#ffffff',
    '#c8c2ba',
    '#fd0d1b',
    '#fffe38',
    '#29fe2f',
    '#2dffff',
    '#0b24fc',
    '#fd29fd',
    '#fffe75',
    '#2afe76',
    '#8bffff',
    '#8c83fd',
    '#fd1476',
    '#fe8235',
]

const temptale_color = (i) => {
    let c = colors[i]
    let t = `
    <div class="color" data-number='${i}' data-action="select_color" data-color="${c}" style="background: ${c};"></div>
    `
    return t
}

const temptale_colors = () => {
    let t = ''
    for (let i = 1; i < len(colors); i++) {
        t += temptale_color(i)
    }
    return t
}

const change_current_color = () => {
    let current = e('#id-color-current')
    let color_index = int(current.dataset.number)
    log('color_index', color_index)
    current.style.background = window.colors[color_index]
}

const init_select_colors = () => {
    let container = e('.colors')
    let t = temptale_colors()
    appendHtml(container, t)
    change_current_color()
}

const init_draw_map = () => {
    let [x, y] = [0, 0]
    let space = config.space
    let debug_length = config.debug_length
    let l = debug_length
    for (let i = 0; i < len(map_data); i++) {
        let line = map_data[i]

        for (let j = 0; j < len(line); j++) {
            // draw square
            // log('number', number)
            let y1 = x + (l + space) * j + space
            let x1 = y + (l + space) * i + space
            let index = map_data[i][j]
            let color = colors[index]
            // log('color', color)
            t.rect(x1, y1, debug_length, debug_length, color, 'black')
        }
    }
}

const isShowSquare = (x, y) => {
    let w = len(map_data[0])
    let h = len(map_data)
    let rule_w = x >= 0 && x <= w - 1
    let rule_h = y >= 0 && y <= h - 1
    return rule_w && rule_h
}

const change_color = (i, j) => {
    map_data[i][j] = map_data[i][j] === 0 ? window.config.current_color : 0
}

const rerender_map = () => {
    clear()
    init_draw_map()
    show_pixels()
}

const draw_pixel = (x, y, l, number) => {
    if (int(number) != 0) {
        let color = window.colors[number]
        // let color = 'pink'
        t.rect(x, y, l, l, color, color)
    }
}

const draw_pixels = (x, y, factor, pixels) => {
    let length = config.debug_length
    let l = length / factor
    let space = 0
    let n = len(pixels)
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let x1 = x + (l + space) * i - factor
            let y1 = y + (l + space) * j - factor
            let number = pixels[i][j]
            draw_pixel(x1, y1, l, number)
        }
    }
}

const show_pixels = () => {
    // draw_pixels(400, 200, 3, window.map_data)
    // draw_pixels(100, 400, 3, window.map_data)
    // draw_pixels(400, 400, 6, window.map_data)
}
 
const actions = {
    show_content(event) {
        let target = event.target
        // 得到坐标
        let rect = target.getBoundingClientRect()
        let x = event.clientX - rect.left
        let y = event.clientY - rect.top
        let space = 0
        let debug_length = config.debug_length
        let pixelWidth = debug_length + space   // tileSize
        let i = Math.floor(x / pixelWidth)
        let j = Math.floor(y / pixelWidth)
        // i row
        // j colums
        // 一行有   5个
        if (isShowSquare(i, j)) {
            change_color(i, j)
            rerender_map()
        }
    },
    select_color(event) {
        let color = event.target
        let index = int(color.dataset.number)

        let current = e('#id-color-current')
        current.dataset.number = index

        window.config.current_color = index
        change_current_color()
    },
    clear_content(event) {
        window.map_data = init_map(config.n)
        rerender_map()
    },
}

const bindEvents = () => {
    let body = document.querySelector('body')
    bindEvent(body, 'click', event => {
        let action = event.target.dataset.action
        // log('action', action)
        actions[action] && actions[action](event)
    })
}

const init = () => {
    init_draw_map()
    init_select_colors()
}

const main = () => {
    init()
    bindEvents()
}
main()



 
