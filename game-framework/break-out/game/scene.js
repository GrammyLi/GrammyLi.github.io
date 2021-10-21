class Scene {
    constructor(game) {
        this.game = game
    }
    static new(game) {
        let i = new this(game)
        return i
    }
    draw() {
        alert('must extends this function')
    }
    update() {

    }
}
