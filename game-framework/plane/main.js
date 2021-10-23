/*
 * @Author: your name
 * @Date: 2020-10-09 21:52:10
 * @LastEditTime: 2021-10-23 13:19:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/sky_plane/main.js
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
        }
    })
}


const __main = () => {
    let images = {
        player_bullet: 'img/bullet/player_bullet0.png',
        cloud0: 'img/cloud/cloud0.png',
        cloud1: 'img/cloud/cloud1.png',
        player: 'img/player.png',
        sky: 'img/bg/sky0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        fire: 'img/6.png',
        enemy_bullet: 'img/enemyFire.png',
        love: 'img/love.png',
    }

    let game = DaZhiZiGame.instance(30, images, (g) => {
        let s = SceneTitle.new(g)
        g.runWithScene(s)
        // let enable = true
        // enableDebugMode(enable, game)
    })

}

__main()