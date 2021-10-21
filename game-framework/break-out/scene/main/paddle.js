const Paddle = (game) => {
    let obj = game.imageByName('paddle')
    obj.x = 200
    obj.y = 360
    obj.speed = 5
    obj.move = (x) => {
        if (x < 0) {
            x = 0
        }
        if (x > 560 - obj.w) {
            x = 560 - obj.w
        }
        obj.x = x 
    }
    obj.moveLeft = () => {
        obj.move(obj.x - obj.speed)
    }
    obj.moveRight = () => {
        obj.move(obj.x + obj.speed)
    }
    
    obj.collide = (ball) => {
        let a = obj
        let b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if　(aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    return obj
}