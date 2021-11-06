/*
 * @Author: your name
 * @Date: 2021-11-04 19:56:27
 * @LastEditTime: 2021-11-06 13:53:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/search/utils.js
 */
const debug = true
const log = debug ? console.log.bind(console) : function () { }
const int = number => parseInt(number, 10)

const bindEvent = (element, eventName, callback) => {
  element.addEventListener(eventName, callback)
}

const bindAll = (elements, callback) => {
  elements.forEach(element => {
    callback(element)
  })
}

const appendHtml = (element, html) => {
  element.insertAdjacentHTML('beforeend', html)
}

const e = selector => document.querySelector(selector)
const es = selector => document.querySelectorAll(selector)