/*
 * @Author: your name
 * @Date: 2021-11-05 10:06:10
 * @LastEditTime: 2021-11-08 12:54:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/search/config.js
 */
 
window.engines = [
  {
    id: 1,
    url: "./img/icons8-google.svg",
    text: "Google",
    search: 'https://www.google.com.hk/search?q=keyword',
  },
  {
    id: 2,
    url: "./img/4375093_logo_overflow_stack_icon.svg",
    text: "Stack overflow",
    search: 'https://stackoverflow.com/nocaptcha?q=keyword',
  },
  {
    id: 11,
    url: "./img/icons8-qq.svg",
    text: "Grammyli",
    search: 'https://www.sogou.com/web?query=keyword',
  },
  {
    id: 3,
    url: "./img/icons8-bing.svg",
    text: "Bing",
    search: 'https://cn.bing.com/search?q=keyword&form=QBLH',
  },
  {
    id: 4,
    url: "./img/icons8-baidu.svg",
    text: "Baidu",
    search: 'https://www.baidu.com/s?wd=keyword',
  },
  {
    id: 5,
    url: "./img/icons8-github.svg",
    text: "Github",
    search: 'https://github.com/search?utf8=%E2%9C%93&q=keyword',
  },
  {
    id: 6,
    url: "./img/juejin.svg",
    text: "Juejin",
    search: 'https://juejin.cn/search?query=keyword',
  },
  {
    id: 7,
    url: "./img/douban.svg",
    text: "Douban",
    search: 'https://www.douban.com/search?q=keyword',
  },
  {
    id: 8,
    url: "./img/7417375_bilibili_b site_logo_video_website_icon.svg",
    text: "Bilibili",
    search: 'https://search.bilibili.com/all?keyword=wefw&from_source=web_search',
  },
  // {
  //   id: 9,
  //   url: "./img/214732_zhihu_china_chinese_icon.svg",
  //   text: "Zhihu",
  //   search: 'https://www.zhihu.com/search?type=content&q=keyword',
  // },
  {
    id: 10,
    url: "./img/Mdn.svg",
    text: "MDN",
    search: 'https://developer.mozilla.org/zh-CN/search?q=keyword',
  },
];

window.enginesIds = []
engines.forEach((e, i) => {
  enginesIds.push(e.id)
})