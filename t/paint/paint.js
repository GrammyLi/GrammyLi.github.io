class Paint extends G {
  constructor({ selector, w, h }) {
    super();
    this.canvas = e(selector);
    this.canvas.width = w;
    this.canvas.height = h;
    this.w = w;
    this.h = h;
    this.setup();
    this.bindEvents();
  }
  setup() {
    this.ctx = this.canvas.getContext("2d");
    this.pixels = this.ctx.getImageData(0, 0, this.w, this.h);
    // 鼠标在画板上移动事件
    this.moveEvent = MoveEvent.new({ ele: this.canvas });
    // 画笔的类型
    this.type = "painting";
    // 画笔的状态
    this.typeStatus = {
      erasering: false,
      painting: false,
      line: false,
      edgeRect: false,
      fillRect: false,
    };
    this.penSize = 2.5;
    this.penColor = "#2c2c2c";
    this.bgColor = "white";
    this.points = [];
  }
  updatePaintConfig() {
    this.ctx.strokeStyle = this.penColor;
    this.ctx.lineWidth = this.penSize;
  }
  line(p1, p2) {
    const { ctx } = this;
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  edgeRect(p1, p2) {
    const { ctx } = this;
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const w = x2 - x1
    const h = y2 - y1
    ctx.lineWidth = this.penSize;        
    ctx.strokeRect(x1, y1, w, h);
    ctx.fill();
  }
  fillRect(p1, p2) {
    const { ctx } = this;
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const w = x2 - x1
    const h = y2 - y1
    ctx.fillStyle = this.penColor;
    ctx.fillRect(x1, y1, w, h);
    ctx.fill();
  }
  clear() {
    log('清空画布')
    this.ctx.clearRect(0, 0, this.w, this.h);
  }
  save() {
    this.pixels = this.ctx.getImageData(0, 0, this.w, this.h);
  }
  // 重新绘制之前的画布
  set() {
    this.ctx.putImageData(this.pixels, 0, 0);
  }
  bindEventPenMove() {
    const { ctx, moveEvent } = this;
    moveEvent.move((event) => {
      this.updatePaintConfig();
      const x = event.offsetX;
      const y = event.offsetY;
      const status = this.typeStatus[this.type];
      if (status) {
        const types = ["line", "fillRect", 'edgeRect'];
        log('this.type', this.type)
        if (types.includes(this.type)) {
          // 第一次点击，之后鼠标移动，会自动画线
          if (this.points.length !== 1) {
            return;
          }
          log('画')
          // 清画布
          this.clear();
          // 画之前的画布
          this.set();
          let p1 = this.points[0];
          let p2 = [x, y];
          this[this.type](p1, p2);
        } else {
          log('保存')
          ctx.lineTo(x, y);
          ctx.stroke();
          this.save();
        }
      } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    });
    moveEvent.down((event) => {
      this.typeStatus[this.type] = true;
      const types = ["line", "fillRect", 'edgeRect'];
      if (types.includes(this.type)) {
        const x = event.offsetX;
        const y = event.offsetY;
        const p = [x, y];
        this.points.push(p);
        if (this.points.length === 2) {
          const [p1, p2] = this.points;
          this[this.type](p1, p2);
          this.points = [];
          log('dwon 保存')
          this.save();
        }
      } else {
        if (this.points.length > 0) {
          this.points = [];
        }
      }
    });
    moveEvent.up((event) => {
      const types = ["line", "fillRect", 'edgeRect'];
      if (types.includes(this.type)) {
        return;
      }
      this.typeStatus[this.type] = false;
    });
    moveEvent.leave((event) => {
      const types = ["line", "fillRect", 'edgeRect'];
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
      log('this.type', this.type)
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
      log("color", color);
      this.penColor = color;
    });
  }
  test() {}
  bindEvents() {
    this.bindEventPenMove();
    this.bindEventPenType();
    this.bindEventPenSize();
    this.bindEventPenColor();
    this.test();
  }
}
