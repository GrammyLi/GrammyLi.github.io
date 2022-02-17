/*
 * @Author: your name
 * @Date: 2022-02-16 18:28:55
 * @LastEditTime: 2022-02-17 12:28:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /art/asciiImage.js
 */
class AsciiImage extends G {
  constructor({ canvas, url }) {
    super();
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.url = url;

    this.setup();
    this.bindEvents();
  }
  drawImage() {
    const { canvas, ctx, image } = this;
    canvas.width = 600;
    canvas.height = 600;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
  convertToChar(g) {
    const chars = "grammyli@outlook.com*+#&%_:/x";
    const n = int(g / 20);
    const index = n >= chars.length ? chars.length - 1 : n;
    return chars[index];
  }
  filterImage(pixels, pos) {
    const red = pixels.data[pos];
    const green = pixels.data[pos + 1];
    const blue = pixels.data[pos + 2];
    const colors = [red, green, blue, 255];
    const total = red + green + blue;
    const averageColorValue = total / 3;
    const [r, g, b] = Filter.new().gray(colors);
    const color = "rgb(" + r + "," + g + "," + b + ")";
    return [color, averageColorValue];
  }
  scanImage() {
    const { canvas, ctx } = this;
    const cellSize = parseInt(e(".g-cell-size-value").value);
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
          const char = this.convertToChar(averageColorValue);
          const color = "rgb(" + red + "," + green + "," + blue + ")";
          if (total > 200) {
            imageCellArray.push(Cell.new(x, y, char, color, ctx));
          }
          // const [color, averageColorValue] = this.filterImage(pixels, pos)
          // const char = this.convertToChar(averageColorValue);
          // imageCellArray.push(Cell.new(x, y, char, color, ctx));
        }
      }
    }
    return imageCellArray;
  }
  drawAscii(imageCellArray) {
    const { canvas, ctx } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageCellArray.length; i++) {
      imageCellArray[i].draw();
    }
  }
  addAscii() {
    const imageCellArray = this.scanImage();
    this.drawAscii(imageCellArray);
  }
  handleSlider() {
    const { canvas, ctx, image } = this;
    const inputSlider = e(".g-cell-size-value");
    const inputLabel = e(".g-cell-size-label");
    if (inputSlider.value == 1) {
      inputLabel.innerHTML = "Original image";
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    } else {
      inputLabel.innerHTML = "Resolution: " + inputSlider.value + " px";
      const imageCellArray = this.scanImage();
      this.drawAscii(imageCellArray);
    }
  }
  bindEventSlider() {
    bindEvent(e(".g-cell-size-value"), "change", () => {
      this.drawImage();
      this.handleSlider();
    });
  }
  bindEventUploadFile() {
    const input = e(".t-upload");
    input.addEventListener(
      "change",
      (event) => {
        const file = event.target.files[0];
        // 过滤文件
        if (!file.type.includes("image")) {
          alert("请确保文件为图像类型");
          return false;
        }
        const reader = new FileReader();
        // 转化成base64数据类型
        reader.readAsDataURL(file);
        reader.onload = () => {
          const url = reader.result;
          this.update(url);
        };
      },
      false
    );
  }
  saveAsPNG() {
    const { canvas } = this;
    return canvas.toDataURL("image/png");
  }
  bindEventSaveFile() {
    const input = e(".t-save-btn");
    input.addEventListener("click", (event) => {
      let a = document.createElement("a");
      a.download = "art-avatar";
      a.href = this.saveAsPNG();
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }
  bindEvents() {
    this.bindEventSlider();
    this.bindEventUploadFile();
    this.bindEventSaveFile();
  }
  setup() {
    loadImage(this.url, (image) => {
      this.image = image;
      this.drawImage();
      this.addAscii();
    });
  }
  update(url) {
    this.url = url;
    this.setup();
  }
}
