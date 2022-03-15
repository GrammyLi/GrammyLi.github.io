class Paint extends G {
  constructor({ selector, w, h }) {
    super();
    this.canvas = e(selector);
    this.canvas.width = w;
    this.canvas.height = h;
    this.w = w;
    this.h = h;
    this.setup();
    this.insertButtons();
    this.bindEvents();
  }
  setup() {
    this.ctx = this.canvas.getContext("2d");
    // 画布像素信息
    this.pixels = this.ctx.getImageData(0, 0, this.w, this.h);
    // 鼠标在画板上移动事件
    this.moveEvent = MoveEvent.new({ ele: this.canvas });
    // 画笔的类型
    this.type = "painting";
    // 是否完全填充色
    this.fill = false;
    // 线的类型
    this.lineType = "line";
    // 画笔的大小
    this.penSize = 1;
    // 如果虚线的时候，点的间距
    this.dattedSize = 5;
    this.penColor = "#2c2c2c";
    this.bgColor = "white";

    this.graphicsTypes = {
      rect: false,
      ellipse: false,
      circle: false,
    };
    this.penTypes = {
      linePen: false,
      circlePen: false,
      squarePen: false,
      trianglePen: false,
      moPen: false,
    };
    this.types = Object.keys(this.graphicsTypes);
    this.types.push("linePen");
    this.types.push("cutout");
    this.typeStatus = Object.assign(this.graphicsTypes, this.penTypes);
    this.typeStatus.cutout = false;
    this.points = [];
    this.cutoutPoints = [];
    // 是否点击到剪切位置
    this.cutoutInPoints = false;
    this.cutoutPoint = null;
  }
  templateButton(type) {
    return `<button class="g__input-type" data-type="${type}"> ${type} </button>`;
  }
  insertButtons() {
    const container = e(".controls__btns");
    const btns = Object.keys(this.typeStatus);
    const content = btns.map((t) => this.templateButton(t)).join("\n");
    appendHtml(container, content);
  }
  rect(p1, p2) {
    const { ctx, fill } = this;
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const w = x2 - x1;
    const h = y2 - y1;
    if (fill) {
      ctx.fillStyle = this.penColor;
      ctx.fillRect(x1, y1, w, h);
      ctx.fill();
    } else {
      ctx.lineWidth = this.penSize;
      ctx.strokeRect(x1, y1, w, h);
    }
  }
  ellipse(p1, p2) {
    const { ctx, fill } = this;
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const angle = 0;
    ctx.beginPath();
    const x = (x1 + x2) / 2;
    const y = (y1 + y2) / 2;
    const w = x2 - x1;
    const h = y2 - y1;
    ctx.ellipse(x, y, int(w), int(h), (angle * Math.PI) / 180, 0, 2 * Math.PI);
    ctx.strokeStyle = this.penColor;
    if (fill) {
      ctx.fillStyle = this.penColor;
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
  linePen(p1, p2) {
    const { ctx } = this;
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  circle(p1, p2) {
    const { ctx, fill } = this;
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const r2 = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    const r = int(Math.sqrt(r2));
    ctx.beginPath();
    if (fill) {
      ctx.arc(x1, y1, r, 0, 2 * Math.PI);
      ctx.strokeStyle = this.penColor;
      ctx.fillStyle = this.penColor;
      ctx.fill();
    } else {
      ctx.arc(x1, y1, r, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
  circlePen([x, y]) {
    const { ctx } = this;
    const r = this.penSize;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.strokeStyle = this.penColor;
    ctx.fillStyle = this.penColor;
    ctx.fill();
  }
  squarePen([x, y]) {
    let s = this.penSize / 2;
    let x1 = x - s;
    let y1 = y - s;
    let p1 = [x1, y1];
    let x2 = x + s;
    let y2 = y + s;
    let p2 = [x2, y2];
    this.rect(p1, p2);
  }
  trianglePen([x, y]) {
    const { ctx } = this;
    let s = this.penSize / 2;
    let x1 = x - s / 2;
    let y1 = y - s;
    let x2 = x + s / 2;
    let y2 = y + s;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + this.penSize, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2 - this.penSize, y2);
    ctx.fill();
  }
  moPen([x, y]) {
    let pi = Math.PI;
    let pointNum = 10;
    let R = this.penSize * 15;
    for (let i = 0; i < pointNum; i++) {
      let r = randomBetween(0, R);
      let t = randomBetween(0, 2 * pi);
      let x1 = r * Math.sin(t);
      let y1 = r * Math.cos(t);
      this.circlePen([x1 + x, y1 + y]);
    }
  }
  cutout(p1, p2) {
    const { ctx } = this;
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    this.fill = false;
    this.penColor = "red";
    let w = int(x1 - x2);
    let h = int(y1 - y2);  
    this.rect(p1, p2);
    const p3 = [x1 + w, y1];
    const p4 = [x1, y1 + h];
    this.cutoutW = w;
    this.cutoutH = h;
    // p1 -> p3 -> p2 -> p4
    this.cutoutPoints = [p1, p3, p2, p4];
  }
  clear() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }
  save() {
    this.pixels = this.ctx.getImageData(0, 0, this.w, this.h);
  }
  // 重新绘制之前的画布
  set() {
    this.ctx.putImageData(this.pixels, 0, 0);
  }
  updatePaintConfig() {
    this.ctx.strokeStyle = this.penColor;
    this.ctx.lineWidth = this.penSize;
  }
  updateConfigByLineType() {
    const { ctx } = this;
    if (this.lineType === "dash") {
      ctx.setLineDash([]);
    } else if (this.lineType === "datted") {
      ctx.setLineDash([this.dattedSize]);
    } else {
    }
  }
  bindEventPenMove() {
    const { ctx, moveEvent, types } = this;
    moveEvent.move((event) => {
      this.updatePaintConfig();
      const x = event.offsetX;
      const y = event.offsetY;
      const status = this.typeStatus[this.type];
      // TODO  优化代码
      if (status) {
        if (types.includes(this.type)) {
          if (this.type === "cutout" && this.cutoutInPoints) {
            // log("切换 移动");
            let moveX = x - this.cutoutPoint[0];
            let moveY = y - this.cutoutPoint[1];
            let [cutX, cutY] = this.cutoutPoints[0];
            let x1 = cutX + moveX;
            let y1 = cutY + moveY;
            this.firstPoint = [x1, y1]
            ctx.putImageData(this.lowerData, 0, 0);
            ctx.putImageData(this.cutoutData, x1, y1);
            return;
          }
          // 第一次点击，之后鼠标移动，会自动画线
          if (this.points.length !== 1) {
            return;
          }
          // 清画布
          this.clear();
          // 画之前的画布
          this.set();
          let p1 = this.points[0];
          let p2 = [x, y];
          log('this.type', this.type)
          this[this.type](p1, p2);
        } else {
          if (this.penTypes.hasOwnProperty(this.type)) {
            this[this.type]([x, y]);
          } else {
            ctx.lineTo(x, y);
            ctx.stroke();
          }
          this.save();
        }
      } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    });
    moveEvent.down((event) => {
      this.typeStatus[this.type] = true;
      if (types.includes(this.type)) {
        const x = event.offsetX;
        const y = event.offsetY;
        const p = [x, y];
        this.points.push(p);
        if (this.cutoutPoints.length > 0) {
          // 说明是选择 cutout 模式
          const [p1, p2, p3, p4] = this.cutoutPoints;
          const w = int(p2[0] - p1[0]);
          const h = int(p2[1] - p3[1]);
          // 判断是否第三次点击
          if (this.points.length > 2) {
            // 判断是否点击到里面
            let isX = x > p1[0] && x < p2[0];
            let isY = y > p1[1] && y < p4[1];
            if (isX && isY) {
              this.cutoutInPoints = true;
              this.cutoutPoint = [x, y];
            }
          } else {
            const [x1, y1] = p1;
            this.cutoutData = this.ctx.getImageData(x1, y1, w, h);
            this.ctx.clearRect(x1, y1, w, h);
            this.lowerData = this.ctx.getImageData(0, 0, this.w, this.h);
            this.ctx.putImageData(this.cutoutData, x1, y1)
          }
        } else if (this.points.length === 2) {
          const [p1, p2] = this.points;
          this[this.type](p1, p2);
          this.points = [];
          this.save();
        }
      } else {
        if (this.points.length > 0) {
          this.points = [];
        }
      }
    });
    moveEvent.up((event) => {
      // TODO 待优化
      if (
        this.type === "cutout" &&
        this.cutoutInPoints &&
        this.points.length > 2
      ) {
        let [x1, y1] = this.points[0]
        let [x2, y2] = this.firstPoint
        const w = this.cutoutW
        const h = this.cutoutH
        this.clear()
        this.set()
        const cutoutData = this.ctx.getImageData(x1, y1, w, h);
        this.ctx.clearRect(x1, y1, w, h);
        this.ctx.putImageData(cutoutData, x2, y2)
       
        this.points = [];
        // 切割的四个点
        this.cutoutPoints = [];
        // 是否点击到剪切位置
        this.cutoutInPoints = false;
        // 点击切割图像里面的点
        this.cutoutPoint = null;

        this.save();
        // this.set()
      }
      if (types.includes(this.type)) {
        return;
      }
      this.typeStatus[this.type] = false;
    });
    moveEvent.leave((event) => {
      if (types.includes(this.type)) {
        return;
      }
      this.typeStatus[this.type] = false;
    });
  }
  // 画笔颜色根据画笔类型来定
  penColorByType() {
    if (this.type === "erasering") {
      this.penColor = this.bgColor;
    }
  }
  // 画笔的类型
  bindEventPenType() {
    bindEvent(e(".controls__type"), "click", (event) => {
      const target = event.target;
      this.type = target.dataset.type;
      log("this.type", this.type);
      this.penColorByType();
    });
  }
  // 画笔的大小
  bindEventPenSize() {
    // e('.controls__range-size')
    bindEvent(e(".controls__range-size"), "change", (event) => {
      const target = event.target;
      const v = int(target.value);
      this.penSize = v;
    });
  }
  // 画笔的颜色
  bindEventPenColor() {
    bindEvent(e(".controls__colors"), "click", (event) => {
      const target = event.target;
      const color = target.style.backgroundColor;
      this.penColor = color;
    });
  }
  test() {
    const { ctx } = this;
    // ctx.setLineDash([]);
    // ctx.beginPath();
    // ctx.ellipse(100, 100, 50, 75, (45 * Math.PI) / 180, 0, 2 * Math.PI); //倾斜45°角
    // ctx.stroke();
    // ctx.setLineDash([5]);
    // ctx.moveTo(0, 200);
    // ctx.lineTo(200, 0);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(100, 0);
    // ctx.lineTo(200, 0);
    // ctx.lineTo(150, 100);
    // ctx.lineTo(50, 100);
    // ctx.fill();
    // Now you can just call

    // Draw using default border radius,
    // stroke it but no fill (function's default values)
    // this.roundRect(this.ctx, 5, 5, 50, 50, 20);
    // To change the color on the rectangle, just manipulate the context
    // ctx.strokeStyle = "rgb(255, 0, 0)";
    // ctx.fillStyle = "rgba(255, 255, 0, .5)";
    // roundRect(ctx, 100, 5, 100, 100, 20, true);
  }
  bindEventLineType() {
    bindEvent(e(".g__input-radios"), "click", (event) => {
      let target = event.target;
      if (target.classList.contains("g__input-line")) {
        es(".g__input-line").forEach((ele) => {
          ele.checked = false;
        });
        target.checked = true;
        this.lineType = target.dataset.type;
        this.updateConfigByLineType();
      }
    });
  }
  bindEventFillColor() {}
  bindEvents() {
    this.bindEventPenMove();
    this.bindEventPenType();
    this.bindEventPenSize();
    this.bindEventPenColor();
    this.bindEventLineType();
    this.test();
  }
  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === "undefined") {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    if (typeof radius === "number") {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius.br,
      y + height
    );
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }
}

// 第一步：

// 第一次点击，点击画红色矩形， 完成
// 第二次点击，记录四个点，并且保存着四个点
// 第三次点击，点击判断是否在矩形内部,如果在内部，可以拖拽移动
// 剩余的数据， 再画选择的矩形，

// 关闭cutout, 清除四个点

// 第二步；
// 第三次点击，点击判断是否在矩形内部，可以拖拽
// 如果点击外部，则取消 cutout
