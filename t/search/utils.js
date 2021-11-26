/*
 * @Author: your name
 * @Date: 2021-11-04 19:56:27
 * @LastEditTime: 2021-11-26 15:05:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/search/utils.js
 */
const debug = true
const log = debug ? console.log.bind('***🍉 debug 🍉***' ,console) : function () { }
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

const ajax = (request) => {
  let {method, path, data, callback} = request
  let r = new XMLHttpRequest()
  r.open(method, path, true)
  r.setRequestHeader('Content-Type', 'application/json')
  r.onreadystatechange = () => {
      if (r.readyState === 4) {
          callback(r.response)
      }
  }
  if (method === 'POST') {
      data = JSON.stringify(data)
  }
  r.send(data)
}

const addAction = (action, a) => {
  action = Object.assign(action, a)
}

const show = (sel) => {
  e(sel).classList.remove('g-hide')
}

const hide = (sel) => {
  e(sel).classList.add('g-hide')
}

const unique = arr => Array.from(new Set(arr))