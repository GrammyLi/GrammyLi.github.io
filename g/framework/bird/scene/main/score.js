/*
 * @Author: your name
 * @Date: 2020-04-01 22:10:42
 * @LastEditTime: 2021-10-23 13:31:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/bird/scene/main/score.js
 */
class Score {
    constructor(game) {
        this.setup(game)
    }
    static new(...args) {
        this.i = new this(...args)
        return this.i
    }
    setup(game) {
        this.game = game
        this.scores = 0
        // 404
        /*
        {
            '404': function() {}
        }
        */
        this.scoresImge = {
            '0': BaseImage.new(game, '0'),
            '1': BaseImage.new(game, '1'),
            '2': BaseImage.new(game, '2'),
            '3': BaseImage.new(game, '3'),
            '4': BaseImage.new(game, '4'),
            '5': BaseImage.new(game, '5'),
            '6': BaseImage.new(game, '6'),
            '7': BaseImage.new(game, '7'),
            '8': BaseImage.new(game, '8'),
            '9': BaseImage.new(game, '9'),
        }

        let s = this.scores.toString()
        this.images = []
        this.x = 50
        this.y = 80
    }

    getScoreImge(s) {
        return this.scoresImge[s]
    }

    update() {
        this.images = []
        let s = this.scores.toString()
        for (let i = 0; i < s.length; i++) {
            let num = s[i]
            let img = this.getScoreImge(num)
            this.images.push(img)
        }
    }

    draw() {
        let context = this.game.context
        let arr = this.images
        for (var i = 0; i < arr.length; i++) {
            let image = arr[i]
            let x = 200 - image.w / 2 + 24 * i
            let y = 488
            context.drawImage(image.texture, x, y)
        }
    }
}