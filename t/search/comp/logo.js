/*
 * @Author: your name
 * @Date: 2021-11-26 09:25:43
 * @LastEditTime: 2021-12-22 17:16:48
 * @LastEditors: Please set LastEditors
 * @Description: 搜索的引擎logo
 * @FilePath: /search/comp/logo.js
 */
const templateLogoEngine = ({ id, url, text, search }) => {
  return `
  <div class="g-engine">
    <img src="${url}"  />
    <span>${text}</span>
  </div>
  `;
};

const hideLogoBtn = () => {
  log('hide logo btn')
  if (currentEngineIndex === 0) {
    log('第一个 engine')
    show(".g-right-img")
    hide('.g-left-img')
  } else if (currentEngineIndex === engines.length - 1) {
    log('第二个')
    show(".g-left-img")
    hide('.g-right-img')
    e(".g-right-img").classList.add('g-hide');
    e(".g-left-img").classList.remove('g-hide');
  } else {
    show(".g-right-img")
    show('.g-left-img')
  }
};

const renderLogo = () => {
  let id = enginesIds[currentEngineIndex]
  let engine = window.engines[0]
  engines.forEach(ele => {
    if (ele.id === id) {
      engine = ele
    }
  })
  let t = templateLogoEngine(engine);
  const center = e(".g-center");
  // 先清空画布
  center.innerHTML = "";
  center.innerHTML = t;
  if (tabType === 'search') { 
    hideLogoBtn()
  } else {
    hide('.g-left-img')
    hide('.g-right-img')
  }
};

const logoAction = {
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
    // log("currentEngineIndex", currentEngineIndex);
    renderLogo();
  },
}