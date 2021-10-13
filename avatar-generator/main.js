/*
 * @Author: your name
 * @Date: 2021-10-12 09:44:43
 * @LastEditTime: 2021-10-13 19:25:17
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

  pixels.forEach((pixel, index) => {
    drawPixel(pixel, index);
  });

  requestAnimationFrame(draw);
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
  $('#px-count').value = pxCount
  // 绑定事件
  on("#px-count", "change", (e) => {
    pxCount = parseInt(e.target.value, 10);
  });
};

const handleChangePxSize = () => {
  $('#px-size').value = pxSize
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

  const autoplaySpeed = $("#autoplay-speed")
  autoplaySpeed.value = autoplaySpeed
  autoplaySpeed.max = _autoplaySpeedMax

  on("#autoplay-speed", "change", (e) => {
    autoplaySpeed = parseInt(e.target.value, 10)
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
