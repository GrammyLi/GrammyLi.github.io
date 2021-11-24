const startMusic = function() {
    let b = e('.g-bg')  
    b.play()
    b.loop = true
}
const stopMusic = function() {
    let b = e('.g-bg')  
    b.currentTime = 0
    b.pause()
}
const gameOverMusic = function() {
    stopMusic()
    e('.g-game-over').play()
}
const elementMusic = function(sel) {
    e(sel).currentTime = 0
    e(sel).play()
}
const flyMusic = function() {
    elementMusic('.g-fly')
}
const hitMusic = function() {
    elementMusic('.g-hit-pipe')
}