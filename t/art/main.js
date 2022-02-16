/*
 * @Author: your name
 * @Date: 2022-02-15 19:12:04
 * @LastEditTime: 2022-02-16 09:41:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /art/main.js
 */
const drawImage = (image) => {
  const canvas = e(".g-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 600;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};

class Cell {
  constructor(x, y, text, color, context) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.context = context;
  }
  draw() {
    const c = this.context;
    c.fillStyle = "white";
    c.fillText(this.text, this.x + 1, this.y + 1);
    c.fillStyle = this.color;
    c.fillText(this.text, this.x, this.y);
  }
}

// TODO 待优化
const convertToSymbol = (g) => {
  if (g > 250) return "@";
  else if (g > 240) return "*";
  else if (g > 220) return "+";
  else if (g > 200) return "#";
  else if (g > 180) return "&";
  else if (g > 160) return "%";
  else if (g > 140) return "_";
  else if (g > 120) return ":";
  else if (g > 100) return "£";
  else if (g > 80) return "/";
  else if (g > 60) return "-";
  else if (g > 40) return "X";
  else if (g > 20) return "W";
  else return "";
}

const scanImage = () => {
  const cellSize = parseInt(e(".g-cell-size-value").value);
  const canvas = e(".g-canvas");
  const ctx = canvas.getContext("2d");
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // 设置字体大小
  ctx.font = cellSize + "px Verdana";

  const imageCellArray = [];
  let i = 0;
  for (let y = 0; y < pixels.height; y += cellSize) {
    for (let x = 0; x < pixels.width; x += cellSize) {
      i += 1;
      const posX = x * 4;
      const posY = y * 4;
      const pos = posY * pixels.width + posX;

      if (pixels.data[pos + 3] > 128) {
        const red = pixels.data[pos];
        const green = pixels.data[pos + 1];
        const blue = pixels.data[pos + 2];
        const total = red + green + blue;
        const averageColorValue = total / 3;
        const symbol = convertToSymbol(averageColorValue);
        const color = "rgb(" + red + "," + green + "," + blue + ")";
        if (total > 200) {
          imageCellArray.push(new Cell(x, y, symbol, color, ctx));
        }
      }
    }
  }
  return imageCellArray
}

const drawAscii = (imageCellArray) =>  {
  const canvas = e(".g-canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imageCellArray.length; i++) {
    imageCellArray[i].draw();
  }
}

function handleSlider() {
  const inputSlider = e(".g-cell-size-value")
  const inputLabel = e(".g-cell-size-label")
  if (inputSlider.value == 1) {
    inputLabel.innerHTML = "Original image";
    const canvas = e(".g-canvas");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  } else {
    inputLabel.innerHTML = "Resolution: " + inputSlider.value + " px";
    const imageCellArray = scanImage();
    drawAscii(imageCellArray);
  }
}

loadImage(imageUrl, (image) => {
  drawImage(image);

  const imageCellArray = scanImage();
  drawAscii(imageCellArray);
  bindEvent(e('.g-cell-size-value'), 'change', handleSlider)
});
