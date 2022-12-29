const init = () => {
  window.canvas = e(".g-canvas");
  canvas.width = 600;
  canvas.height = 600;
  window.ctx = canvas.getContext("2d");
  window.game_over = false;
  // 用户自定义的行和列
  window.definedRow = 6;
  window.definedCol = 6;

  // 标记的次数
  window.markedTime = 0;
  // 雷的数量
  window.mineNumber = 3;

  window.times = 0;
  // 生成数据
  window.square = userDefinedMap(definedRow, definedCol, mineNumber);
  // 页面显示的 square
  window.squareMap = initMap(definedRow, -1);
  renderSquare(squareMap);
};

const drawStrokePixel = (x, y, color, size = 10) => {
  ctx.strokeStyle = color;
  ctx.strokeRect(x, y, size, size);
};

const drawfillPixel = (x, y, color, size = 10) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
};

const drawFillNumber = (x, y, number, perPixelSize = 10) => {
  let n = number;
  for (let i = 0; i < numbers[n].length; i++) {
    for (let j = 0; j < numbers[n][i].length; j++) {
      let v = numbers[n][i][j];
      let x1 = x + j * perPixelSize;
      let y1 = y + i * perPixelSize;
      if (v) {
        let color = colors[v];
        drawfillPixel(x1, y1, color, perPixelSize);
      } else {
        // let color = colors[14];
        // drawStrokePixel(x1, y1, color, perPixelSize);
      }
    }
  }
};

const drawStrokeNumber = (x, y, perPixelSize) => {
  let size = perPixelSize * 10;
  let color = colors[14];
  drawStrokePixel(x, y, color, size);
};

const drawNumber = (x, y, number, perPixelSize = 10) => {
  if (number === -1) {
    drawStrokePixel(x, y, colors[3], perPixelSize * 10);
    drawfillPixel(x, y, colors[17], perPixelSize * 10);
    return;
  }
  drawFillNumber(x, y, number, perPixelSize);
  drawStrokeNumber(x, y, perPixelSize);
};

const renderSquare = (square) => {
  let x = 0;
  let y = 0;
  let perNumberSize = 100;
  for (let i = 0; i < square.length; i++) {
    for (let j = 0; j < square[i].length; j++) {
      let v = square[i][j];
      let x1 = x + j * perNumberSize;
      let y1 = y + i * perNumberSize;
      let perPixelSize = perNumberSize / 10;
      drawNumber(x1, y1, v, perPixelSize);
    }
  }
};

const firstClickCellData = (x, y) => {
  let data = userDefinedMap(definedRow, definedCol, mineNumber);
  console.log("data", data);
  let n = data[x][y];
  if (n === 0) {
    return data;
  } else {
    return firstClickCellData(x, y);
  }
};

// 点击周围 这个方块的条件
const clickThisCellRules = (square, x, y) => {
    // 是否在 square 里面
    let row = square.length
    let col = square[0].length
    let rule_row = x >= 0 && x < row
    let rule_col = y >= 0 && y < col
    let has_in_square = rule_row && rule_col
    if (!has_in_square) {
        return false
    }
    // 是否被点击
    let v = squareMap[x][y];
    let not_clicked = v === -1;
    // 是否是雷
    let not_mine = square[x][y] !== 9
    return has_in_square && not_clicked && not_mine
}

const clickThisCell = (square, x, y) => {
    if (clickThisCellRules(square, x, y)) {
        // 先显示
        squareMap[x][y] = square[x][y]
        // 如果是空白，点击周围所有的雷
        if (square[x][y] === 0) {
            clickAroundCells(square, x, y)
        }
    }
}

const clickAroundCells = (square, x, y) => {
    let i = x
    let j = y
    // left
    clickThisCell(square, i, j - 1)
    // right
    clickThisCell(square, i, j + 1)
    // up
    clickThisCell(square, i - 1, j)
    // down
    clickThisCell(square, i + 1, j)

    // 四个顶点
    clickThisCell(square, i - 1, j - 1)
    // right
    clickThisCell(square, i + 1, j + 1)
    // up
    clickThisCell(square, i - 1, j + 1)
    // down
    clickThisCell(square, i + 1, j - 1)
}

const wonGame = () => {
    let n = squareMap.flat().filter(number => number === -1).length
    return n === mineNumber;
}

const bindEventClickNumber = () => {
  bindEvent(e(".g-canvas"), "click", (event) => {
    let target = event.target;
    let rect = target.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let space = 0;
    let perNumberSize = 100;
    let w = perNumberSize + space;
    let i = Math.floor(x / w);
    let j = Math.floor(y / w);
    let v = square[j][i];
    //第一次点击，必须为 0
    if (window.times === 0 && v !== 0) {
      //   log("第一次　点击");
      let new_data = copy(firstClickCellData(j, i));
      window.square = new_data;
    }
    squareMap[j][i] = square[j][i];
    if (squareMap[j][i] === 9) {
      console.log("game over");
      alert("game over")
      squareMap = copy(square);
    }
    console.log("squareMap[j][i]", squareMap[j][i]);
    if (squareMap[j][i] == 0) {
        // 点击周围的 空白方块
        console.log("点击周围的 空白方块")
        clickAroundCells(square, j, i)
    }
    if (wonGame()) {
        alert("win game");
    }
    ctx.clearRect(0, 0, 600, 600);
    renderSquare(squareMap);
    window.times += 1;
  });
};

const bindEvents = () => {
  bindEventClickNumber();
};

const __main = () => {
  init();
  bindEvents();
};

__main();
