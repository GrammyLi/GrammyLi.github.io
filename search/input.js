/*
 * @Author: your name
 * @Date: 2021-11-09 18:25:43
 * @LastEditTime: 2021-11-09 19:15:11
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: /grammyli/search/input.js
 */
const renderSearchMenus = () => {
  let menus = e(".g-search__menus");
  menus.innerHTML = "";
  let v = e(".g-input__search").value;
  if (v.length === 0) {
    return;
  }
  let url = `https://www.sogou.com/suggnew/ajajjson?type=web&key=${v}`;
  // let url = `https://www.sogou.com/suggnew/ajajjson?type=web&&${v}`
  // method, path, data, callback
  // ajax({
  //   method: "GET",
  //   path: url,
  //   data: null,
  //   callback: (res) => {
  //     log("res", res);
  //   },
  // });
  $.ajax({
    url,
    dataType: "jsonp",
    type: "get",
    data: {},
    // jsonp: "ajajjson",
    success: (res) => {
      log('xxx')
      log('res', res)
    },
    error: (err) => {
      log('err', err)
      log('window.s', window.sogou)
    }
  });
};

const bindEventChange = () => {
  // 输入框值发生改变时
  bindEvent(e(".g-input__search"), "input", (event) => {
    let v = event.target.value;
    if (v.length > 0) {
      renderSearchMenus();
    }
  });
};
