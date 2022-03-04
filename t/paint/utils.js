const e = (sel) => document.querySelector(sel);

const debug = true;
const log = debug
  ? console.log.bind(console, "***🍉 debug 🍉***",)
  : function () {};

const int = (number) => parseInt(number, 10);

const bindEvent = (el, name, cb) => {
  el.addEventListener(name, cb)
}

const loadImage = (src, cb) => {
  const img = new Image();
  img.src = src;
  bindEvent(img, 'load',  () => {
    cb(img);
  })
};

class G {
  constructor() {}
  static new(...args) {
    let i = new this(...args);
    return i;
  }
}