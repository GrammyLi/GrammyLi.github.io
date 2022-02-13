<!--
 * @Author: your name
 * @Date: 2021-10-14 13:37:50
 * @LastEditTime: 2021-12-22 20:08:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/search/README.md
-->


## TODO

- ~~页面 html 结构~~
- ~~美化页面~~
- ~~类似google 搜索功能~~
- 类似google 添加网页 tile-icon
- 类似google 删除网页 tile-icon
- 类似google 语音搜索功能
- ~~类似google 拖拽功能~~
- 类似google 搜索提示功能
- ~~点击star 切换收藏页面~~
- 切换主题功能

### 参考

样式
https://codepen.io/chickenn00dle/pen/xLgEyV
https://codepen.io/sandervolbeda/pen/KKPeEeg

拖拽
https://codepen.io/gabrielferreira/pen/jMgaLe

页面功能
https://sea.team/

预览
https://grammyli.com/t/search

### 后端接口设计

path: /e/addUpdate
method: post
有id则更新相应内容，没有则添加engine

 
path: /e/remove/id
method: get
删除engine


path: /s/addUpdate
method: post
有id则更新相应内容，没有则添加 star

path: /s/remove/id
method: get
删除 star


