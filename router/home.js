// 这个页面用于存放首页所有接口
const Router = require("koa-router");
const home = new Router();
//导入数据库文件
// const db = require("../utils/db");

// node直接输出图片
const fs = require("fs");
const path = require("path");
//需npm安装
const mime = require("mime-types");

// 写对应的接口
home.get("/", async (ctx) => {
  // ctx.body = "首页";
  // eg: http://localhost:3000/home?url=https://www.baidu.com&quality=50&sc=1,3
  const getJpeg = require("../views/getJpeg");
  const jpegJson = await getJpeg(ctx);
  console.log("首页----", jpegJson.data[0].src);
  // ctx.body = JSON.stringify(await getJpeg(ctx));
  // ctx.body = jpegJson.data[0].src;

  // 1. 输出了对应图片后需要nginx把物理地址和接口返回虚拟地址进行映射一下即可
  // 2. node直接输出
  // 首页---- http://localhost:3000/1024_768(https_www_baidu_com).jpeg
  // file---- C:/myweb/koa2/src/assets/1024_768(https_www_baidu_com).jpeg

  //图片地址 http://localhost:3000//src/assets/xxxxxxx.jpeg
  let filePath = path.join(__dirname, `.././src/assets/${jpegJson.data[0].name}.jpeg`); 
  let file = null;
  console.log("file----", filePath);
  try {
    //读取文件
    file = fs.readFileSync(filePath);
  } catch (error) {
    //如果服务器不存在请求的图片，返回默认图片
		//默认图片地址
    filePath = path.join(__dirname, "../public/default.jpg"); 
		 //读取文件
    file = fs.readFileSync(filePath);
  }

  //读取图片文件类型
  let mimeType = mime.lookup(filePath);
  //设置返回类型
  ctx.set("content-type", mimeType);
  //返回图片
  ctx.body = file;
});

// 导出home给index使用
module.exports = home;

// 获取图片 auth
// home.get('/getJpeg', async (ctx) => {
// 	console.log('getjpeg----');
// 	const getPdf = require('../views/getJpeg');
// 	ctx.body = JSON.stringify(await getJpeg(ctx));
// })
