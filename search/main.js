/*
 * @Author: your name
 * @Date: 2021-10-14 13:35:59
 * @LastEditTime: 2021-11-05 13:55:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/search/main.js
 */
const templateEngine = ({ id, url, text, search }, index) => {
  return `
  <div class="g-engine g-engine-${id} g-drag" data-index="${index}">
    <img src="${url}"  data-action="clickEngineCard"  />
    <span>${text}</span>
  </div>
  `;
};

const templateLogoEngine = ({ id, url, text, search }) => {
  return `
  <div class="g-engine">
    <img src="${url}"  />
    <span>${text}</span>
  </div>
  `;
};

const renderEngines = () => {
  let t = window.engines.map((e, i) => templateEngine(e, i)).join("");
  appendHtml(e(".g-engines"), t);
};

const renderLogo = () => {
  let engine = window.engines[currentEngineIndex];
  let t = templateLogoEngine(engine);
  const center = e(".g-center");
  // 先清空画布
  center.innerHTML = "";
  center.innerHTML = t;
  hideLogoBtn()
};

const init = () => {
  renderEngines();
  renderLogo();
};

const bindEventKeyup = () => {
  bindEvent(window, "keyup", (event) => {
    if (event.key === "Enter") {
      actions.searchContent();
    }
  });
};

const hideLogoBtn = () => {
  if (currentEngineIndex === 0) {
    e(".g-left-img").classList.add('g-hide');
    e(".g-right-img").classList.remove('g-hide');
  } else if (currentEngineIndex === engines.length - 1) {
    e(".g-right-img").classList.add('g-hide');
    e(".g-left-img").classList.remove('g-hide');
  } else {
    e(".g-right-img").classList.remove('g-hide');
    e(".g-left-img").classList.remove('g-hide');
  }
};

const actions = {
  clearInputValue() {
    e(".g-input__search").value = "";
  },
  clickEngineCard(event) {
    // 更新搜索方式
    let engine = event.target.closest(".g-engine");
    window.currentEngineIndex = Number(engine.dataset.index);
    renderLogo();
  },
  clickControlBtn(event) {
    // 更新搜索方式
    let btn = event.target.closest(".btn");
    let offset = Number(btn.dataset.offset);
    currentEngineIndex += offset;
    if (currentEngineIndex < 0) {
      currentEngineIndex = 0;
    }
    if (currentEngineIndex >= engines.length) {
      currentEngineIndex = engines.length - 1;
    }
    log("currentEngineIndex", currentEngineIndex);
    renderLogo();
  },
  searchContent() {
    let v = e(".g-input__search").value;
    log("开始搜索", v);
    if (v.length === 0) {
      return;
    }
    let link = e(".g-search-link");
    let engine = window.engines[currentEngineIndex];
    link.href = engine.search.replace("keyword", v);
    link.click();
  },
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
};

const __main = () => {
  window.currentEngineIndex = 2;
  init();
  bindEvents();
};

__main();
