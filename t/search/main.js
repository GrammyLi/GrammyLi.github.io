/*
 * @Author: grammyli
 * @Date: 2021-10-14 13:35:59
 * @LastEditTime: 2021-11-26 16:39:12
 * @LastEditors: Please set LastEditors
 * @Description: 函数入口
 * @FilePath: /grammyli/search/main.js
 */
const init = (isFirst = true) => {
  if (isFirst) {
    // 当前搜索网站的索引
    window.currentEngineIndex = 2;
    // 搜索的历史记录
    window.historys = [];
  }
  if (tabType === 'search') {
    e(".g-engines").innerHTML = "";
    renderEngines();
    show('.g-engines')
    hide('.g-stars')
    bindEventDnd()
  } else {
    e(".g-stars").innerHTML = "";
    renderStars()
    hide('.g-engines')
    show('.g-stars')
  }
  renderLogo();
};

const addActions = () => {
  window.actions = {};
  const as = [
    logoAction,
    inputAction,
    engineAction,
    themeAction,
    tabAction,
    starAction,
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
  // 控制输入框清空按钮显示，回车之后进行搜索
  bindEventKeyup();
  // 全局绑定点击事件
  bindEventClick();
  // 控制历史会议记录的显示
  bindEventChange();
  // 添加相应的点击事件
  addActions()
};

const __main = () => {
  init();
  bindEvents();
};

__main();