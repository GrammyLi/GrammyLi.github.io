/*
 * @Author: your name
 * @Date: 2020-02-17 18:43:52
 * @LastEditTime: 2021-10-23 13:13:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/sky_plane/scene/main/cloud.js
 */
class Cloud extends BaseImage {
    constructor(game) {
        let type = randomBetween(0, 1)
        let name = 'cloud' + String(type)
        super(game, name)
        this.setup()
    }
    setup() {
        this.type = 'cloud'
        this.speed = 1
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.speed = config.cloud_speed.value
        this.y += this.speed
        this.borderLimited()
    }
    borderLimited() { //边界检测
        let h = 768
        if(this.y > h){
            this.setup()
        }
    }
}
