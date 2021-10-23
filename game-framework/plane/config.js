/*
 * @Author: your name
 * @Date: 2020-10-09 21:55:10
 * @LastEditTime: 2021-10-23 13:18:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/sky_plane/config.js
 */
const config = {
    cloud_speed:  {
        _comment:'白云速度',
        value: 1,
    },
    love_speed:  {
        _comment:'奖品速度',
        value: 1,
    },
    player_speed: {
        _comment:'玩家速度',
        value: 10,
    },
    enemy_speed:  {
        _comment:'敌人速度',
        value: 1,
    },
    enemy_bullet_speed:  {
        _comment:'敌人子弹速度',
        value: 1,
    },
    player_bullet_speed: {
        _comment:'玩家子弹速度',
        value: 4,
    },
    enemy_bullet_cooldown_min: {
        _comment: '敌人开火冷却下限',
        value: 50,
    },
    enemy_bullet_cooldown_max: {
        _comment: '敌人开火冷却上限',
        value: 200,
    },
}


const templateControl = function (key, item) {
    let t = `
                    <div >
                        <label>
                            <input class="g-auto-slider" type="range" value="${item.value}"
                            max="300"
                              data-value="config.${key}">
                            ${item._comment}: <span class="g-label"></span>
                        </label>
                    </div>
                   `
    return t
}

const bindEvents = function () {
    let sliders = es('.g-auto-slider')
    bindAll(sliders, 'input', function (event) {
        let target = event.target
        let bindVar = target.dataset.value
        let v = target.value
        eval(bindVar + '.value =' + v)
        let label = target.closest('label').querySelector('.g-label')
        label.innerText = v
    })
}

const insertControls = function () {
    let div = e('.g-controls')
    let keys = Object.keys(config)
    let t = ''
    for (let k of keys) {
        let item = config[k]
        t += templateControl(k, item)
    }
    appendHtml(div, t)
}

const config_main = function () {
    //从配置文件里生成html控件
    insertControls()
    bindEvents()
    //绑定事件
}
// config_main()

/*
    - 遇到 bug 不要慌
    - 把问题分解
    - 写一点测试一点
 */