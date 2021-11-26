/*
 * @Author: your name
 * @Date: 2021-11-26 19:45:11
 * @LastEditTime: 2021-11-26 19:52:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /search/comp/modal.js
 */
const modalAction = {
  cancel() {
    setTimeout(() => {
      hide('.g-modal')
    }, 300)
  },
}