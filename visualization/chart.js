/*
 * @Author: your name
 * @Date: 2021-10-13 20:34:59
 * @LastEditTime: 2021-10-22 20:35:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/visualization/chart.js
 */
const days = [
  {
    text: "Mon",
    value: 19,
    color: "#33A1C9",
  },
  {
    text: "Tue",
    value: 22,
    color: "#FF7D40",
  },
  {
    text: "Thu",
    value: 23,
    color: "#33A1C9",
  },
  {
    text: "Wed",
    value: 21,
    color: "orange",
  },
  {
    text: "Fri",
    value: 22,
    color: "#FF7D40",
  },
  {
    text: "Sat",
    value: 31,
    color: "#F00",
  },
  {
    text: "Sun",
    value: 25,
    color: "#33A1C9",
  },
];

const sum_from_value = (data) => {
  let s = 0;
  for (let d of data) {
    s += d.value;
  }
  return s;
};

const line = (x, y, l, angle, color) => {
  setHeading(angle);
  t.drawLine(x, y, l, color);
};

const triangle = (x1, y1, x2, y2, x3, y3, fill_color, edge_color) => {
  let ctx = t.context;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();

  ctx.strokeStyle = edge_color;
  ctx.stroke();

  ctx.fillStyle = fill_color || "rgba(0,0,255,0.1)";
  ctx.fill();
};

const triangle_x = (x, y, fill_color, edge_color) => {
  let f = 10;
  let x1 = x - f / 2;
  let y1 = y - f;
  let x2 = x + f;
  let y2 = y;
  let x3 = x - f / 2;
  let y3 = y + f;
  triangle(x1, y1, x2, y2, x3, y3, fill_color, edge_color);
};

const triangle_y = (x, y, fill_color, edge_color) => {
  let f = 10;
  let x1 = x - f;
  let y1 = y + f / 2;
  let x2 = x + f;
  let y2 = y + f / 2;
  let x3 = x;
  let y3 = y - f;
  triangle(x1, y1, x2, y2, x3, y3, fill_color, edge_color);
};

const kedu_message = (x, y, color, message, font = "8px serif") => {
  t.text(x, y, message, color, font);
};

const kedu_x = (x, y, data) => {
  // kedu_x   text
  let space = 30;
  let w = 40;
  let start = 40;
  let l = 5;
  for (let i = 0; i < data.length; i++) {
    let d = data[i];
    let x1 = x + start + i * (space + w / 2);
    setPenSize(1);
    line(x1, y, l, -90, "black");

    let y1 = y + 25;
    t.text(x1 - 10, y1, d.text, d.color, "15px serif");
  }
};

const axis_x = (x, y, data, l) => {
  let angel = 0;
  let color = "gray";

  line(x, y, l, angel, color);
  triangle_x(x + l, y, color, color);
  kedu_x(x, y, data);

  let message = "Days";
  kedu_message(x + l, y + 25, "gray", message, "16px serif");
};

const kedu_y = (x, y) => {
  // kedu_x   text
  // 100 px  代表  10 摄氏度
  // 400 / 40 = 10
  let space = 40;
  let l = 5;

  for (let i = 0; i < 10; i++) {
    let y1 = y - i * space;
    setPenSize(1);
    line(x, y1, l, 0, "black");
    let value = int((i * space * 10) / 100);

    let x1 = x;
    if (value > 9) {
      x1 -= 18;
    } else {
      x1 -= 13;
    }
    t.text(x1, y1 + 3, value, "gray", "12px serif");
  }
};

const axis_y = (x, y, data, l) => {
  let angel = 90;
  let color = "gray";

  line(x, y, -l, angel, color);
  triangle_y(x, y - l, color, "black");

  kedu_y(x, y);
  let message = "Temperature ℃";
  kedu_message(x + 28, y - l, "gray", message, "16px serif");
};

const draw_axis = (x, y, data) => {
  let l = 400;
  axis_x(x, y, data, l);
  axis_y(x, y, data, l);
};

const draw_rects = (x, y, data) => {
  let space = 30;
  let w = 40;
  let start = 25;
  // 起点 左下角为参考点
  let x1 = x + start - space / 2;
  for (let i = 0; i < data.length; i++) {
    let x2 = x + start + i * (space + w / 2);
    let h = (data[i].value * 100) / 10;
    let y2 = y - h;
    let color = data[i].color;
    t.rect(x2, y2, w, h, color, "black");

    let x3 = x2 + 8;
    let y3 = y2 - 10;
    let m = data[i].value;
    kedu_message(x3, y3, color, m, "13px serif");
  }
};

const draw_rect_chart = (data) => {
  let x = 40;
  let y = 440;
  draw_axis(x, y, data);
  draw_rects(x, y, data);
};

const draw_point = (x, y, color = "back") => {
  let fator = 1;
  let x1 = x + fator;
  let y1 = y;
  setPenColor(color);
  jump(x1, y1);
  forward(fator);
};

const line1 = (x0, y0, x1, y1, color, factor) => {
  let dy = y1 - y0;
  let dx = x1 - x0;
  let k = dy / dx;
  // factor 虚线
  // let factor = 1
  // let factor = 3
  let x = x0;
  while (x <= x1) {
    let y = k * (x - x0) + y0;
    draw_point(x, y, color);
    x += factor;
  }
};

const connect_two_point = (p1, p2) => {
  setPenSize(2);
  // log('p1', p1.x, p1.y, p2.x, p2.y)
  line1(p1.x, p1.y, p2.x, p2.y, p1.color, 3);
};

const connect_points = (points) => {
  // log('points', points)
  for (let i = 0; i < points.length - 1; i++) {
    let p1 = points[i];
    let p2 = points[i + 1];
    connect_two_point(p1, p2);
  }
};

const draw_lines = (x, y, data) => {
  let space = 30;
  let w = 40;
  let start = 40;
  let l = 5;
  let points = [];
  for (let i = 0; i < data.length; i++) {
    let d = data[i];
    let x1 = x + start + i * (space + w / 2);
    let h = (d.value * 100) / 10;
    let y1 = y - h;
    let color = d.color;

    t.centerRect(x1, y1, 10, 10, color, "gray");

    let p = {
      x: x1,
      y: y1,
      color,
    };
    points.push(p);

    let x3 = x1;
    let y3 = y1 - 10;
    let m = d.value;
    kedu_message(x3, y3, color, m, "13px serif");
  }

  connect_points(points);
};

const draw_line_chart = (data) => {
  let x = 40;
  let y = 440;
  draw_axis(x, y, data);
  draw_lines(x, y, data);
};

const draw_charts = () => {
  // draw_rect_chart(days)
  draw_line_chart(days);
};
// draw_charts()


const drawChart = (option) => {
  const texts = option.xAxis.data
  const values = option.series[0].data
  const type =  option.series[0].type
  const data =  texts.map((t, i) => {
    return {
      text: t,
      value: values[i],
      color: option.series[0].itemStyle
    }
  })
  const charts = {
    rect: draw_rect_chart,
    line: draw_line_chart,
  }
  charts[type](data)
}