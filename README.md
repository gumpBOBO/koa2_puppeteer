# koa2_puppeteer
在线网站截图node服务

#### 博客文章地址：https://blog.ganxb2.com/36879.html

#### 小波自己搭建nodejs+koa2+puppeteer参考的相关文章

因为现在网站截图这个功能利用范畴挺多，包括类似微信上的海报分享功能都有使用网站截图的相关技术栈，所以小波自己也摸索着看看具体相关技术栈的实现。

1.基于koa,puppeteer实现网页不同尺寸截图[^4]

2.nodejs之koa2框架快速搭建服务器[^5]

3.Nodejs koa2读取服务器图片返回给前端直接展示[^6]

4.koa官方网站[^7]

- #### [koa2_puppeteer的github仓库]( https://github.com/gumpBOBO/koa2_puppeteer)

- #### 本地服务启动成功后百度网站截图效果

{% gi 2 2 %}

![2022-12-29_223734](https://i0.hdslb.com/bfs/album/cd447e1b553c665cda623558df51226b69d39b42.jpg@1e_1c.webp)

![2022-12-30_003317](https://i0.hdslb.com/bfs/album/f800563adbb2733be2f10ffa02afd623a31e160b.jpg@1e_1c.webp)

{% endgi %}

- #### 文件目录

  ```
  koa2_puppeteer
  ├─ .git
  ├─ .gitignore
  ├─ app.js				入口文件
  ├─ package-lock.json
  ├─ package.json
  ├─ public
  │  └─ default.jpg		默认图片
  ├─ README.md
  ├─ router
  │  ├─ home.js			生成图片路由调用接口
  │  └─ index.js			路由入口
  ├─ src
  │  └─ assets			生成图片保存地址
  │   ├─ 1024_768(https_www_baidu_com).jpeg
  │   └─ 1440_900(https_www_baidu_com).jpeg
  ├─ utils
  │  └─ db.js				连接数据库
  └─ views
    └─ getJpeg.js		生成图片核心方法和接口返回数据格式
  ```

  

- #### 开始使用

  1.  执行 `npm i`  初始项目，并执行 `nodemon`启动项目
  2.  地址栏输入`http://localhost:3000/home?url=https://www.baidu.com&quality=50&sc=1,3`即可看到效果