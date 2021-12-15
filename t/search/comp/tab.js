/*
 * @Author: your name
 * @Date: 2021-11-26 14:54:36
 * @LastEditTime: 2021-12-15 13:29:40
 * @LastEditors: Please set LastEditors
 * @Description: tab 类型切换
 * @FilePath: /search/comp/type.js
 */
// 这里针对 search 和 time 类型
const hideTab = (type) => {
  if (type === 'time') {
    show('.g-logo-time')
    hide('.g-logo-engine')
  } else {
    hide('.g-logo-time')
    show('.g-logo-engine')
  }
}


const tabAction = {
  clickTab(event) {
    // 更新搜索方式
    let tab = event.target
    let type = tab.dataset.type;
    e('.active').classList.remove('active')
    tab.classList.add('active')
    hideTab(type)
    type = type === 'time' ? 'search' : type
    tabType = type
    init(false)
  },
}