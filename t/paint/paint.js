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
    this.bindEvents();
  }
  updatePaintConfig() {
    if (this.typeStatus.erasering) {
      this.ctx.strokeStyle = "white";
      this.ctx.lineWidth = 4;
    } else {
      this.ctx.strokeStyle = "#2c2c2c";
      this.ctx.lineWidth = 2.5;
    }
  }
  bindEventMove() {
    const { canvas, ctx } = this;
    bindEvent(canvas, "mousemove", (event) => {
      this.updatePaintConfig()
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
  bindEvnetType() {
    bindEvent(e(".controls__type"), "click", (event) => {
      const target = event.target;
      this.type = target.dataset.type
    });
  }
  bindEvents() {
    this.bindEventMove();
    this.bindEventDown();
    this.bindEventUp();
    this.bindEventLeave();
    this.bindEvnetType();
  }
}
