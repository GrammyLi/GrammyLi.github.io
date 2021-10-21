//  load level block
// n  is  level class
const loadLevel = (n, game) => {
    n -= 1
    let blocks = []
    let level = levels[n]
    for (let v of level) {
        // let obj = JSON.parse(v)
        let b = Block(v, game)
        blocks.push(b)
    }

    return blocks
}

// debug  
const enableDebugMode = (enable, game) => {
    if (!enable) {
        return
    }
    //debug 专用功能
    bindEvent(window, 'keydown', (event) => {
        let k = event.key
        if (k == 'p') {
            // 暂停
            // log('暂停')
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            let num = Number(k)
            window.blocks = loadLevel(num, game)
        }
    })
    bindEvent(e('#id-input-speed'), 'input', () => {
        let self = event.target
        // log('value', self.value)
        window.fps = Number(self.value)
    })
}

const __main = () => {

    const rulesBtn = document.getElementById('rules-btn');
    const closeBtn = document.getElementById('close-btn');
    const rules = document.getElementById('rules');

    rulesBtn.addEventListener('click', () => rules.classList.add('show'));
    closeBtn.addEventListener('click', () => rules.classList.remove('show'));
    let images = {
        bg: 'img/bg.jpg',
        ball: 'img/ball.png',
        paddle: 'img/paddle.png',
        block: 'img/block.png',
    }

    let game = DaZhiZiGame.instance(30, images, (g) => {
        let s = SceneTitle.new(g)
        g.runWithScene(s)
        // //debug
        // let enable = true
        // enableDebugMode(enable, game)
    })

}

__main()

