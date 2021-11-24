/*
 * @Author: your name
 * @Date: 2021-10-12 09:44:43
 * @LastEditTime: 2021-10-23 16:10:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/avatar-generator/main.js
 */

// 所有像素
var pixels = null;

// 像素宽度
var pxCount = 5;
// 总数
var totalPxCount = 0;

var pxSize = 32;
var canvasSize = 0;

var baseColor = "#ffffff";
var baseFrequency = 0.4;
var [red, green, blue] = [255, 0, 127];

var autoplay = false;
var autoplaySpeed = 6;
var _autoplaySpeedMax = 30;
var _autoplayCounter = 0;

var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

let githubColorIndex = 0;
let githubModel = true;

var { round, random } = Math;

function rgb(colors) {
  if (githubModel) {
    return `#${githubs_colors[githubColorIndex]}`;
  } else {
    return `rgb(${colors.join(",")})`;
  }
}

function getPixels({ count, bias, baseColor, baseFrequency }) {
  return new Array(count)
    .join(" ")
    .split(" ")
    .map((p) =>
      random() <= baseFrequency
        ? baseColor
        : rgb(bias.map((c, i) => round(random() * bias[i])))
    );
}

const drawPixel = (pixel, index) => {
  // const canvas = document.getElementById(".c");
  // const ctx = canvas.getContext("2d");
  ctx.fillStyle = pixel;

  // top left
  const x1 = Math.floor(index / pxCount) * pxSize;
  const y1 = (index % pxCount) * pxSize;
  const p1 = [x1, y1];

  // top right
  const x2 =
    (pxCount + Math.floor(pxCount - (index + 1) / pxCount) - 1) * pxSize;
  const y2 = (index % pxCount) * pxSize;
  const p2 = [x2, y2];

  // bottom left
  const x3 = Math.floor(index / pxCount) * pxSize;
  const y3 = (pxCount * 2 - 1 - (index % pxCount) - 1) * pxSize;
  const p3 = [x3, y3];

  // bottom right
  const x4 =
    (pxCount + Math.floor(pxCount - (index + 1) / pxCount) - 1) * pxSize;
  const y4 = (pxCount * 2 - 1 - (index % pxCount) - 1) * pxSize;
  const p4 = [x4, y4];

  const ps = [p1, p2, p3, p4];

  ps.forEach(([x, y]) => {
    ctx.fillRect(x, y, pxSize, pxSize);
  });
};

const drawSquare = (color, x, y, len) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, len, len);
};

function draw() {
  var newCanvasSize = pxSize * pxCount * 2 - pxSize;
  if (newCanvasSize !== canvasSize) {
    canvas.width = newCanvasSize;
    canvas.height = newCanvasSize;
  }

  var _speed = _autoplaySpeedMax - autoplaySpeed;
  var shouldAutoplay = autoplay && !(_autoplayCounter++ % _speed);
  var isPxCountChanged = totalPxCount !== pxCount * pxCount;
  if (!pixels || shouldAutoplay || isPxCountChanged) {
    totalPxCount = pxCount * pxCount;
    pixels = getPixels({
      count: totalPxCount,
      bias: [red, green, blue],
      baseColor,
      baseFrequency,
    });
  }
  // log('pxCount', pxCount, 'tottol', totalPxCount)
  // log('pixels', pixels.length)
  // log('pixels', pixels)
  pixels.forEach((pixel, index) => {
    drawPixel(pixel, index);
  });

  requestAnimationFrame(draw);

  // let data = [
  //   [0, 0, 1],
  //   [0, 1, 0],
  //   [0, 1, 0],
  //   [0, 0, 1],
  //   [0, 1, 0],
  //   [0, 1, 0],
  // ]
  // let new_data = data.map(item => {
  //   let new_item = copy(item).reverse()
  //   return [...item, ...new_item]
  // })
  // for (let i = 0; i < new_data.length; i++) {
  //   const line = new_data[i]
  //   for (let j = 0; j < line.length; j++) {
  //     log('i', i, 'j', j)
  //     let x = j * 32
  //     let y = i * 32
  //     if (new_data[i][j] > 0) {
  //       drawSquare('gray', x, y, 32)
  //     }
  //   }
  // }
  // log('new_data', new_data)

  // 高必须是宽的两倍
}

const handleGithubColor = () => {
  on("#github-index", "input", (e) => {
    githubColorIndex = parseFloat(e.target.value, 10);
  });
};

const handleAutoplay = () => {
  on("#autoplay", "change", (e) => {
    log("e.target.checked", e.target.checked);
    autoplay = e.target.checked;
  });
};

const handleGithubModel = () => {
  on(".mui-switch", "change", (e) => {
    githubModel = e.target.checked;
    $(".mui-switch-msg").innerText = githubModel
      ? "monochromatic"
      : "multicolor";
  });
};

const handleChangePxCount = () => {
  // 初始化
  $("#px-count").value = pxCount;
  // 绑定事件
  on("#px-count", "change", (e) => {
    pxCount = parseInt(e.target.value, 10);
  });
};

const handleChangePxSize = () => {
  $("#px-size").value = pxSize;
  on("#px-size", "change", (e) => {
    pxSize = parseInt(e.target.value, 10);
  });
};

const handleChangeBaseColor = () => {
  on("#base-color", "change", (e) => {
    baseColor = e.target.value;
  });
};

const handleChangeFrequency = () => {
  on("#base-frequency", "change", (e) => {
    baseFrequency = parseFloat(e.target.value, 10);
  });
};

const handleChangeRed = () => {
  on("#red-slider", "change", (e) => {
    red = parseInt(e.target.value, 10);
  });
};

const handleChangeGreen = () => {
  on("#green-slider", "change", (e) => {
    green = parseInt(e.target.value, 10);
  });
};

const handleChangeBlue = () => {
  on("#blue-slider", "change", (e) => {
    blue = parseInt(e.target.value, 10);
  });
};

const handleChangeSpeed = () => {
  const autoplaySpeed = $("#autoplay-speed");
  autoplaySpeed.value = autoplaySpeed;
  autoplaySpeed.max = _autoplaySpeedMax;

  on("#autoplay-speed", "change", (e) => {
    autoplaySpeed = parseInt(e.target.value, 10);
  });
};

const hanldeEvents = () => {
  // github 模式风格的颜色
  handleGithubColor();
  // 是否自动切换
  handleAutoplay();
  // 是单色模式还是多色
  handleGithubModel();
  handleChangePxCount();
  handleChangePxSize();
  handleChangeBaseColor();
  handleChangeFrequency();
  handleChangeRed();
  handleChangeGreen();
  handleChangeBlue();
};

const __main = () => {
  requestAnimationFrame(draw);
  hanldeEvents();
};

__main();

/**
requestAnimationFrame
该方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。
该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。

requestAnimationFrame 优点
1.避免掉帧
完全依赖浏览器的绘制频率，从而避免过度绘制，影响电池寿命。
2.提升性能
当Tab或隐藏的iframe里，暂停调用。

setTimeout和requestAnimationFrame
https://juejin.cn/post/6844904083204079630
 */
