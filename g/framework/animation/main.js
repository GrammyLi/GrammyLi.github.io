/*
 * @Author: your name
 * @Date: 2019-10-31 20:11:06
 * @LastEditTime: 2021-10-22 09:50:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/animation/main.js
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
          
        }
    })
    bindEvent(e('#id-input-speed'), 'input', () => {
        let self = event.target
        // log('value', self.value)
        window.fps = Number(self.value)
    })
}

const __main = () => {
    let images = {
        bullet: './img/bullet/player_bullet0.png',
        cloud0: 'img/cloud/cloud0.png',
        cloud1: 'img/cloud/cloud1.png',
        player: 'img/player.png',
        sky: 'img/bg/sky0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        fire: 'img/6.png',
        // run
        run1: 'img/run/img1.png',
        run2: 'img/run/img2.png',
        run3: 'img/run/img3.png',
        run4: 'img/run/img4.png',
        run5: 'img/run/img5.png',
        run6: 'img/run/img6.png',
        // stand
        stand1: 'img/defen/img1.png',
        stand2: 'img/defen/img2.png',
        stand3: 'img/defen/img3.png',
        stand4: 'img/defen/img4.png',
        stand5: 'img/defen/img5.png',
        stand6: 'img/defen/img6.png',
        stand7: 'img/defen/img7.png',
        stand8: 'img/defen/img8.png',
        stand9: 'img/defen/img9.png',
        stand10: 'img/defen/img10.png',
        stand11: 'img/defen/img11.png',
        // bg
        bk: 'img/defen/bk.jpg',
    }

    let game = DaZhiZiGame.instance(30, images, (g) => {
        log('main g', g)
        let s = SceneTitle.new(g)
        // let s = Scene.new(g)
        g.runWithScene(s)
        //debug
        let enable = true
        enableDebugMode(enable, game)
    })

}

__main()


/**
 *  2d block.game.9.23
   心得： 关卡编辑器（用户自定义） arr 中只含有 str 才能使用 includes (api)
    eg  
     let arr = [{x: 1}, {x: 2}]
     let obj = {x: 1}
     let status = arr.includes(obj)
     // false
     log('status', status)
        利用 localStorage.blocks 
    未解决：
        矩形相交（45度重叠碰撞， 速度方向改变）  x.speed *= -1  y.speed *= -1
        根据 ball 碰撞 paddle 的位置 设置相应速度
        李胜利
 */