/*
 * @Author: your name
 * @Date: 2021-06-20 22:46:54
 * @LastEditTime: 2021-10-14 09:59:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game/puzzle/music.js
 */
const cutMusic = () => {
    let c = e('.grammy-cut')
    log('c', c)
    // let s = find(c, 'source')
    // log('s', s)
    c.play()
}
const noMusic = () => {

}
const playBg = () => {
    let p = e('#id-audio-player')
    log('p', p)
    p.play()
}

