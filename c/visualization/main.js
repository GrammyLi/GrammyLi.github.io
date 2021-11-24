/*
 * @Author: your name
 * @Date: 2021-10-13 20:38:45
 * @LastEditTime: 2021-10-22 20:36:58
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
    const option = {
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [19, 22, 24, 23, 19, 20, 21],
          type: type,
          itemStyle: {
            color: () => {
              var colorList = [
                "#67C23A",
                "#B5C334",
                "#ffa41b",
                "#E87C25",
                "#27727B",
                "#FE8463",
                "#9BCA63",
                "#FAD860",
                "#F3A43B",
                "#60C0DD",
                "#D7504B",
                "#C6E579",
                "#F4E001",
                "#F0805A",
                "#26C0C0",
              ];
              let dataIndex = randomBetween(0, colorList.length)
              return colorList[dataIndex];
            },
          },
        },
      ],
    };
    drawChart(option)
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
  // TODO 画布应该先填充 #fff , 
  init()
  bindEvents()
}
main()