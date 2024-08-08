/*
私有方法
    init() 初始化
    update() 更新
    clear() 清除
    draw() 绘制
    runloop() 运行循环

仅用于内部使用
    context 画布上下文
    imageByName(name) 根据名称获取图像

公共方法
    game 游戏实例
    width, height 画布宽度和高度
    new Game(images, callback) 创建新的游戏实例
    runWithScene(scene) 运行场景
    replaceScene(scene) 替换场景
    registerAction(key, callback) 注册按键动作
*/

class Game {
  /**
   * 构造函数，初始化游戏实例。
   * @param {Object} images - 包含图像名称和路径的对象。
   * @param {Function} callback - 所有图像加载完毕后要调用的回调函数。
   */
  constructor(images, callback) {
    this.images = images;
    this.callback = callback;

    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.scene = null;
    this.actions = {};
    this.keydowns = {};

    // 监听键盘按下事件
    window.addEventListener("keydown", (event) => {
      this.keydowns[event.key] = true;
    });

    // 监听键盘松开事件
    window.addEventListener("keyup", (event) => {
      this.keydowns[event.key] = false;
    });

    this.init();
    window.game = this;
  }

  /**
   * 初始化游戏，加载所有图像。
   */
  init() {
    let length = Object.keys(this.images).length;
    let loaded = [];
    for (let [name, path] of Object.entries(this.images)) {
      let img = new Image();
      img.src = path;
      img.onload = () => {
        this.images[name] = img;
        loaded.push(1);
        if (loaded.length === length) {
          // 所有图像加载完毕后，调用回调函数
          this.callback();
        }
      };
    }
  }

  /**
   * 更新当前场景。
   */
  update() {
    if (window.pause) {
      return;
    }
    this.scene.update();
  }

  /**
   * 清除画布。
   */
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * 绘制当前场景。
   */
  draw() {
    this.scene.draw();
  }

  /**
   * 运行主循环。
   */
  runloop() {
    for (let [key, callback] of Object.entries(this.actions)) {
      if (this.keydowns[key]) {
        // 如果按键被按下，调用注册的动作
        callback();
      }
    }
    this.update();
    this.clear();
    this.draw();
    //  requestAnimationFrame(() => this.runloop());
    setTimeout(() => {
      this.runloop();
    }, 1000 / (config?.fps?.value ?? 60));
  }

  /**
   * 根据名称获取图像。
   * @param {string} name - 图像名称。
   * @returns {Image} 返回对应的图像对象。
   */
  imageByName(name) {
    let image = this.images[name];
    return image;
  }

  /**
   * 运行指定场景。
   * @param {Object} scene - 要运行的场景对象。
   */
  runWithScene(scene) {
    this.scene = scene;
    setTimeout(() => {
      this.runloop();
    }, 1000 / (config?.fps?.value ?? 60));
  }

  /**
   * 替换当前场景。
   * @param {Object} scene - 新的场景对象。
   */
  replaceScene(scene) {
    this.scene = scene;
  }

  /**
   * 注册按键动作。
   * @param {string} key - 按键名称。
   * @param {Function} callback - 按键按下时要调用的回调函数。
   */
  registerAction(key, callback) {
    this.actions[key] = callback;
  }
}
