class Paint extends G {
  constructor({ selector, w, h }) {
    super();
    this.canvas = e(selector);
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext("2d");

    this.type = "painting";
    this.typeStatus = {
      erasering: false,
      painting: false,
    };
    this.penSize = 2.5;
    this.penColor = "#2c2c2c";
    this.bgColor = "white";
    this.bindEvents();
  }
  updatePaintConfig() {
    this.ctx.strokeStyle = this.penColor;
    this.ctx.lineWidth = this.penSize;
  }
  bindEventMove() {
    const { canvas, ctx } = this;
    bindEvent(canvas, "mousemove", (event) => {
      this.updatePaintConfig();
      const x = event.offsetX;
      const y = event.offsetY;
      if (!this.typeStatus[this.type]) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    });
  }
  bindEventDown() {
    const { canvas } = this;
    bindEvent(canvas, "mousedown", (event) => {
      this.typeStatus[this.type] = true;
    });
  }
  bindEventUp() {
    const { canvas } = this;
    bindEvent(canvas, "mouseup", (event) => {
      this.typeStatus[this.type] = false;
    });
  }
  bindEventLeave() {
    const { canvas } = this;
    bindEvent(canvas, "mouseleave", (event) => {
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
  bindEventType() {
    bindEvent(e(".controls__type"), "click", (event) => {
      const target = event.target;
      this.type = target.dataset.type;
      this.penColorByType();
    });
  }
  // 画笔的大小
  bindEventPenSize() {
   // e('.controls__range-size')
   bindEvent(e('.controls__range-size'), "change", (event) => {
    const target = event.target
    const v = int(target.value)
    this.penSize = v
   })
  }
  // 画笔的颜色
  bindEventPenColor() {
    bindEvent(e('.controls__colors'), "click", (event) => {
      const target = event.target
      const color = target.style.backgroundColor
      log('color', color)
      this.penColor = color
     })
  }
  bindEvents() {
    this.bindEventMove();
    this.bindEventDown();
    this.bindEventUp();
    this.bindEventLeave();
    this.bindEventType();
    this.bindEventPenSize();
    this.bindEventPenColor()
  }
}
