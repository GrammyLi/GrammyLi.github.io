/*
 * @Author: your name
 * @Date: 2019-10-31 20:11:06
 * @LastEditTime: 2021-10-22 19:25:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game-framework/animation/main.js
 */
const __main = () => {
  let images = {
    // left
    right1: "./images/paddle_1.png",
    right2: "./images/paddle2_1.png",
    right3: "./images/paddle3_1.png",
    right4: "./images/paddle4_1.png",
    // right
    left1: "./images/paddle_2.png",
    left2: "./images/paddle2_2.png",
    left3: "./images/paddle3_2.png",
    left4: "./images/paddle4_2.png",

    // bg
    bg: "./images/background.jpg",
    // ball
    ball: "./images/ball.png",

    block1: './images/block001.png',
    block2: './images/block_01.png',
    block3: './images/block_02.png',
  };

  let game = DaZhiZiGame.instance(30, images, (g) => {
    let s = SceneTitle.new(g);
    g.runWithScene(s);
  });
};

__main();
