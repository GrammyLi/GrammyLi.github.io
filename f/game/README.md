# 游戏引擎

## 案例

### 目录结构

```
├── GameFrameWork  游戏引擎
├── img                     # 图片资源
    ├── demo.jpg
    └── ...
├── scene                   # 场景
    ├── main                # 自己定义场景，例如，开始场景，主场景，结束场景
        ├── element         # 游戏中的元素
            ├── Player.js
            ├── Enemy.js
            └── ...
        └── MainScene.js    # 场景
    └── ...
├── config.js               # 资源配置
├── index.html
├── main.js                 # 入口
```

gameFrameWork

## 关系

```
                   Game
             (循环 60FPS)
           /         |         \
    update()       clear()      draw()
       |                          |
 scene.update()               scene.draw()
       |                          |
for e of elements          for e of elements
   e.update()                  e.draw()
```

# 游戏相关类 API 文档

## 类： `Game`

管理游戏初始化、循环、场景切换和按键动作。

### 构造函数

#### `constructor(images, callback)`

初始化游戏实例。

- **参数**
  - `images`：包含图像名称和路径的对象，类型为 `Object`。
    ```javascript
    {
      "player": "images/player.png",
      "background": "images/background.png",
      // 其他图像...
    }
    ```
  - `callback`：所有图像加载完毕后要调用的回调函数，类型为 `Function`。

### 属性

- `images`：包含图像名称和路径的对象。
- `callback`：图像加载完毕后的回调函数。
- `canvas`：游戏画布元素。
- `context`：画布的 2D 绘图上下文。
- `width`：画布的宽度。
- `height`：画布的高度。
- `scene`：当前场景。
- `actions`：按键动作映射表。
- `keydowns`：按键状态映射表。

### 方法

#### `init()`

初始化游戏，加载所有图像。

#### `update()`

更新当前场景。

#### `clear()`

清除画布。

#### `draw()`

绘制当前场景。

#### `runloop()`

运行主循环。

#### `imageByName(name)`

根据名称获取图像。

- **参数**
  - `name`：图像名称，类型为 `string`。
- **返回**
  - `Image` 对象。

#### `runWithScene(scene)`

运行指定场景。

- **参数**
  - `scene`：要运行的场景对象，类型为 `Object`。

#### `replaceScene(scene)`

替换当前场景。

- **参数**
  - `scene`：新的场景对象，类型为 `Object`。

#### `registerAction(key, callback)`

注册按键动作。

- **参数**

  - `key`：按键名称，类型为 `string`。
  - `callback`：按键按下时要调用的回调函数，类型为 `Function`。

- 示例

```javascript
// 创建游戏实例
const images = {
  player: "images/player.png",
  background: "images/background.png",
  // 其他图像...
};

const game = new Game(images, () => {
  console.log("所有图像已加载完毕");
});

// 运行指定场景
game.runWithScene(scene);

// 注册按键动作
game.registerAction("a", () => {
  console.log("按键 'a' 被按下");
});
```

---

## 类： `GameImage`

处理图像的绘制和变换。

### 构造函数

#### `constructor(name)`

根据图像名称初始化图像。

- **参数**
  - `name`：图像的名称，类型为 `string`。

### 属性

- `image`：图像对象。
- `x`：图像的 x 坐标。
- `y`：图像的 y 坐标。
- `w`：图像的宽度。
- `h`：图像的高度。
- `flipX`：是否水平翻转，默认为 `false`。
- `flipY`：是否垂直翻转，默认为 `false`。
- `rotation`：图像的旋转角度，默认为 `0`。

### 方法

#### `draw()`

绘制图像，应用翻转和旋转变换。

#### `update()`

更新图像状态。

#### `replace(name)`

替换当前图像。

- **参数**
  - `name`：新图像的名称，类型为 `string`。

---

## 类： `GameLabel`

用于在游戏中绘制文本标签。

### 构造函数

#### `constructor(text, x, y, font, color='#000000')`

根据文本、坐标、字体和颜色初始化标签。

- **参数**
  - `text`：要显示的文本，类型为 `string`。
  - `x`：文本的 x 坐标，类型为 `number`。
  - `y`：文本的 y 坐标，类型为 `number`。
  - `font`：文本的字体和大小，类型为 `string`。
  - `color`：文本的颜色，类型为 `string`，默认值为黑色。

### 属性

- `text`：标签文本。
- `x`：文本的 x 坐标。
- `y`：文本的 y 坐标。
- `font`：字体和大小。
- `color`：文本的颜色。

### 方法

#### `draw()`

绘制文本标签。

#### `replace(text)`

替换标签的文本。

- **参数**
  - `text`：新的文本内容，类型为 `string`。

```javascript
// 创建文本标签实例
const label = new GameLabel("Hello, World!", 100, 50, "20px Arial", "#ff0000");

// 绘制文本标签
label.draw();

// 替换文本内容
label.replace("New Text");
```

---

## 类： `Particle`

继承自 `GameImage`，表示单个粒子。

### 构造函数

#### `constructor(imageName, x, y, vx, vy, life)`

根据图像名称、初始坐标、速度和生命值初始化粒子。

- **参数**
  - `imageName`：粒子的图像名称，类型为 `string`。
  - `x`：粒子的初始 x 坐标，类型为 `number`。
  - `y`：粒子的初始 y 坐标，类型为 `number`。
  - `vx`：粒子的 x 方向速度，类型为 `number`。
  - `vy`：粒子的 y 方向速度，类型为 `number`。
  - `life`：粒子的生命值，类型为 `number`。

### 属性

- `x`：粒子的 x 坐标。
- `y`：粒子的 y 坐标。
- `vx`：粒子的 x 方向速度。
- `vy`：粒子的 y 方向速度。
- `life`：粒子的生命值。

### 方法

#### `update()`

更新粒子的状态，减少生命值，并根据速度更新位置。

```javascript
// 创建图像实例
const image = new GameImage("player");

// 设置图像属性
image.x = 100;
image.y = 150;
image.flipX = true;

// 绘制图像
image.draw();

// 替换图像
image.replace("enemy");
```

---

## 类： `ParticleSystem`

用于生成和管理粒子效果。

### 构造函数

#### `constructor(imageName, x, y, speed=5, life=7, number=100, duration=30)`

根据图像名称、初始坐标、速度、生命值、粒子数量和持续时间初始化粒子系统。

- **参数**
  - `imageName`：粒子的图像名称，类型为 `string`。
  - `x`：粒子系统的初始 x 坐标，类型为 `number`。
  - `y`：粒子系统的初始 y 坐标，类型为 `number`。
  - `speed`：每个粒子的最大速度，类型为 `number`，默认值为 `5`。
  - `life`：每个粒子的生命值，类型为 `number`，默认值为 `7`。
  - `number`：粒子的数量，类型为 `number`，默认值为 `100`。
  - `duration`：粒子系统的持续时间（帧数），类型为 `number`，默认值为 `30`。

### 属性

- `imageName`：粒子的图像名称。
- `x`：初始 x 坐标。
- `y`：初始 y 坐标。
- `speed`：每个粒子的最大速度。
- `life`：每个粒子的生命值。
- `number`：粒子的数量。
- `duration`：粒子系统的持续时间（帧数）。
- `particles`：粒子数组。

### 方法

#### `update()`

更新粒子系统的状态，生成新的粒子，更新所有粒子，并移除死亡的粒子。

#### `draw()`

绘制所有粒子。

```javascript
// 创建粒子系统实例
const particleSystem = new ParticleSystem("spark", 100, 100);

// 更新粒子系统
particleSystem.update();

// 绘制粒子系统
particleSystem.draw();
```

---

## 类： `Scene`

管理游戏中的元素和背景。

### 构造函数

#### `constructor()`

初始化场景对象。

### 属性

- `elements`：场景中的元素数组，类型为 `Array`。
- `background`：场景的背景颜色，类型为 `string`，默认为 `white`。

### 方法

#### `setBackground(color)`

设置背景颜色。

- **参数**
  - `color`：背景颜色，类型为 `string`。

#### `addElement(element)`

添加元素到场景中。

- **参数**
  - `element`：要添加的元素，类型为 `Object`。

#### `removeElement(element)`

从场景中移除元素。

- **参数**
  - `element`：要移除的元素，类型为 `Object`。

#### `replaceElement(oldElement, newElement)`

替换场景中的一个元素。

- **参数**
  - `oldElement`：要替换的旧元素，类型为 `Object`。
  - `newElement`：替换后的新元素，类型为 `Object`。

#### `update()`

更新场景中的所有元素。在调试模式下，如果存在 `debug` 方法，则调用。

#### `draw()`

绘制场景中的所有元素。

---

## 示例

```javascript
// 创建场景实例
const scene = new Scene();

// 设置背景颜色
scene.setBackground("blue");

// 添加元素到场景中
scene.addElement(someElement);

// 移除元素
scene.removeElement(someElement);

// 替换元素
scene.replaceElement(oldElement, newElement);

// 更新场景
scene.update();

// 绘制场景
scene.draw();
```
