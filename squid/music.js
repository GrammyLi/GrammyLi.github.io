/*
 * @Author: your name
 * @Date: 2021-11-23 20:36:20
 * @LastEditTime: 2021-11-23 21:16:15
 * @LastEditors: Please set LastEditors
 * @Description:   
 * @FilePath:  
 */
 
class Music {
  constructor() {
    this.bgMusic = new Audio("./music/bg.mp3");
    this.bgMusic.loop = true;
    this.winMusic = new Audio("./music/win.mp3");
    this.loseMusic = new Audio("./music/lose.mp3");
  }
  static new(...args) {
    this.i = this.i || new this(...args);
    return this.i;
  }
}
window.m = Music.new()