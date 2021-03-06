const updateTimer = () => {
    clearInterval(window.timeId)
    window.total_time = 0
    window.timeId = setInterval(() => {
        window.total_time += 1
        let time = formatTime(window.total_time)
        e('.magician-timer').innerHTML = time
    }, 1000)
}

// 清空游戏的内容：更新图片数据、定时器清零、尝试次数和匹配次数置零
const clearGameContent = () => {
    // 宝可梦清空
    e('.cardArea').innerHTML = ''
    // Todo 定时器清零 
    updateTimer()
    // 尝试次数和匹配次数置零
    e('.magician-attempts').innerText = 0
    e('.magician-matches').innerText = 0
    // 数据清零
    window.clickTime = 0
    window.firstPosition = -1
    window.attempts = 0
    window.matches = 0
}

const templatePokemon = (picturesIndex, index) => {
    let url = `./img/${pictures[picturesIndex]}`
    let t = `
    <div class="cardContainer" data-index=${index} data-picturesIndex=${picturesIndex}>
        <div class="card">
            <div class="cardFront  cardFront-${index}">
                <img class="cardFront" src=${url}>
            </div>

            <div class="cardBack cardBack-${index}">
                <img class="card-logo" src="./img/daycare.jpg">
            </div>
        </div>
    </div>
    `
    return t
}

const renderPokemons = pokemons => {
    let container = e('.cardArea')
    let t = ''
    for (let i = 0; i < pokemons.length; i++) {
        let p = pokemons[i]
        t += templatePokemon(p, i)
    }
    appendHtml(container, t)
}

// 获取不同的索引
const notCommonNumber = (arr, start, end) => {
    let n = randomBetween(start, end)
    if (arr.includes(n)) {
      return notCommonNumber(arr, start, end)
    }
    return n
}

// 获取新的宝可梦们
const getPokemons = (pokemonNumber = 9) => {
    let l = window.pictures.length
    let a = []
    for (let i = 0; i < pokemonNumber; i++) {
       let n = notCommonNumber(a, 0, l - 1)
       a.push(n)
    }
   
    let twainPokemons = [...a, ...a]
    // log('twain', twainPokemons)
    return shuffle(twainPokemons)
}
 
// 游戏的初始化
const init = () => {
    clearGameContent()
    // 选取九组数据
    window.pokemons = getPokemons()
    renderPokemons(pokemons)
}

// 点击开始游戏
const bindStartGame = () => {
    bindAll(es('.magician-start-game'), 'click', event => {
        let hide = 'hidden'
        let game = e('.game')
        if (game.classList.contains(hide)) {
            game.classList.remove(hide)
            e('.start').classList.add(hide)
        }
        init()
    })
}

// 点击退出游戏
const bindBackGame = () => {
    bindEvent(e('.magician-back-game'), 'click', event => {
        let hide = 'hidden'
        let game = e('.game')
        game.classList.add(hide)
        e('.start').classList.remove(hide)
    })
}

// 点击重置游戏
const bindResetGame = () => {
    bindEvent(e('.magician-reset-game'), 'click', event => {
        init()
    })
}

const updateGameInfo = () => {
    e('.magician-attempts').innerText = window.attempts
    e('.magician-matches').innerText = window.matches

    if (window.matches == 9) {
        alert('game win')
        clearInterval(window.timeId)
    }
}

const actionClickCard = card => {
    let cardBack = card.querySelector('.cardBack')
    // 如果此牌被点击，那么点击无效
    if (cardBack.classList.contains('hidden')) {
        return
    }
    // 点击有效
    window.clickTime += 1
    // 所有点击次数
    window.attempts += 1
    let cardFront = card.querySelector('.cardFront')
    if (window.clickTime == 1) {
        cardFront.classList.remove('hidden')
        cardBack.classList.add('hidden')
        
        // 记录，第一次点击的位置
        window.firstPosition = Number(card.dataset.index)
    }
    if (window.clickTime == 2) {
        cardFront.classList.remove('hidden')
        cardBack.classList.add('hidden')

        // 第二次点击的位置
        secondPosition = Number(card.dataset.index)
        if (pokemons[firstPosition] !== pokemons[secondPosition]) {
            setTimeout(() => {
                let className = 'hidden'
                let selFirstFont = `.cardFront-${firstPosition}`
                let selFirstBack = `.cardBack-${firstPosition}`
                e(selFirstFont).classList.add(className)
                e(selFirstBack).classList.remove(className)

                let selSecondFont = `.cardFront-${secondPosition}`
                let selSecondBack = `.cardBack-${secondPosition}`
                e(selSecondFont).classList.add(className)
                e(selSecondBack).classList.remove(className)
                window.firstPosition = -1
                window.clickTime = 0
            }, 1000)
        } else {
            window.firstPosition = -1
            window.clickTime = 0
            window.matches += 1
        }
    }
    updateGameInfo()
}

const bindClickCards = () => {
    bindEvent(e('.cardArea'), 'click', event => {
        let target = event.target
        let card = target.closest('.cardContainer')
        actionClickCard(card)
    })
}

const bindEvents = () => {
    bindStartGame()
    bindBackGame()
    bindResetGame()
    bindClickCards()
}

const __main = () => {
    // 点击的次数
    window.clickTime = 0
    window.firstPosition = -1
    window.pictures = [
        "pichu.png",
        "cleffa.png",
        "azuril.png",
        "igglybuff.png",
        "munchlax.png",
        "teddiursa.png",
        "togepi.png",
        "wynaut.png",
        "happiny.png",
        "2.jpg",
    ]

    window.attempts = 0
    window.matches = 0

    bindEvents()
}

__main()