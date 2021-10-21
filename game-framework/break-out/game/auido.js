log('music  xxxxx debug')
const startMusic = () => {
    let b = e('.g-bg')
    b.currentTime = 0
    b.play()
}
const stopMusic = () => {
    let b = e('.g-bg')
    b.currentTime = 0    
    b.pause()
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