/*
 * @Author: your name
 * @Date: 2020-05-31 11:19:00
 * @LastEditTime: 2021-12-01 20:08:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/game-framework/bird/scene/title/scene_title.js
 */
class SceneTitle extends Scene {
  constructor(game) {
    super(game);
    this.game = game;
    this.init();
    this.bindEvents();
  }
  init() {
    // 添加背景图片
    let bg = BaseImage.new(this.game, "bg");
    this.addElement(bg);
    // 添加 hero
    let hero = Hero.new(this.game);
    this.hero = hero;
    this.addElement(hero);
    this.sq = [
      {
        x: 110,
        y: 375,
        w: 50,
        h: 200,
      },
      {
        x: 300,
        y: 375,
        w: 50,
        h: 200,
      },
      {
        x: 500,
        y: 375,
        w: 50,
        h: 200,
      },
      {
        x: 800,
        y: 375,
        w: 50,
        h: 200,
      },
    ];
    let squares = this.sq.map(({ x, y, w, h }) =>
      Square.new(this.game, x, y, w, h)
    );
    this.squares = squares;
    squares.map((s) => this.addElement(s));

    this.index = 0;
    this.initSquares();

    // let square = Square.new(this.game, 110, 375, 50, 200);
    // log("square");
    // this.square = square
    // 添加 stick
  }
  initSquares() {
    log("this.index", this.index);
    this.firstSquare = this.sq[this.index];
    this.secondSquare = this.sq[this.index + 1];
    log("this. .1", this.firstSquare);
    log("this. 2", this.secondSquare);
    this.minRightMoveDistance =
      this.secondSquare.x - this.firstSquare.x - this.firstSquare.w;
    this.maxRightMoveDistance = this.minRightMoveDistance + this.secondSquare.w;
    let { x, y, w, h } = this.firstSquare;
    let stick = Stick.new(this.game, x, y, 50, 0);
    log("stick", stick);
    this.stick = stick;
    this.addElement(stick);
  }
  bindEvents() {
    let cvs = this.game.canvas;
    cvs.addEventListener("mousedown", (event) => {
      log("down");
      let x = event.offsetX;
      let y = event.offsetY;
      this.stick.isElongate = true;
    });
    cvs.addEventListener("mouseup", (event) => {
      let x = event.offsetX;
      let y = event.offsetY;
      this.stick.isElongate = false;
      this.stick.isRotation = true;
    });
  }
  updateHero() {
    if (!this.stick) {
      return
    }
    let square = this.firstSquare;
    // hero 将要移动的距离
    let willDistance = this.stick.length + square.w / 2;
    // log('willDistance', willDistance)
    // hero 当前移动的实际距离
    let currentDistance = this.hero.moveDistance;
    // log('currentDistance', currentDistance)
    // hero 是否需要移动
    let isNeedMove = willDistance > currentDistance 

    // stick 没有变长，没有旋转，同时长度大于零
    let stickNotMove = !this.stick.isElongate && !this.stick.isRotation;
    if (isNeedMove && stickNotMove && this.stick.length > 0) {
      this.hero.move();
    } else if (!isNeedMove && stickNotMove && this.stick.length !== 0 && this.stick) {
      let l = this.stick.length;
      if (l > this.minRightMoveDistance && l < this.maxRightMoveDistance) {
        this.removeElement(this.stick);
        this.index += 1;
        this.initSquares();
      } else {
        this.gameOver();
      }
    } else {
    }
  }
  gameOver() {
    this.game.context.font = "32px serif";
    this.game.context.fillStyle = "#73c9e5";
    this.game.context.fillText("game over", 400, 270);
  }
  update() {
    super.update();
    this.stick && this.updateHero();
  }
  drawInform() {
    this.game.context.font = "15px serif";
    this.game.context.fillStyle = "#73c9e5";
    this.game.context.fillText("按 k 开始游戏", 80, 270);
    this.game.context.fillText("按 j 跳跃", 80, 290);
  }
  draw() {
    super.draw();
    this.drawInform();
  }
}
