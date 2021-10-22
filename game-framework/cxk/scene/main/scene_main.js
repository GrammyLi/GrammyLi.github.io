/*
 * @Author: your name
 * @Date: 2021-10-22 13:31:06
 * @LastEditTime: 2021-10-22 20:05:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/cxk/scene/main/scene_main.js
 */
class SceneMain extends Scene {
  constructor(game) {
    super(game);
    this.game = game;
    this.init();
    this.bindEvents();
  }

  init() {
    this.score = 0;
    let { game } = this;
    let cave = BaseImage.new(game, "bg");
    this.cave = cave
    this.addElement(cave);

    this.blocks = [];
    const level = window.levels[0];
    level.forEach((block) => {
      let b = Block.new(game, block);
      this.addElement(b);
      this.blocks.push(b);
    });
    const text = `cxk yyds: ${this.score}`;
    let label = Lable.new(game, text);
    this.label = label;
    this.addElement(label);

    let amt = Animation.new(game);
    amt.x = 100;
    amt.y = 400;
    this.amt = amt;
    this.addElement(amt);

    let ball = Ball.new(game, "ball", this.amt);
    this.ball = ball;
    this.addElement(ball);
  }

  bindEventKeys() {
    this.game.registerAction("a", (keyStatus) => {
      this.amt.move(-10, keyStatus, "a");
    });
    this.game.registerAction("d", (keyStatus) => {
      this.amt.move(10, keyStatus, "d");
    });
    this.game.registerAction("f", (keyStatus) => {
      this.ball.fire();
    });
  }

  bindEvents() {
    this.bindEventKeys();
  }

  draw() {
    const { amt: paddle, ball, game, blocks, cave: bg } = this;
    bg.draw();
    paddle.draw();
    ball.draw();
    blocks.forEach((b) => b.draw());
    const text = `cxk yyds: ${this.score}`;
    let label = Lable.new(game, text);
    label.draw();
  }

  update() {
    const { amt: paddle, ball, game } = this;
    ball.move();
    paddle.update();

    if (paddle.collide(ball)) {
      ball.bounce(paddle);
    }

    this.blocks.forEach((block) => {
      if (block.collide(ball)) {
        // blockMusic();
        block.kill();
        //反弹
        ball.bounce(block);

        this.score += 100;
        log("this.score", this.score);
      }
    });

    if (ball.y > paddle.y) {
      // gameOverMusic();
      let end = SceneEnd.new(game);
      game.replaceScene(end);
    }
  }
}
