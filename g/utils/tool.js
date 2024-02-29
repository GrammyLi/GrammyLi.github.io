/**
 * 控制是否启用调试模式
 * 如果 debug 为 true，则 log 函数绑定到 console.log，否则 log 函数为空函数
 */
const debug = true;

/**
 * 根据调试模式输出日志
 * @param {...any} args - 要输出的日志参数
 */
const log = debug ? console.log.bind(console) : function () {};

/**
 * 将字符串转换为整数，指定进制为10
 * @param {string} number - 要转换的字符串
 * @returns {number} - 转换后的整数
 */
const int = (number) => parseInt(number, 10);

/**
 * 获取数组的长度
 * @param {Array} arr - 目标数组
 * @returns {number} - 数组的长度
 */
const len = (arr) => arr.length;

/**
 * 复制一个对象或数组（深拷贝）
 * @param {object|array} element - 要复制的对象或数组
 * @returns {object|array} - 复制的对象或数组
 */
const copy = (element) => {
  // 使用JSON方法进行深拷贝
  let a = JSON.parse(JSON.stringify(element));
  return a;
};

/**
 * 绑定事件到元素
 * @param {Element} element - 目标元素
 * @param {string} eventName - 事件名称
 * @param {function} callback - 事件回调函数
 */
const bindEvent = (element, eventName, callback) => {
  element.addEventListener(eventName, callback);
};

/**
 * 绑定相同事件到多个元素
 * @param {NodeList} elements - 包含多个元素的节点列表
 * @param {string} eventName - 事件名称
 * @param {function} callback - 事件回调函数
 */
const bindAll = (elements, eventName, callback) => {
  for (let e of elements) {
    bindEvent(e, eventName, callback);
  }
};

/**
 * 在元素的末尾插入HTML内容
 * @param {Element} element - 目标元素
 * @param {string} html - 要插入的HTML内容
 */
const appendHtml = (element, html) => {
  element.insertAdjacentHTML("beforeend", html);
};

/**
 * 选择单个元素
 * @param {string} selector - CSS选择器
 * @returns {Element} - 选中的元素
 */
const e = (selector) => document.querySelector(selector);

/**
 * 选择所有匹配的元素
 * @param {string} selector - CSS选择器
 * @returns {NodeList} - 匹配的元素列表
 */
const es = (selector) => document.querySelectorAll(selector);
