/*
 * @Author: your name
 * @Date: 2020-02-26 21:16:08
 * @LastEditTime: 2021-11-12 20:11:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/bird/main.js
 */
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
        }
    })
}

const __main = () => {
    let images = {
        // bg: 'img/bg_day.png',
        // title: 'img/title.png',
        // game_over: 'img/game_over.png',
 
        //number
        0: 'img/number/0.png',
        1: 'img/number/1.png',
        2: 'img/number/2.png',
        3: 'img/number/3.png',
        4: 'img/number/4.png',
        5: 'img/number/5.png',
        6: 'img/number/6.png',
        7: 'img/number/7.png',
        8: 'img/number/8.png',
        9: 'img/number/9.png',
    }

    let game = DaZhiZiGame.instance(30, images, (g) => {
        let s = SceneTitle.new(g)
        // let s = Scene.new(g)
        g.runWithScene(s)
        //debug
        let enable = true
        enableDebugMode(enable, game)
    })

}

__main()
