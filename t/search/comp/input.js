/*
 * @Author: your name
 * @Date: 2021-11-26 09:25:52
 * @LastEditTime: 2021-11-26 15:32:42
 * @LastEditors: Please set LastEditors
 * @Description: 搜索框 | 历史记录
 * @FilePath: /search/comp/input.js
 */
const renderHistorys = () => {
  let menus = e(".g-search__menus");
  menus.innerHTML = "";
  let t = `
  <div class="g-menu-header">
    <div class="g-menu-history">hisory</div>
    <div class="g-menu-clear" data-action="clearHistory">clear</div>
  </div>
  `;
  t += window.historys
    .map((h) => {
      return `<div class="g-menu" data-action="searchHistory">${h}</div>`;
    })
    .join("");

  appendHtml(menus, t);
};

const bindEventChange = () => {
  bindEvent(e(".g-input__search"), "focus", (event) => {
    let v = event.target.value;
    if (v.length === 0 && window.historys.length > 0) {
      renderHistorys();
      e(".g-search__menus").classList.remove("g-hide");
      e(".g-engines").classList.add("g-hide");
      e(".g-stars").classList.add("g-hide");
    } else {
      e(".g-search__menus").classList.add("g-hide");
      if (tabType === 'search') {
        e(".g-engines").classList.remove("g-hide");
      } else {
        e(".g-stars").classList.remove("g-hide");
      }
    }
  });
  bindEvent(e(".g-input__search"), "input", (event) => {
    let v = event.target.value;
    if (v.length === 0 && window.historys.length > 0) {
      renderHistorys();
      e(".g-search__menus").classList.remove("g-hide");
      e(".g-engines").classList.add("g-hide");
      e(".g-stars").classList.add("g-hide");
    } else {
      e(".g-search__menus").classList.add("g-hide");
      if (tabType === 'search') {
        e(".g-engines").classList.remove("g-hide");
      } else {
        e(".g-stars").classList.remove("g-hide");
      }
    }
  });
};

const bindEventKeyup = () => {
  bindEvent(window, "keyup", (event) => {
    if (e(".g-input__search").value.length === 0) {
      e(".g-clear").classList.add("g-hide");
    } else {
      e(".g-clear").classList.remove("g-hide");
    }
    if (event.key === "Enter") {
      actions.searchContent();
    }
  });
};

const jumpLink = (value) => {
  let v = value;
  let link = e(".g-search-link");
  let id = enginesIds[currentEngineIndex];
  let engine = window.engines[0];
  engines.forEach((e) => {
    if (e.id === id) {
      engine = e;
    }
  });
  link.href = engine.search.replace("keyword", v);
  link.click();
};

const inputAction = {
  clearInputValue() {
    e(".g-input__search").value = "";
    e(".g-clear").classList.add("g-hide");
  },
  searchContent() {
    let v = e(".g-input__search").value;
    log("开始搜索", v);
    if (v.length === 0) {
      return;
    }
    window.historys = [v, ...window.historys.slice(0, 1)];
    window.historys = unique(historys)
    jumpLink(v);
  },
  clearHistory() {
    window.historys = [];
    e(".g-search__menus").classList.add("g-hide");
    if (tabType === 'search') {
      e(".g-engines").classList.remove("g-hide");
    } else {
      e(".g-stars").classList.remove("g-hide");
    }
  },
  searchHistory(event) {
    let v = event.target.innerText;
    jumpLink(v);
  },
};