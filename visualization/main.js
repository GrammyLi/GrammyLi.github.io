/*
 * @Author: your name
 * @Date: 2021-10-13 20:38:45
 * @LastEditTime: 2021-10-13 21:01:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/visualization/main.js
 */
const actions = {
  clear_content(event) {
    clear()
  },
  select_chart(event) {
    clear()
    window.type = event.target.dataset.chart
    const charts = {
      rect: draw_rect_chart,
      line: draw_line_chart,
    }
    charts[type](days)
  },
  download_image() {
    let a = document.createElement("a")
    a.download = window.type
    a.href = document.querySelector('.grammy-canvas').toDataURL("image/png")
    document.body.appendChild(a)
    a.click()
    a.remove()
  },
}

const bindEvents = () => {
  let body = document.querySelector('body')
  on(body, 'click', event => {
      let action = event.target.dataset.action
      actions[action] && actions[action](event)
  })
}

const init = () => {
  window.type = 'rect'
  // 默认显示柱形图
  draw_rect_chart(days)
}

const main = () => {
  init()
  bindEvents()
}
main()