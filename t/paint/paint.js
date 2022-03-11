class Paint extends G {
  constructor({ selector, w, h }) {
    super();
    this.canvas = e(selector);
    this.canvas.width = w;
    this.canvas.height = h;
    this.w = w;
    this.h = h;
    this.setup();
    this.insertButtons()
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
    this.typeStatus = Object.assign(this.graphicsTypes, this.penTypes);
    log("type", this.typeStatus);
    this.points = [];
  }
  templateButton(type) {
    return `<button class="g__input-type" data-type="${type}"> ${type} </button>`
  }
  insertButtons() {
    const container = e('.controls__btns')
    const btns = Object.keys(this.typeStatus)
    const content = btns.map(t => this.templateButton(t)).join('\n')
    appendHtml(container, content)
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
    } else {
      ctx.lineWidth = this.penSize;
      ctx.strokeRect(x1, y1, w, h);
    }
    ctx.fill();
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
    const w = x2 - x1;
    const h = y2 - y1;
    this.cutData = this.ctx.getImageData(x1, x2);
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
      if (status) {
        if (types.includes(this.type)) {
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
        if (this.points.length === 2) {
          const [p1, p2] = this.points;
          this[this.type](p1, p2);
          this.points = [];
          log("dwon 保存");
          this.save();
        }
      } else {
        if (this.points.length > 0) {
          this.points = [];
        }
      }
    });
    moveEvent.up((event) => {
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
  bindEvents() {
    this.bindEventPenMove();
    this.bindEventPenType();
    this.bindEventPenSize();
    this.bindEventPenColor();
    this.bindEventLineType();
    this.test();
  }
}
