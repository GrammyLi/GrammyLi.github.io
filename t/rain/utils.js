/*
 * @Author: your name
 * @Date: 2022-02-13 13:00:21
 * @LastEditTime: 2022-02-13 13:00:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /rain/utils.js
 */
const debug = true;
const log = debug ? console.log.bind(console) : function () {};

const e = (selector) => document.querySelector(selector);

class G {
  constructor() {}
  static new(...args) {
    let i = new this(...args);
    return i;
  }
}