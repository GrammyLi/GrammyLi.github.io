const debug = true;
const log = debug ? console.log.bind(console, "*** debug ***") : () => {};

const int = (num) => parseInt(num, 10);

const e = (sel) => document.querySelector(sel);

const drawImage = (data, callback) => {
  const c = e(".t-canvas");
  c.width = width;
  c.height = width;
  const img = new Image();
  img.src = data;
  img.onload = () => {
    callback(c, img);
  };
};

const randomChar = (value) => {
  const chars = "grammyli";
  const n = parseInt(value / 20);
  const index = n >= chars.length ? chars.length - 1 : n;
  return chars[index];
};

const getRgbByPosition = ({ pixels, x, y }) => {
  const posX = x * 4;
  const posY = y * 4;
  const pos = posY * pixels.width + posX;
  const red = pixels.data[pos];
  const green = pixels.data[pos + 1];
  const blue = pixels.data[pos + 2];
  return [red, green, blue];
};

const formattedColor = ([red, green, blue]) => {
  return `rgb(${red},${green},${blue})`;
};

const cleanImage = ({ pixels, cellSize }) => {
  const imageCellArray = [];
  for (let y = 0; y < pixels.height; y += cellSize) {
    for (let x = 0; x < pixels.width; x += cellSize) {
      const [red, green, blue] = getRgbByPosition({ pixels, x, y });
      const averageColorValue = (red + green + blue) / 3;
      const char = randomChar(averageColorValue);
      // const char = "l";
      const color = formattedColor([red, green, blue]);
      const cell = [x, y, char, color];
      imageCellArray.push(cell);
    }
  }
  return imageCellArray;
};

// 分别有两个像素的灰度值相减，得到 gx 和 gy
// 平方和后再开平方，得到一个用来检测边缘的值
// 最后设定阈值来判断是否是边缘
// 就是比较周围点是否相差过大
const validPixel = (pixels, x, y, grayColor) => {
  const h = pixels.height;
  const w = pixels.width;
  const points = [];
  const size = 1;
  if (y - size >= 0) {
    points.push([x, y - size]);
  }
  if (x + size < w) {
    points.push([x + size, y]);
  }
  if (y + size > h) {
    points.push([x, y + size]);
  }
  if (x - size <= 0) {
    points.push([x - size, y]);
  }
  if (y - size >= 0 && x - size <= 0) {
    points.push([x - size, y - size]);
  }
  if (y + size < h && x + size < w) {
    points.push([x + size, y + size]);
  }
  if (y + size < h && x - size >= 0) {
    points.push([x + size, y - size]);
  }
  if (y - size >= 0 && x + size < w) {
    points.push([x - size, y + size]);
  }
  const isWhitePoints = [];
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [red, green, blue] = getRgbByPosition({ pixels, x: x1, y: y1 });
    const gray = (red + green + blue) / 3;
    if (Math.abs(gray - grayColor) > 20) {
      isWhitePoints.push(points[i]);
    }
  }
  return isWhitePoints.length >= 1;
};
const cleanEdgeImage = ({ pixels, cellSize }) => {
  const imageCellArray = [];
  for (let y = 0; y < pixels.height; y += cellSize) {
    for (let x = 0; x < pixels.width; x += cellSize) {
      const char = "*";
      const [red, green, blue] = getRgbByPosition({pixels, x, y})
      const grayColor = (red + green + blue) / 3;
      const color = formattedColor([red, green, blue]);
      const cell = [x, y, char, color];
      if (validPixel(pixels, x, y, grayColor)) {
        imageCellArray.push(cell);
      }
    }
  }
  return imageCellArray;
};

const drawImageByCells = ({ canvas, ctx, imageCells, isClear }) => {
  const c = ctx;
  if (isClear) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  for (let i = 0; i < imageCells.length; i++) {
    const [x, y, char, color] = imageCells[i];
    c.fillStyle = "white";
    c.fillText(char, x + 1, y + 1);
    c.fillStyle = color;
    c.fillText(char, x, y);
  }
};

const filterImage = (canvas, image) => {
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = width;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.font = cellSize + "px Verdana";
  const imageCells = cleanImage({ pixels, cellSize });
  drawImageByCells({ canvas, ctx, imageCells, isClear: true });
  const edgeImageCells = cleanEdgeImage({ pixels, cellSize });
  drawImageByCells({ canvas, ctx, imageCells: edgeImageCells });
};
