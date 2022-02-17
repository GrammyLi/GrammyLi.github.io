/*
 * @Author: your name
 * @Date: 2022-02-17 12:39:01
 * @LastEditTime: 2022-02-17 12:40:38
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /andy/utils.js
 */
const e = (sel) => document.querySelector(sel);

const debug = true;
const log = debug
  ? console.log.bind("***🍉 debug 🍉***", console)
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

class Filter extends G {
  constructor() {
    super();
  }
  comicBooks(colors) {
    let r = colors[0];
    let g = colors[1];
    let b = colors[2];
    let A = colors[3];
    let R = (Math.abs(g - b + g + r) * r) / 256;
    let G = (Math.abs(b - g + b + r) * r) / 256;
    let B = (Math.abs(b - g + b + r) * g) / 256;
    return [int(R), int(G), int(B), int(A)];
  }
  nostalgia(colors) {
    let r = colors[0];
    let g = colors[1];
    let b = colors[2];
    let A = colors[3];
    let R = 0.393 * r + 0.769 * g + 0.189 * b;
    let G = 0.349 * r + 0.686 * g + 0.168 * b;
    let B = 0.272 * r + 0.534 * g + 0.131 * b;
    return [int(R), int(G), int(B), int(A)];
  }
  gray(colors) {
    let r = colors[0];
    let g = colors[1];
    let b = colors[2];
    let gray = (r + g + b) / 3;
    let R = gray;
    let G = gray;
    let B = gray;
    let A = colors[3];
    return [int(R), int(G), int(B), int(A)];
  }
  blackWhite(colors) {
    let r = colors[0];
    let g = colors[1];
    let b = colors[2];
    let gray = (r + g + b) / 3;
    gray = gray >= 100 ? 255 : 0;
    let R = gray;
    let G = gray;
    let B = gray;
    let A = colors[3];
    return [int(R), int(G), int(B), int(A)];
  }
  negative(colors) {
    let r = colors[0];
    let g = colors[1];
    let b = colors[2];
    let R = 255 - r;
    let G = 255 - g;
    let B = 255 - b;
    let A = colors[3];
    return [int(R), int(G), int(B), int(A)];
  }
}