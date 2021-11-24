/*
 * @Author: your name
 * @Date: 2021-06-20 22:46:54
 * @LastEditTime: 2021-10-14 19:27:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/snake/utils/audio.js
 */
const startMusic = function() {
    //  e('.grammy-bgm').play()
    //  e('.grammy-bgm').loop = true
}
const gameOver = function() {
    stopMusic()
    e('.grammy-gameover').play()
}
const stopMusic = () => {
    // e('.grammy-bgm').pause()
    // e('.grammy-bgm').currentTime = 0
}
const upMusic = () => {
    e('.grammy-up').play()
}
const downMusic = () => {
    e('.grammy-down').play()
}
const leftMusic = () => {
    e('.grammy-left').play()
}
const rightMusic = () => {
    e('.grammy-right').play()
}
const eatMusic = () => {
    e('.grammy-eat').play()
}