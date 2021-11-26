/*
 * @Author: your name
 * @Date: 2021-11-26 09:26:01
 * @LastEditTime: 2021-11-26 13:18:51
 * @LastEditors: Please set LastEditors
 * @Description: 所有搜索引擎
 * @FilePath: /search/comp/engine.js
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

const engineAction = {
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
}