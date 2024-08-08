/*
调用 openDebugger() 后，调试器提供两个功能：
    1. 监听 "p" 键以暂停主循环
    2. 根据 config.js 生成页面上的调试滑块
*/

/**
 * 生成滑块的 HTML 模板。
 * @param {string} key - 配置项的键。
 * @param {Object} config - 包含 name（名称）、value（初始值）、min（最小值）、max（最大值）的配置对象。
 * @returns {string} 返回生成的滑块 HTML 模板字符串。
 */
const sliderTemplate = (key, config) => {
  let { name, value, min, max } = config;
  let template = `
        <div>
            <label>
                <input class="auto-slider" type="range"
                    value="${value}"
                    min="${min}"
                    max="${max}"
                    data-key="${key}">
                ${name}: <span class="label">${value}</span>
            </label>
        </div>
    `;
  return template;
};

/**
 * 插入所有滑块到页面中。
 */
const insertSliders = () => {
  let html = '<hr><div style="color: gray;">按 "p" 键暂停</div>';
  for (let [k, c] of Object.entries(config)) {
    html += sliderTemplate(k, c);
  }
  document.querySelector("canvas").insertAdjacentHTML("afterend", html);
};

/**
 * 绑定事件监听器。
 */
const bindEvents = () => {
  // 监听按键事件
  window.addEventListener("keydown", (event) => {
    if (event.key === "p") {
      // 暂停或继续
      window.pause = !window.pause;
    }
  });

  // 监听滑块变化事件
  for (let slider of document.querySelectorAll(".auto-slider")) {
    slider.addEventListener("input", () => {
      let key = slider.dataset.key;
      let value = slider.value;
      eval(`config.${key}.value = ${value}`);
      slider.nextElementSibling.innerText = value;
    });
  }
};

/**
 * 启动调试器，打开调试模式，插入滑块并绑定事件。
 */
const openDebugger = () => {
  window.debugMode = true;
  insertSliders();
  bindEvents();
};
