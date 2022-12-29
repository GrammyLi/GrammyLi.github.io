const debug = true;
const log = debug ? console.log.bind(console, "debug") : function () {};

const int = (number) => parseInt(number, 10);

const copy = (arr) => JSON.parse(JSON.stringify(arr));

const e = (sel) => document.querySelector(sel);

const es = (sel) => document.querySelectorAll(sel);

const bindEvent = (element, eventName, callback) => {
  element.addEventListener(eventName, callback);
};

const bindAll = (elements, eventName, callback) => {
  elements.forEach((element) => {
    element.addEventListener(eventName, callback);
  });
};

const appendHtml = (element, html) => {
  element.insertAdjacentHTML("beforeend", html);
};

const initMap = (n, defautValue = 0) => {
  let l = [];
  for (let i = 0; i < n; i++) {
    let a = [];
    for (let j = 0; j < n; j++) {
      a.push(defautValue);
    }
    l.push(a);
  }
  return l;
};

const shuffle = (arr) => {
  if (!Array.isArray(arr) && arr.length) {
      return []
  }
  for (let i = arr.length; i > 0; i--) {
      const idx = Math.floor(Math.random() * i)
      if (idx !== (i - 1)) {
          const tmp = arr[idx];
          arr[idx] = arr[i - 1]
          arr[i - 1] = tmp
      }
  }
  return arr
}

const markedSquare = function(array) {
  let square = copy(array)
  for (let i = 0; i < square.length; i++) {
      let line = square[i]
      for (let j = 0; j < line.length; j++) {
          if (square[i][j] === 9) {
              markedAround(square, i, j)
          }
      }
  }
  // log('square', square)
  return square
}

const markedAround = function(square, i, j) {
  // left
  jxyi(square, i, j - 1)
  // right
  jxyi(square, i, j + 1)
  // up
  jxyi(square, i - 1, j)
  // down
  jxyi(square, i + 1, j)

  // 四个顶点
  jxyi(square, i - 1, j - 1)
  // right
  jxyi(square, i + 1, j + 1)
  // up
  jxyi(square, i - 1, j + 1)
  // down
  jxyi(square, i + 1, j - 1)
}

const isSquare = function(square, i, j) {
  let rule_row = i >= 0 && i < square.length
  let rule_col = j >= 0 && j < square[0].length
  return rule_col && rule_row
}

const jxyi = function(square, i, j) {
  if (isSquare(square, i, j) && square[i][j] != 9) {
      square[i][j] += 1
  }
}

const rjust = function(str, size, delimeter = '0') {
  let result = str
  while (result.length < size) {
      result = delimeter + result
  }
  return result
}

/**
 * 
 * @param {行数} row 
 * @param {列数} col 
 * @param {雷的数量 } mineNumber  它要求要小于 row * col
 */
 const userDefinedMap = (row, col, mineNumber) => {
  let r = []
  // 初始化
  let all_cell = row * col
  for (let i = 0; i < all_cell - mineNumber; i++) {
      r.push(0)
  }
  for (let i = 0; i < mineNumber; i++) {
      r.push(9)
  }
  // 洗牌算法
  r = shuffle(r)
  // 转换成二维数组
  let square = []
  for (let i = 0; i < row; i++) {
      let line = []
      for (let j = 0; j < col; j++) {
          let index = i * col + j
          let v = r[index]
          line.push(v)
      }
      square.push(line)
  }
  // 标记算法
  square = markedSquare(square)
  // log('square', square)
  return square
}