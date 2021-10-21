const Block = (object, game) => {
    // position {x: xx, y: xx, health: xx,}
    let o = object
    let obj = game.imageByName('block')
    obj.x = o.x
    obj.y = o.y
    obj.alive = true
    // health point
    obj.lifes = o.health || 1
    obj.kill = () => {
        obj.lifes -= 1
        if (obj.lifes < 1) {
            obj.alive = false
        }
    }
    obj.collide = (b) => {
        return obj.alive && (rectIntersects(obj, b) || rectIntersects(b, obj))
    }
    return obj
}
