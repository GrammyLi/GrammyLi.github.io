/*
 * @Author: your name
 * @Date: 2021-10-09 21:34:32
 * @LastEditTime: 2021-10-09 21:45:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/ avatar/utils.js
 */
// 基础工具
const debug = true;
const log = debug ? console.log.bind(console, "*** debug ***") : () => {};
const int = (num) => parseInt(num, 10);
const e = (sel) => document.querySelector(sel);
const drawImage = (data, callback) => {
  const c = e(".t-canvas");
  const context = c.getContext("2d");
  c.width = 400;
  c.height = 400;
  const img = new Image();
  img.src = data;
  img.onload = () => {
    callback(context, img);
  };
};

const grayOfColors = (colors) => {
  let r = colors[0];
  let g = colors[1];
  let b = colors[2];
  let gray = (r + g + b) / 3;
  let R = gray;
  let G = gray;
  let B = gray;
  let A = colors[3];
  return [int(R), int(G), int(B), int(A)];
};

// 求RGB平均值Avg ＝ (R + G + B) / 3，如果Avg >= 100，
// 则新的颜色值为＝RG＝B＝255；
// 如果Avg < 100，则新的颜色值为R＝G＝B＝0；255就是白色，0就是黑色
const blackWhiteOfColors = (colors) => {
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
};

// 底片
// 算法原理：将当前像素点的RGB值分别与255之差后的值作为当前点的RGB值，即
// R = 255 – R；G = 255 – G；B = 255 – B；
const negativeOfColors = (colors) => {
  let r = colors[0];
  let g = colors[1];
  let b = colors[2];
  let R = 255 - r;
  let G = 255 - g;
  let B = 255 - b;
  let A = colors[3];
  return [int(R), int(G), int(B), int(A)];
};

const imageFilter = () => {
  const type = e('.t-select-filter').dataset.filter
  if (type === 'notFilter') {
    return;
  }
  const filters = {
    gray: grayOfColors, // 灰度
    blackWhite: blackWhiteOfColors, // 黑白
    negative: negativeOfColors, // 底片
  };
  if (!window.imageData) {
    return 
  }
  const image = document.querySelector(".t-canvas");
  const context = image.getContext("2d");
  // const imageData = context.getImageData(0, 0, 400, 400);
  const { data } = window.imageData;
  for (let i = 0; i < data.length; i += 4) {
    const colors = data.slice(i, i + 4);
    const newColors = filters[type](colors);
    const [r, g, b, a] = newColors;
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = a;
  }
  context.putImageData(imageData, 0, 0);
};
