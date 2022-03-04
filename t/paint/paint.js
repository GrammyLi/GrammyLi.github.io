class Paint extends G {
  constructor({ selector, w, h }) {
    super();
    this.canvas = e(selector)
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.strokeStyle = "#2c2c2c";
    this.ctx.lineWidth = 2.5;
    this.painting = false;
    this.bindEvents();
  }
  bindEventMove() {
    const { canvas, ctx,} = this;
    bindEvent(canvas, "mousemove", (event) => {
      const x = event.offsetX;
      const y = event.offsetY;
      if (!this.painting) {
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
      this.painting = true;
    });
  }
  bindEventUp() {
    const { canvas } = this;
    bindEvent(canvas, "mouseup", (event) => {
      this.painting = false;
    });
  }
  bindEventLeave() {
    const { canvas } = this;
    bindEvent(canvas, "mouseleave", (event) => {
      this.painting = false;
    });
  }
  bindEvents() {
    this.bindEventMove();
    this.bindEventDown();
    this.bindEventUp();
    this.bindEventLeave();
  }
}