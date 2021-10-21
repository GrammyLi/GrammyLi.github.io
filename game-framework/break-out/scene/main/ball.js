const Ball = (game) => {
    let obj = game.imageByName('ball')
    obj.x = 100
    obj.y = 100
    obj.speedX = 5
    obj.speedY = 5
    obj.fired = false
    obj.fire = () => {
        obj.fired = true
    }
    obj.move = () => {
        if (obj.fired) {
            // log('move')
            if (obj.x < 0 || obj.x > 560) {
                wallMusic()
                obj.speedX *= -1
            }
            if (obj.y < 0 || obj.y > 460) {
                wallMusic()
                obj.speedY *= -1
            }
            obj.x += obj.speedX
            obj.y += obj.speedY
        }
    }

    obj.bounce = (ele) => {
        obj.speedX *= edgeBounce(obj, ele)
        obj.speedY *= -1
    }
    obj.hasPoint = (x, y) => {
        let xIn = ((x >= obj.x) && (x <= obj.x + obj.w))
        let yIn = ((y >= obj.y) && (y <= obj.y + obj.h))
        return yIn && xIn
    }
    return obj
}
 