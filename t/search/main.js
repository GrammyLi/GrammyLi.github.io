/*
 * @Author: grammyli
 * @Date: 2021-10-14 13:35:59
 * @LastEditTime: 2021-11-26 13:27:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/search/main.js
 */
const init = (isFirst = true) => {
  if (isFirst) {
    // 当前搜索网站的索引
    window.currentEngineIndex = 2;
    // 搜索的历史记录
    window.historys = [];
  }
  e(".g-engines").innerHTML = "";
  renderEngines();
  renderLogo();
};

const addActions = () => {
  window.actions = {};
  const as = [
    logoAction,
    inputAction,
    engineAction,
    themeAction,
  ]
  as.forEach(a => {
    addAction(actions, a);
  })
};

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
  addActions()
};

const __main = () => {
  init();
  bindEvents();
};

__main();
