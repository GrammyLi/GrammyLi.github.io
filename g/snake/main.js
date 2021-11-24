/*


*/
/*

*/
const __main = () => {
    // const initHtml = () => {
    //     let musics = {
    //         'bgm': '../audio/bg.mp3',
    //         'up': '../audio/up.mp3',
    //         'down': '../audio/down.mp3',
    //         'left': '../audio/left.mp3',
    //         'right': '../audio/right.mp3',
    //         'gameover': '../audio/dead.mp3',
    //         'eat': '../audio/eat.mp3',
    //     }
    //     let t = ''
    //     for (let k in musics) {
    //         let v = musics[k]
    //         t += `<audio class="gua-${k}" src="${v}"></audio>`
    //     }
    //     appendHtml(e('body'), t)
    // }
    // initHtml()
    let game = Game.instance(10, (g) => {
        let s = SceneStart.new(g)
        g.runWithScene(s)
    })
}

__main()