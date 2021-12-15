/*
 * @Author: your name
 * @Date: 2021-12-15 13:30:14
 * @LastEditTime: 2021-12-15 13:49:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /search/comp/time.js
 */

const now = () => {
  let d = new Date();
  let nm = d.getFullYear();
  let yt = d.getMonth() + 1;
  let ri = d.getDate();
  let ui = d.getHours();
  let ff = d.getMinutes();
  let mc = d.getSeconds();
  mc = mc < 10 ? `0${mc}`: mc
  ff = ff < 10 ? `0${ff}`: ff
  ui = ui < 10 ? `0${ui}`: ui
  let r = [`${nm}.${yt}.${ri}`, `${ui}:${ff}:${mc}`];
  return r;
};

const addTime = () => {
  setInterval(() => {
    const [date, time] = now();
    e(".g-time").innerHTML = time;
    if (e(".g-date").innerText !== date) {
      e(".g-date").innerHTML = date;
    }
  }, 1000);
};
