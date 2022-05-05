const e = (sel) => document.querySelector(sel);

const es = (sel) => document.querySelectorAll(sel);

const debug = true;
const log = debug
  ? console.log.bind(console, "***🍉 debug 🍉***",)
  : function () {};

const int = (number) => Math.abs(parseInt(number, 10));

const bindEvent = (el, name, cb) => {
  el.addEventListener(name, cb)
}

const appendHtml = (element, html) => {
  element.insertAdjacentHTML('beforeend', html)
}

const bindAll = (elements, callback) => {
  elements.forEach(element => {
    bindEvent(element, 'click', callback)
  })
}

const parse = function(code) {
  let ast = espree.parse(code, {
      ecmaVersion: 6,
  })
  return ast
}

const tokens = (code) => {
  let tokens = espree.tokenize(code, {
      ecmaVersion: 6,
  })
  return tokens
}