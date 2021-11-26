/*
 * @Author: your name
 * @Date: 2021-11-26 09:25:34
 * @LastEditTime: 2021-11-26 13:29:21
 * @LastEditors: Please set LastEditors
 * @Description: 选择主题
 * @FilePath: /search/comp/theme.js
 */
const updateHeader = (ele, theme) => {
  let head = e('.g-current-theme')
  let headTheme = head.dataset.theme
  head.dataset.theme = theme
  head.src = `./img/${theme}.svg`
  ele.dataset.theme = headTheme
  ele.querySelector('img').src = `./img/${headTheme}.svg`  
  // log('headTheme[0].toUpperCase()', headTheme[0].toUpperCase())
  headTheme[0] = headTheme[0].toUpperCase()
  ele.querySelector('span').innerHTML = headTheme 
}

const updateTheme = (ele, theme) => {
  updateHeader(ele, theme)
  window.currentTheme = theme
  // 更新 logo 或者
  updateEnginesIds()
  init(false)
  bindEventDnd()
}

const themeAction = {
  showThemeContainer() {
    show('.g-mask')
    show('.g-theme__container')
    // show('.g-theme-empty')
    log('选择主题')
  },
  hideThemeContainer() {
    hide('.g-mask')
    hide('.g-theme__container')
   // hide('.g-theme-empty')
  },
  selectTheme(event) {
    let ele = event.target.closest(".g-theme");
    log('ele', ele)
    let theme = ele.dataset.theme
    updateTheme(ele, theme)
    this.hideThemeContainer()
  }
}