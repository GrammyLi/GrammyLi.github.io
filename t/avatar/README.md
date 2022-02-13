<!--
 * @Author: grammyli
 * @Date: 2021-10-09 20:09:19
 * @LastEditTime: 2022-01-20 20:51:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /工作任务笔记/头像生成器/README.md
-->

## TODO

1. ~~选择头像主题类型： flag 🇨🇳 | graduation 🎓~~
2. ~~选择滤镜效果~~
3. 切割图片
4. ~~自定义图像大小~~
5. ~~选择滤镜前，应该备份原图像数据, 只能有一次还原机会~~
6. ~~选择🎓风格~~
7. ~~下载图片有问题~~
8. ~~拍照上传~~
9. ~~bug 移动端上传文件~~
10. bug 设置 width（上传文件时，保存其数据）
11. bug 滤镜, 每次选择滤镜时，都是从原头像上添加滤镜效果（再添加一个canvas。当做备份)
12. ~~样式 open/close/take 按钮，需要优化~~
13. ~~视频的时候也可以添加滤镜效果~~
14. 重构代码
    
## 头像加国旗 

### 演示

地址01：[https://grammyli.com/t/avatar/](https://grammyli.com/t/avatar/)

地址02 有视频滤镜：https://yylichao.gitee.io/avatar/

#### 功能

- 头像加国旗 
- 切换主题: 国庆主题、毕业主题
- 滤镜效果
- 视频滤镜
- 拍照上传 

#### 思路

##### 头像加国旗

1. 上传的图片
2. 在画布中先画底图，然后画国旗

##### 切换主题

1. 点击主题的同时，下面选择的 flag或者 graduation
2. 遮罩图像路径，是根据主题和选择的类型来计算的

##### 滤镜效果

1.  获取图像的数据  -> 算法处理 -> 生成新的图像数据
2.  点击切换滤镜时，执行相应滤镜算法

##### 视频滤镜

1. video 获取图像数据
2. 在 canvas 中画出来

#### 实现

在画布中先画底图，然后画国旗

```javascript
const drawHat = (context) => {
  const type = e('.t-value-theme-type').dataset.type
  const n = +e(`.t-select-${type}`).dataset[type]
  const pre = type === 'flag' ? 'hat' : type
  const imgUrl = `https://grammyli.com/t/avatar/img/${type}/${pre}${n}.png`
  // log('imgUrl', imgUrl)
  const img = new Image()
  img.setAttribute('crossorigin', 'anonymous')
  img.src = imgUrl
  img.onload = () => {
    context.drawImage(img, 0, 0, width, width)
  }
}

const drawAvatar = () => {
  if (!imageData) {
    alert('大佬 上传图片')
    return
  }
  const c = e('.t-canvas')
  const context = c.getContext('2d')
  // 清空画布
  context.clearRect(0, 0, width, width)
  context.putImageData(imageData, 0, 0)
  drawHat(context)
}
```

视频滤镜

```javascript
const imageFilter = () => {
  const type = e(".t-select-filter").dataset.filter;
  // 没有上传文件
  if (!window.imageData) {
    return;
  }
  const image = document.querySelector(".t-canvas");
  const context = image.getContext("2d");
  if (type === "notFilter") {
    window.imageData = window.rawImageData;
    context.putImageData(imageData, 0, 0);
    return;
  }
  const filters = {
    gray: grayOfColors, // 灰度
    blackWhite: blackWhiteOfColors, // 黑白
    negative: negativeOfColors, // 底片
    comic: comicBooksOfColors, // 漫画
    nostalgia: nostalgiaOfColors, // 怀旧
    fusedCast: fusedCastOfColors,
  };

  // const imageData = context.getImageData(0, 0, 400, 400);
  const { data } = window.imageData;
  for (let i = 0; i < data.length; i += 4) {
    const colors = data.slice(i, i + 4);
    const newColors = filters[type](colors);
    const [r, g, b, a] = newColors;
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = a;
  }
  context.putImageData(imageData, 0, 0);
};

```

案例: pixel -> new pixel

```javascript
const comicBooksOfColors = (colors) => {
  let r = colors[0];
  let g = colors[1];
  let b = colors[2];
  let A = colors[3];
  let R = (Math.abs(g - b + g + r) * r) / 256;
  let G = (Math.abs(b - g + b + r) * r) / 256;
  let B = (Math.abs(b - g + b + r) * g) / 256;
  return [int(R), int(G), int(B), int(A)];
};

const nostalgiaOfColors = (colors) => {
  let r = colors[0];
  let g = colors[1];
  let b = colors[2];
  let A = colors[3];
  let R = 0.393 * r + 0.769 * g + 0.189 * b
  let G = 0.349 * r + 0.686 * g + 0.168 * b
  let B = 0.272 * r + 0.534 * g + 0.131 * b
  return [int(R), int(G), int(B), int(A)];
}

const fusedCastOfColors = (colors) => {
  let r = colors[0];
  let g = colors[1];
  let b = colors[2];
  let A = colors[3];
  let R = r * 128 / (g + b + 1)
  let G = g * 128 / (r + b + 1)
  let B = b * 128 / (g + r + 1)
  return [int(R), int(G), int(B), int(A)];
}

const grayOfColors = (colors) => {
  let r = colors[0];
  let g = colors[1];
  let b = colors[2];
  let gray = (r + g + b) / 3;
  let R = gray;
  let G = gray;
  let B = gray;
  let A = colors[3];
  return [int(R), int(G), int(B), int(A)];
};

// 求RGB平均值Avg ＝ (R + G + B) / 3，如果Avg >= 100，
// 则新的颜色值为＝RG＝B＝255；
// 如果Avg < 100，则新的颜色值为R＝G＝B＝0；255就是白色，0就是黑色
const blackWhiteOfColors = (colors) => {
  let r = colors[0];
  let g = colors[1];
  let b = colors[2];
  let gray = (r + g + b) / 3;
  gray = gray >= 100 ? 255 : 0;
  let R = gray;
  let G = gray;
  let B = gray;
  let A = colors[3];
  return [int(R), int(G), int(B), int(A)];
};

// 底片
// 算法原理：将当前像素点的RGB值分别与255之差后的值作为当前点的RGB值，即
// R = 255 – R；G = 255 – G；B = 255 – B；
const negativeOfColors = (colors) => {
  let r = colors[0];
  let g = colors[1];
  let b = colors[2];
  let R = 255 - r;
  let G = 255 - g;
  let B = 255 - b;
  let A = colors[3];
  return [int(R), int(G), int(B), int(A)];
};
```














