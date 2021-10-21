/*
 * @Author: grammyli
 * @Date: 2021-10-20 22:07:46
 * @LastEditTime: 2021-10-21 12:13:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/break-out/game/auido.js
 */
const startMusic = () => {
    // let b = e('.g-bg')
    // b.currentTime = 0
    // b.play()
}
const stopMusic = () => {
    // let b = e('.g-bg')
    // b.currentTime = 0    
    // b.pause()
}
const elementMusic = (sel) => {
    e(sel).play()
}
const blockMusic = () => {
    elementMusic('.g-block-hit')
}
const paddleMusic = () => {
    elementMusic('.g-paddle-hit')
}
const wallMusic = () => {
    elementMusic('.g-wall-hit')
}
const gameOverMusic = () => {
    stopMusic()
    elementMusic('.g-game-over')
}