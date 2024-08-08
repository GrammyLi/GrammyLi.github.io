/**
 * 检查两个矩形是否相交，并确定相交的方向。
 * @param {Object} a - 第一个矩形，包含 x（左上角 x 坐标），y（左上角 y 坐标），w（宽度），h（高度）。
 * @param {Object} b - 第二个矩形，包含 x（左上角 x 坐标），y（左上角 y 坐标），w（宽度），h（高度）。
 * @returns {Object} 返回一个对象，包含 intersect（布尔值，表示是否相交）和 direction（字符串，表示相交的方向：'x'、'y' 或 'both'）。
 */
const rectIntersects = (a, b) => {
  let minx1 = a.x;
  let miny1 = a.y;
  let maxx1 = a.x + a.w;
  let maxy1 = a.y + a.h;

  let minx2 = b.x;
  let miny2 = b.y;
  let maxx2 = b.x + b.w;
  let maxy2 = b.y + b.h;

  let minx = Math.max(minx1, minx2);
  let miny = Math.max(miny1, miny2);
  let maxx = Math.min(maxx1, maxx2);
  let maxy = Math.min(maxy1, maxy2);

  let intersect = minx <= maxx && miny <= maxy;
  let direction = "";
  // 从 x 方向或 y 方向相交
  if (intersect) {
    let deltaX = maxx - minx;
    let deltaY = maxy - miny;
    if (deltaX < deltaY) {
      direction = "x";
    } else if (deltaX > deltaY) {
      direction = "y";
    } else {
      direction = "both";
    }
  }
  let result = {
    intersect: intersect,
    direction: direction,
  };
  return result;
};

/**
 * 生成一个在指定范围内的随机整数。
 * @param {number} start - 范围的起始值（包括）。
 * @param {number} end - 范围的结束值（包括）。
 * @returns {number} 返回一个在 start 和 end 之间的随机整数。
 */
const randomBetween = (start, end) => {
  let n = Math.random() * (end - start + 1);
  return Math.floor(n + start);
};
