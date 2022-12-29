const temptaleColor = (i) => {
  let c = colors[i];
  let t = `
<div class="color" data-number='${i}'   style="background: ${c};"></div>
`;
  return t;
};

const temptaleColors = () => {
  let t = "";
  for (let i = 0; i < window.colors.length; i++) {
    t += temptaleColor(i);
  }
  return t;
};

const insertColorButton = () => {
  let container = e(".colors");
  let t = temptaleColors();
  appendHtml(container, t);
};

const temptalePixelRow = (y, row) => {
  let t = "";
  for (let i = 0; i < row.length; i++) {
    const index = row[i];
    let c = colors[index];
    t += `<div class="pixel" data-x=${i} data-y=${y}   style="background: ${c};"></div>`;
  }
  return `
  <div class="row">
    ${t}
   </div>
  `;
};

const temptalePixels = () => {
  let t = "";
  for (let i = 0; i < window.pixelsData.length; i++) {
    t += temptalePixelRow(i, window.pixelsData[i]);
  }
  return t;
};

const insertPixelsButton = () => {
  let container = e(".pixels");
  let t = temptalePixels();
  appendHtml(container, t);
};

const init = () => {
  insertColorButton();
  insertPixelsButton();
};

const bindEventPixels = () => {
  bindEvent(e(".pixels"), "click", (event) => {
    let target = event.target;
    if (target.classList.contains("pixel")) {
      let x = target.dataset.x;
      let y = target.dataset.y;
      let v = pixelsData[y][x];
      if (v !== current) {
        pixelsData[y][x] = current;
        let c = colors[current];
        target.style.background = c;
      }
    }
  });
};

const bindEventColors = () => {
  bindEvent(e(".colors"), "click", (event) => {
    let target = event.target;
    if (target.classList.contains("color")) {
      let n = target.dataset.number;
      if (n !== current) {
        current = n;
        let c = colors[n];
        e(".current-pixel").style.background = c;
      }
    }
  });
};

const bindEvents = () => {
  bindEventPixels();
  bindEventColors();
};

const __main = () => {
  const size = 10;
  window.pixelsData = initMap(size);
  window.current = 0;
  init();
  bindEvents();
};

__main();
