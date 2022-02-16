/*
 * @Author: grammyli
 * @Date: 2022-02-15 19:12:04
 * @LastEditTime: 2022-02-16 18:55:30
 * @LastEditors: Please set LastEditors
 * @Description: 文字头像
 * @FilePath: /art/main.js
 */
const __main = () => {
  const canvas = e(".g-canvas");
  window.asciiImage = AsciiImage.new({
    canvas,
    url: imageUrl,
  })

  handleUploadFile()
  handleSaveFile()
};

__main();
