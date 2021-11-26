/*
 * @Author: your name
 * @Date: 2021-11-26 14:54:36
 * @LastEditTime: 2021-11-26 15:25:31
 * @LastEditors: Please set LastEditors
 * @Description: tab 类型切换
 * @FilePath: /search/comp/type.js
 */
const tabAction = {
  clickTab(event) {
    // 更新搜索方式
    let tab = event.target
    let type = tab.dataset.type;
    e('.active').classList.remove('active')
    tab.classList.add('active')
    tabType = type
    init(false)
  },
}