/*
 * @Author: your name
 * @Date: 2020-03-29 21:04:12
 * @LastEditTime: 2021-10-23 13:34:02
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/bird/config.js
 */
var config = {
    pipe_space: {
        _comment: '两根管子垂直方向的间距',
        value: 350,
    },
    transverse_space: {
        _comment: '两根管子水平方向的间距',
        value: 150,
    },
}

const templateControl = (key, item) => {
    let i = item
    let t = `
    <label>
        <input 
         class="auto-slider" 
         type="range" 
         data-value="config.${key}"
         max="1000"
         value="${i.value}">
        ${i._comment}: <span class="label"> ${key} </span>
    </label>
    `
    return t
}
const insertControls = () => {
    let control = e('.g-controls')
    let keys = Object.keys(config)
    for (let k of keys) {
        let item = config[k]
        let html = templateControl(k, item)
        appendHtml(control, html)
     }
}
const bindEvents = () => {
    let sliders = es('.auto-slider')
    bindAll(sliders, 'input', (event) => {
        let target = event.target
        let bindVar = target.dataset.value
        let v = target.value
        // log('v', v)
        eval(bindVar + '.value =' + v)
        let label = target.closest('label')
        let l = find(label, '.label')
        l.innerText = v
    })
}
const main = () => {
    // 从配置中生成 hmlt 控件
    insertControls()
    bindEvents()
}
main()