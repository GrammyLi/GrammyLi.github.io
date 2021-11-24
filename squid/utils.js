/*
 * @Author: your name
 * @Date: 2021-11-23 19:18:02
 * @LastEditTime: 2021-11-24 09:34:07
 * @LastEditors: Please set LastEditors
 * @Description:  
 */
const debug = true
const log = debug ? console.log.bind(console) : function () { }
const int = number => parseInt(number, 10)

const bindEvent = (element, eventName, callback, status = true) => {
  element.addEventListener(eventName, callback, status)
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

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}