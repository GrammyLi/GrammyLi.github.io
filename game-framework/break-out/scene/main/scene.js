var SceneMain = (game) => {
    let s = {
        game,
    }
    // init
    let paddle = Paddle(game)

    let ball = Ball(game)

    window.blocks = loadLevel(1, game)
    let score = 0

    window.pased = false
    game.registerAction('a', () => {
        paddle.moveLeft()
    })
    game.registerAction('d', () => {
        paddle.moveRight()
    })
    game.registerAction('f', () => {
        ball.fire()
    })

    //mouse  event
    let enableDrag = false
    let cvs = game.canvas
    cvs.addEventListener('mousedown', event => {
        let x = event.offsetX
        let y = event.offsetY
        // 检查　是否点中
        if (ball.hasPoint(x, y)) {
            // 设置　拖拽状态
            enableDrag = true
        }
    })
    cvs.addEventListener('mousemove', event => {
        let x = event.offsetX
        let y = event.offsetY
        //   log('move')
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }
    })
    cvs.addEventListener('mouseup', event => {
        let x = event.offsetX
        let y = event.offsetY
        //   log('up')
        enableDrag = false
    })
    s.draw = () => {
        //  draw  bg
        game.context.fillStyle = '#333'
        game.context.fillRect(0, 0, 560, 560)

        game.drawImage(paddle)
        game.drawImage(ball)
        // draw blocks 
        for (let v of blocks) {
            let block = v
            if (block.alive) {
                game.drawImage(block)
            }
        }
        //draw labels
       
        game.context.fillStyle = 'white'
        game.context.font= "14px 微软雅黑"
        game.context.fillText('分 数 ：' + score, 10, 390)
        // game.context.fillText('按 f  开 始  p 暂 停', 380, 390)
    }
    s.update = () => {
        if (window.paused) {
            return
        }
        ball.move()
        // judgement game over
        if (ball.y > paddle.y) {
            // switch scene
            gameOverMusic()
            let end = SceneEnd.new(game)
            game.replaceScene(end)
        }
        // paddle and ball collide
        if (paddle.collide(ball)) {
            paddleMusic()
            ball.bounce(paddle)
        }
        // ball and block collide
        for (let v of blocks) {
            let block = v
            if (block.collide(ball)) {
                blockMusic()
                block.kill()
                //反弹
                ball.bounce(block)
                // score
                score += 100
            }
        }
    }
    return s
}