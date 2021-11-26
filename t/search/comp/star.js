/*
 * @Author: your name
 * @Date: 2021-11-26 14:53:38
 * @LastEditTime: 2021-11-26 16:04:23
 * @LastEditors: Please set LastEditors
 * @Description: 点击收藏卡片，直接就可以跳转到相应网站
 * @FilePath: /search/comp/star.js
 */
const templateStar = ({ id, url, text, star}) => {
  return `
  <a class="g-star g-star-${id}" data-id="${id}" href=${star} target="_blank">
    <img src="${url}"  data-action="clickstarCard"  />
    <span data-action="clickstarCard">${text}</span>
  </a>
  `;
};

const renderstars = () => {
  let t = window.stars.map((e, i) => templateStar(e, i)).join("");
  appendHtml(e(".g-stars"), t);
};

const starAction = {
  clickstarCard(event) {
    log('点击收藏卡片')
  }
}