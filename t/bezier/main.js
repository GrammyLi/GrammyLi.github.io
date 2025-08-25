/**
 * 全局状态管理类
 * 用于存储和管理整个贝塞尔曲线绘制系统的全局状态
 */
const Global = class {
    /** 帧计数器，用于计算FPS */
    static count = 0
    /** 目标帧率 */
    static fps = 60
    /** 动画运行状态标志 */
    static run = true
    /** 初始贝塞尔曲线的控制点数据 */
    static bezierListInput = [
        [[200, 120], [170, 50], [80, 80], [40, 140], [90, 200], [200, 280]],
        [[200, 280], [310, 200], [360, 140], [320, 80], [230, 50], [200, 120]]
    ]
    /** 控制点和运动小球的半径 */
    static radiusCircle = 5
    /** 当前运动小球在曲线点集中的索引 */
    static indexBezierListCircleMove = 0
    /** 所有贝塞尔曲线点的集合，用于小球运动 */
    static pBezierListCircleMove = []
    /** 所有曲线的总长度 */
    static lenBezierListCircleMoveAll = []
    /** 当前曲线上运动点的索引 */
    static indexPCircleMove = 0
    /** 上一次的事件类型 */
    static preEvent = null
    /** 事件类型枚举 */
    static preEventType = {
        addPosition: 0,        // 添加控制点
        movePosition: 1,       // 移动控制点
        deletePosition: 2,     // 删除控制点
        captureOldPosition: 3  // 捕获已存在的控制点
    }
    /** 当前鼠标指针位置 */
    static pPointer = [-100, 0]
    /** 当前选中的贝塞尔曲线索引 */
    static indexCurBezier = null
    /** 所有贝塞尔曲线对象的数组 */
    static bezierList = []
    /** 当前正在编辑的贝塞尔曲线对象 */
    static curBezier = null
    /** 上一次小球运动的位置 */
    static pPreCircleMove = [0, 0]
    /** 上一秒的移动距离，用于计算速度 */
    static lenMovePre1sec = 0
    /** 当前的移动距离 */
    static lenMove = 0
    /** 当前运动速度 */
    static speedMove = 0
    /** 预设的基准速度（像素/秒） */
    static speedMovePreSet = 100
    /** 当前设定的运动速度 */
    static speedMoveSet = 0
    /** 被鼠标按下的控制点列表 */
    static pListMouseDown = []
}

/**
 * 贝塞尔曲线类
 * 表示单条贝塞尔曲线，包含控制点和曲线点数据
 */
const Bezier = class {
    /**
     * @param {Array<Array<number>>} pList - 控制点数组，每个点是[x,y]格式
     */
    constructor(pList = []) {
        /** 控制点数组 */
        this.pList = pList
        /** 曲线上的采样点数组 */
        this.pListCurve = []
        /** 当前曲线上运动点的索引 */
        this.indexPCircleMove = 0
        /** 被鼠标按下的控制点索引 */
        this.indexPMousedown = null
    }
}

/**
 * 计算两点之间的插值点
 * @param {number} p1 - 起始点的坐标值
 * @param {number} p2 - 结束点的坐标值
 * @param {number} t - 插值比例，范围[0,1]
 * @returns {number} 返回插值点的坐标值
 * 实现原理：线性插值公式 P = (1-t)P1 + tP2
 */
const calcInterpolation = function (p1, p2, t) {
    return (1 - t) * p1 + t * p2
}

/**
 * 递归计算贝塞尔曲线上的点
 * @param {Array<number>} l - 控制点数组
 * @param {number} t - 插值比例，范围[0,1]
 * @returns {number} 返回贝塞尔曲线上的点的坐标值
 * 实现思路：
 * 1. 如果只有一个点，直接返回该点
 * 2. 否则对相邻的点进行插值，得到新的点集
 * 3. 递归处理新的点集，直到只剩一个点
 */
const calcPCurve = function (l, t) {
    if (l.length === 1) {
        return l[0]
    }
    let i = 0
    const l2 = []
    while (1) {
        const p1 = l[i]
        const p2 = l[i + 1]
        l2.push(calcInterpolation(p1, p2, t))
        if (i === l.length - 2) {
            break
        } else {
            i++
        }
    }
    return calcPCurve(l2, t)
}

/**
 * 计算曲线的弧长
 * @param {Array<Array<number>>} l - 曲线上的点的数组，每个点是[x,y]格式
 * @returns {number} 返回曲线的总弧长
 * 实现思路：
 * 1. 遍历所有相邻的点
 * 2. 计算每对相邻点之间的欧几里得距离
 * 3. 累加所有距离得到总弧长
 */
const calcArcLen = function (l) {
    let len = 0
    for (let i = 0; i < l.length; i++) {
        const cur = l[i]
        const next = l[i + 1]
        if (next === undefined) {
            break
        } else {

        }
        const [x1, y1] = cur
        const [x2, y2] = next
        len += Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
    }
    return len
}

/**
 * 计算两点之间的欧几里得距离
 * @param {number} x1 - 第一个点的x坐标
 * @param {number} y1 - 第一个点的y坐标
 * @param {number} x2 - 第二个点的x坐标
 * @param {number} y2 - 第二个点的y坐标
 * @returns {number} 返回两点之间的距离
 */
const calcDistanceTwoPoint = function (x1, y1, x2, y2) {
    let dep = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
    return dep
}

// x1, y1 是否在圆心为x2, y2，半径为r的圆圈里面
const isInCircle = function (x1, y1, x2, y2, r) {
    if (x1 > (x2 - r) && x1 < (x2 + r)) {
        if (y1 > (y2 - r) && y1 < (y2 + r)) {
            return true
        }
    }
    return false
}


/**
 * 计算匀速运动时的位置
 * @param {number} len - 当前运动的累计长度
 * @returns {Array<number>} 返回当前位置的[x,y]坐标
 * 实现思路：
 * 1. 遍历曲线上的点
 * 2. 累加相邻点之间的距离
 * 3. 当累计距离达到或超过目标长度时
 * 4. 如果刚好相等，返回下一个点
 * 5. 如果超过，计算插值点的位置
 */
const pUniformSpeed = function (len) {
    let lenCount = 0
    let i = 0
    while (1) {
        let cur = Global.pBezierListCircleMove[i]
        let next = Global.pBezierListCircleMove[i + 1]
        if (next) {
            const [xCur, yCur] = cur
            const [xNext, yNext] = next

            const distance = calcDistanceTwoPoint(xCur, yCur, xNext, yNext)

            lenCount += distance

            // 刚好长度等于下个点的长度
            if (lenCount === len) {
                return next
            }

            // 超过，取插值
            if (lenCount > len) {
                const lenDiff = len - (lenCount - distance)
                // 比例
                const t = lenDiff / distance
                const x = calcInterpolation(xCur, xNext, t)
                const y = calcInterpolation(yCur, yNext, t)
                return [x, y]
            }
            i++
        } else {
            i = 0
        }
    }
}

/**
 * 绑定鼠标按下事件
 * @param {HTMLCanvasElement} e - Canvas元素
 * 功能：
 * 1. 创建新的贝塞尔曲线
 * 2. 检测是否点击了控制点
 * 3. 添加新的控制点
 * 实现思路：
 * 1. 获取鼠标点击位置
 * 2. 如果当前没有活动的曲线，创建新曲线
 * 3. 检查是否点击了已有的控制点
 * 4. 如果没有点击控制点，则添加新的控制点
 */
const bindEventMouseDown = function (e) {
    e.addEventListener('mousedown', (event) => {
        const xEvent = event.offsetX
        const yEvent = event.offsetY
        let moveDownPOld = false

        if (Global.curBezier === null) {
            Global.curBezier = new Bezier()
            Global.bezierList.push(Global.curBezier)
            Global.indexCurBezier = Global.bezierList.length - 1
        }

        if (Global.pListMouseDown === null) {
            const l = []
            for (const bezier of Global.bezierList) {
                for (let i = 0; i < bezier.pList.length; i++) {
                    const p = bezier.pList[i]
                    const [x, y] = p
                    if (isInCircle(xEvent, yEvent, x, y, Global.radiusCircle)) {
                        const o = {
                            bezier: bezier,
                            indexPList: i,
                        }
                        l.push(o)
                        Global.preEvent = Global.preEventType.captureOldPosition
                    }
                }
            }

            if (l.length > 0) {
                Global.pListMouseDown = l
            }
        }
        // 增加控制点
        if (Global.pListMouseDown === null) {
            const pNew = [xEvent, yEvent]
            if (Global.curBezier.pList.length > 1) {
                const last = Global.curBezier.pList.pop()
                Global.curBezier.pList.push(pNew)
                Global.curBezier.pList.push(last)
            } else {
                Global.curBezier.pList.push(pNew)
            }
            Global.preEvent = Global.preEventType.addPosition
        }
    })
}

/**
 * 绑定鼠标离开事件
 * @param {HTMLCanvasElement} e - Canvas元素
 * 功能：当鼠标离开画布时，重置指针位置
 */
const bindEventMouseLeave = function (e) {
    e.addEventListener('mouseleave', () => {
        Global.pPointer = [-100, 0]
    })
}

/**
 * 绑定鼠标松开事件
 * @param {HTMLCanvasElement} e - Canvas元素
 * 功能：
 * 1. 处理控制点的删除
 * 2. 重置鼠标按下状态
 * 实现思路：
 * 1. 检查是否处于控制点捕获状态
 * 2. 如果是，删除被选中的控制点
 * 3. 重置鼠标按下状态
 */
const bindEventMouseUp = function (e) {
    e.addEventListener('mouseup', () => {
        if (Global.preEvent === Global.preEventType.captureOldPosition) {
            for (const o of Global.pListMouseDown) {
                o.bezier.pList.splice(o.indexPList, 1)
            }
            Global.preEvent = Global.preEventType.deletePosition
        }

        Global.pListMouseDown = null
    })
}

/**
 * 绑定鼠标移动事件
 * @param {HTMLCanvasElement} e - Canvas元素
 * 功能：
 * 1. 更新鼠标指针位置
 * 2. 处理控制点的拖拽
 * 3. 实现控制点的自动吸附
 * 实现思路：
 * 1. 获取鼠标当前位置
 * 2. 更新被拖拽的控制点位置
 * 3. 检查是否接近其他控制点，实现吸附效果
 */
const bindEventMouseMove = function (e) {
    e.addEventListener('mousemove', (event) => {
        const xEvent = event.offsetX
        const yEvent = event.offsetY
        Global.pPointer = [xEvent, yEvent]
        if (Global.curBezier === null) {
            return
        }
        if (Global.pListMouseDown !== null) {
            for (const o of Global.pListMouseDown) {
                o.bezier.pList[o.indexPList] = [xEvent, yEvent]
                const [xNow, yNow] = o.bezier.pList[o.indexPList]
                // 拼接
                for (const bezier of Global.bezierList) {
                    for (const p of bezier.pList) {
                        const [xOther, yOther] = p
                        if (isInCircle(xNow, yNow, xOther, yOther, Global.radiusCircle)) {
                            o.bezier.pList[o.indexPList] = [xOther, yOther]
                        }
                    }
                }
            }
            Global.preEvent = Global.preEventType.movePosition
        }
    })
}

/**
 * 绑定按钮事件
 * 功能：
 * 1. 导出当前曲线的点集数据
 * 2. 导入曲线数据并重建曲线
 * 实现思路：
 * 1. 导出：将当前曲线点集转换为JSON格式
 * 2. 导入：解析JSON数据并重建贝塞尔曲线对象
 */
const bindEventButton = function () {
    const button = e("#id-button")
    button.addEventListener('click', () => {
        const t = e('#id-text-input')
        let s = ''
        s = '[\r'
        for (const p of Global.pBezierListCircleMove) {
            const objP = {
                x: p[0],
                y: p[1]
            }
            s += `  ${JSON.stringify(objP)}`
            s += ',\r'
        }
        s += ']'
        t.value = s
    })
    const buttonInput = e('#id-button-input')
    buttonInput.addEventListener('click', () => {
        const t = e('#id-text-input')
        const l = eval(t.value)
        Global.bezierList = []
        for (const lElement of l) {
            Global.bezierList.push(new Bezier(lElement))
            Global.indexCurBezier = Global.bezierList.length - 1
            Global.curBezier = Global.bezierList[Global.indexCurBezier]
        }
    })
}

/**
 * 绑定键盘按下事件
 * 功能：
 * 1. P键：暂停/继续动画
 * 2. N键：新建曲线
 * 3. Q键：切换当前编辑的曲线
 * 4. Cmd+Z：撤销上一步操作
 * 实现思路：
 * 根据不同的按键执行相应的操作，实现快捷键控制
 */
const bindEventKeyDown = function () {
    window.addEventListener('keydown', (event) => {
        if (event.key === 'P') {
            Global.run = !Global.run
        } else if (event.key === 'N' || event.key === 'n') {
            // 新建曲线
            Global.curBezier = null
        } else if (event.key === 'Q' || event.key === 'q') {
            if (Global.indexCurBezier !== null) {
                if (Global.bezierList[Global.indexCurBezier - 1]) {
                    Global.indexCurBezier--
                } else {
                    Global.indexCurBezier = Global.bezierList.length - 1
                }
            }
            Global.curBezier = Global.bezierList[Global.indexCurBezier]
        } else if ((event.key === 'Z' || event.key === 'z') && event.metaKey) {
            if (Global.curBezier) {
                if (Global.curBezier.pList.length >= 3) {
                    Global.curBezier.pList.splice(-2, 1)
                } else {
                    Global.curBezier.pList.pop()
                }
            }
        }
    })
}

/**
 * 绑定范围滑块事件
 * @description 控制运动小球的速度
 * 实现思路：根据滑块值计算速度比例
 */
const bindEventRange = function () {
    const range = e("#id-range")
    range.addEventListener('input', () => {
        Global.speedMoveSet = Global.speedMovePreSet / 50 * Number(range.value)
    })
}

/**
 * 统一绑定所有事件处理函数
 * @param {HTMLCanvasElement} e - Canvas元素
 * 功能：初始化所有交互事件
 */
const bindEvent = function (e) {
    bindEventButton()
    bindEventMouseDown(e)
    bindEventMouseUp(e)
    bindEventMouseMove(e)
    bindEventMouseLeave(e)
    bindEventKeyDown()
    bindEventRange()
}

/**
 * 清除画布内容
 * @param {HTMLCanvasElement} canvas - Canvas元素
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D上下文
 */
const clear = function (canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

/**
 * 绘制曲线
 * @param {Array<Array<number>>} l - 曲线上的点的数组
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D上下文
 * @param {string} color - 曲线颜色，默认为黑色
 * 实现思路：
 * 1. 从第一个点开始绘制
 * 2. 连续绘制到后续的点
 */
const drawCure = function (l, ctx, color = 'black') {
    ctx.beginPath()
    for (let i = 0; i < l.length; i++) {
        const p = l[i]
        const [x, y] = p
        ctx.strokeStyle = color
        if (i === 0) {
            ctx.moveTo(x, y)
        } else {
            ctx.lineTo(x, y)
            ctx.moveTo(x, y)
        }
    }
    ctx.stroke()
}

/**
 * 绘制贝塞尔曲线
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D上下文
 * 功能：
 * 1. 计算并绘制所有贝塞尔曲线
 * 2. 更新曲线点集合
 * 3. 计算总路径长度
 * 实现思路：
 * 1. 遍历所有贝塞尔曲线对象
 * 2. 对每条曲线，计算t从0到1的所有点
 * 3. 绘制曲线并更新全局点集合
 * 4. 计算整体路径长度用于动画
 */
const drawBezier = function (ctx) {
    // TODO: 这里以后要抽离出来，draw方法不能有副作用
    for (const bezier of Global.bezierList) {
        bezier.pListCurve = []
        if (bezier.pList.length > 1) {
            let t = 0
            const lx = bezier.pList.map(p => p[0])
            const ly = bezier.pList.map(p => p[1])
            while (t <= 1) {
                const x = calcPCurve(lx, t)
                const y = calcPCurve(ly, t)
                bezier.pListCurve.push([x, y])
                t += 0.01
            }
            let color
            if (bezier === Global.curBezier) {
                color = 'blue'
            } else {
                color = 'black'
            }
            drawCure(bezier.pListCurve, ctx, color)
        }
    }
    // TODO: 这里以后要抽离出来，draw方法不能有副作用
    Global.pBezierListCircleMove = []
    for (const bezier of Global.bezierList) {
        Global.pBezierListCircleMove = Global.pBezierListCircleMove.concat(bezier.pListCurve)
    }
    Global.lenBezierListCircleMoveAll = 0
    for (let i = 0; i < Global.pBezierListCircleMove; i++) {
        const cur = Global.pBezierListCircleMove[i]
        const next = Global.pBezierListCircleMove[i + 1]
        if (next) {
            const [x1, y1] = cur
            const [x2, y2] = next
            Global.lenBezierListCircleMoveAll += calcDistanceTwoPoint(x1, y1, x2, y2)
        }
    }
}

/**
 * 绘制控制点
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D上下文
 * 功能：
 * 1. 绘制所有贝塞尔曲线的控制点
 * 2. 起点和终点使用红色，中间点使用蓝色
 */
const drawPList = function (ctx) {
    for (const bezier of Global.bezierList) {
        for (let i = 0; i < bezier.pList.length; i++) {
            const e = bezier.pList[i]
            const [x, y] = e
            ctx.beginPath()
            ctx.arc(x, y, Global.radiusCircle, 0, 2 * Math.PI)
            if (i === 0 || i === bezier.pList.length - 1) {
                ctx.fillStyle = "red"
            } else {
                ctx.fillStyle = "blue"
            }
            ctx.fill()
            ctx.stroke()
        }
    }

}

/**
 * 绘制控制点之间的连线
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D上下文
 * 功能：用粉色线段连接相邻的控制点
 */
const drawPListLine = function (ctx) {
    for (const bezier of Global.bezierList) {
        if (bezier.pList.length > 2) {
            let i = 0
            while (1) {
                if (i === bezier.pList.length - 1) {
                    break
                }
                const start = bezier.pList[i]
                const [xStart, yStart] = start
                const end = bezier.pList[i + 1]
                const [xEnd, yEnd] = end
                ctx.beginPath()
                ctx.strokeStyle = "pink"
                ctx.moveTo(xStart, yStart)
                ctx.lineTo(xEnd, yEnd)
                ctx.stroke()
                i++
            }
        }
    }
}

/**
 * 绘制曲线长度信息
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D上下文
 * 功能：显示当前选中曲线的弧长
 */
const drawArcLen = function (ctx) {
    if (Global.curBezier === null) {
        return
    }
    const len = calcArcLen(Global.curBezier.pListCurve)
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.font = "20px serif"
    ctx.fillText(`弧长：${len}px`, 160, 480)
}

/**
 * 绘制运动速度信息
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D上下文
 * 功能：显示小球的当前运动速度
 */
const drawSpeedMove = function (ctx) {
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.font = "20px serif"
    ctx.fillText(`速度：${Global.speedMove.toFixed(2)}px/s`, 10, 480)
}

/**
 * 绘制运动的小球
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D上下文
 * 功能：
 * 1. 计算小球在曲线上的位置
 * 2. 绘制小球
 * 实现思路：
 * 1. 根据速度计算移动距离
 * 2. 处理循环运动
 * 3. 计算实际位置并绘制
 */
const drawCircleMove = function (ctx) {
    if (Global.pBezierListCircleMove.length > 0) {
        Global.lenMove += Global.speedMoveSet / Global.fps
        if (Global.lenMove > Global.lenBezierListCircleMoveAll) {
            Global.lenMove = Global.lenMove - Global.lenBezierListCircleMoveAll
        }
        const [x, y] = pUniformSpeed(Global.lenMove)
        ctx.strokeStyle = "red"
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.arc(x, y, Global.radiusCircle, 0, 2 * Math.PI)
        ctx.fill()
    }
}

/**
 * 主绘制函数
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D上下文
 * 功能：
 * 1. 绘制贝塞尔曲线
 * 2. 绘制控制点
 * 3. 绘制控制点连线
 * 4. 显示曲线长度
 * 5. 绘制运动小球
 * 6. 显示运动速度
 * 实现思路：
 * 按照图层顺序依次绘制各个元素，确保视觉效果的正确性
 */
const draw = function (ctx) {
    drawBezier(ctx)
    drawPList(ctx)
    drawPListLine(ctx)
    drawArcLen(ctx)
    drawCircleMove(ctx)
    drawSpeedMove(ctx)
}

/**
 * 从初始输入数据初始化贝塞尔曲线
 * 功能：
 * 1. 创建初始的贝塞尔曲线对象
 * 2. 设置当前活动的曲线
 */
const initFromInput = function () {
    for (const e of Global.bezierListInput) {
        const b = new Bezier(e)
        Global.bezierList.push(b)
    }

    if (Global.bezierList.length > 0) {
        Global.curBezier = Global.bezierList[Global.bezierList.length - 1]
    }
}


/**
 * 主函数
 * 功能：
 * 1. 初始化贝塞尔曲线系统
 * 2. 设置初始速度
 * 3. 创建Canvas上下文
 * 4. 绑定事件处理
 * 5. 启动动画循环
 * 实现思路：
 * 1. 系统初始化
 * 2. 事件绑定
 * 3. 使用setTimeout实现动画循环
 * 4. 在循环中更新速度和位置信息
 */
const __main = function () {
    initFromInput()

    Global.speedMoveSet = Global.speedMovePreSet

    //当图片准备以后再绘制
    const canvas = e("#id-canvas")
    const ctx = canvas.getContext("2d")
    bindEvent(canvas)
    const loop = function () {
        if (Global.run) {
            clear(canvas, ctx)
            draw(ctx)
        }
        Global.count++
        if (Global.count === Global.fps) {
            Global.count = 0
            Global.speedMove = Global.lenMove - Global.lenMovePre1sec
            Global.lenMovePre1sec = Global.lenMove
        }
        setTimeout(loop, 1000 / Global.fps)
    }
    loop()
}

__main()