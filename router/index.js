// router的入口文件
// 引入路由
const Router = require("koa-router");
const router = new Router();
//导入home,使home中的接口可用
const home = require("./home");
// const KoaBody = require('koa-body');

// 获取图片
// router.get('/getJpeg', auth, async (ctx) => {
// 	const getPdf = require('../views/getJpeg');
// 	ctx.body = JSON.stringify(await getJpeg(ctx));
// })

// router.use()
router.use("/home", home.routes(), home.allowedMethods());

// 一般首页是直接访问ip+端口号进入,所以可以将期重定向到/home下的某一个路由
router.redirect("/", "/home");
// 导出router给app.js使用
module.exports = router;
