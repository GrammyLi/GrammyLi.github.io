/*
 * @Author: your name
 * @Date: 2021-10-14 13:35:59
 * @LastEditTime: 2021-11-26 09:58:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/search/main.js
 */


const templateEngine = ({ id, url, text, search }) => {
  return `
  <div class="g-engine g-engine-${id} g-drag" data-id="${id}" draggable="true">
    <img src="${url}"  data-action="clickEngineCard"  />
    <span data-action="clickEngineCard">${text}</span>
  </div>
  `;
};

const renderEngines = () => {
  let t = window.engines.map((e, i) => templateEngine(e, i)).join("");
  appendHtml(e(".g-engines"), t);
};

const init = () => {
  e('.g-engines').innerHTML = ''
  renderEngines();
  renderLogo();
};

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
  init()
  bindEventDnd()
}

const actions = {
  clickEngineCard(event) {
    // 更新搜索方式
    let engine = event.target.closest(".g-engine");
    let id = Number(engine.dataset.id)
    enginesIds.forEach((i, index) => {
      if (i === id) {
        window.currentEngineIndex = index;
      }
    })
    renderLogo();
  },
  showThemeContainer() {
    show('.g-mask')
    show('.g-theme__container')
    show('.g-theme-empty')
    log('选择主题')
  },
  hideThemeContainer() {
    hide('.g-mask')
    hide('.g-theme__container')
    hide('.g-theme-empty')
  },
  selectTheme(event) {
    let ele = event.target.closest(".g-theme");
    log('ele', ele)
    let theme = ele.dataset.theme
    updateTheme(ele, theme)
    this.hideThemeContainer()
  }
};

addAction(actions, logoAction)
addAction(actions, inputAction)

const bindEventClick = () => {
  bindEvent(e("body"), "click", (event) => {
    let action = event.target.dataset.action;
    log("action", action);
    actions[action] && actions[action](event);
  });
};

const bindEvents = () => {
  bindEventKeyup();
  bindEventClick();
  bindEventDnd();
  bindEventChange();
};

const __main = () => {
  // 当前搜索网站的索引
  window.currentEngineIndex = 2;
  // 搜索的历史记录
  window.historys = []
  init();
  bindEvents();
};

__main();
