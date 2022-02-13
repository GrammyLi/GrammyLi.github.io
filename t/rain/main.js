/*
 * @Author: your name
 * @Date: 2022-02-11 18:16:32
 * @LastEditTime: 2022-02-13 13:02:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /rain/main.js
 */
const __main = () => {
  const canvas = e(".g-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const config = {
    canvas: canvas,
    fontSize: 20,
  };

  LastNamesRain.new(config);
};

__main();
