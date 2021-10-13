/*
 * @Author: your name
 * @Date: 2021-10-12 09:44:14
 * @LastEditTime: 2021-10-13 13:18:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/avatar-generator/utils.js
 */
const debug = true
const log = debug ? console.log.bind(console) : function() { }
const int = number => parseInt(number, 10)

const copy = arr_or_obj => {
    let a = JSON.parse(JSON.stringify(arr_or_obj))
    return a
}

const githubs_colors = [
    "FFCC22",
    "FBD2C7",
    "F2AD9B",
    "E58F7B",
    "E4A070",
    "B16A5B",
    "92594B",
    "623D36",
    "C9E6DC",
    "362C47",
    "675E97",
    "5AC4D4",
    "DEE1F5",
    "6C4545",
    "F29C65",
    "E16381",
    "E15C66",
    "362C47",
    "675E97",
    "5AC4D4",
    "DEE1F5",
    "6c4545",
    "F29C65",
    "E16381",
    "E15C66",
  ];