// 整个koa项目的入口文件

// 引入koa2
const Koa = require("koa2");
// 声明一个实例
const app = new Koa();
// 端口号
const port = 3000;
// 配置路由
const router = require("./router");
// 解决跨域
const cors = require("koa2-cors");
// 静态资源管理
const static = require("koa-static");
const path = require("path");
// log
const logger = require("koa-logger");

/**
 * use()就是调用router中间件
 * router.routes()作用是启动路由
 * router.allowedMethods()作用是允许任何请求(例如:get,post,put)
 */
//读取静态资源
app.use(static(path.join(__dirname, "./src/assets/")));
// app.use(static(path.join(__dirname + "/public")));
//后端允许跨域访问
app.use(cors());
// allowedMethods 405响应和501响应
app.use(router.routes(), router.allowedMethods());
//log
app.use(logger());

app.listen(port, () => {
  console.log(`server in running at http://localhost:${port}`);
});

/*
app.js调用router/index.js
router/index.js 对应路径写接口 
*/
