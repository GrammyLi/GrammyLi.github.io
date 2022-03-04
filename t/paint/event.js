class MoveEvent {
  constructor({ ele }) {
    this.ele = ele
  }
  static new(...args) {
    this.instance = this.instance || new this(...args);
    return this.instance;
  }
  move(callback) {
    bindEvent(this.ele, "mousemove", callback);
  }
  up(callback) {
    bindEvent(this.ele, "mouseup", callback);
  }
  down(callback) {
    bindEvent(this.ele, "mousedown", callback);
  }
  leave(callback) {
    bindEvent(this.ele, "mouseleave", callback);
  }
}