const puppeteer = require("puppeteer");

function delay(time) {
  return new Promise((res) => setTimeout(res, time));
}
// 滚动到底
function autoScroll(page) {
  return page.evaluate(() => {
    return new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 500;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve(totalHeight);
        }
      }, 17);
    });
  });
}

const sc = [
  { width: 800, height: 600 },
  { width: 1024, height: 768 },
  { width: 1280, height: 960 },
  { width: 1440, height: 900 },
  { width: 1680, height: 1050 },
  { width: 1920, height: 1200 },
  { width: 2560, height: 1440 },
  { width: 3840, height: 2160 },
];
// step 2 生成图片核心方法
async function getJpegStart(url, scarr, quality = 50) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0",
  });
  await delay(3000); //等待3秒让页面渲染dom
  let pathArr = [];
  // 截取图片
  async function sh() {
    if (!scarr.length) return;
    await page.setViewport(sc[scarr[0]]);
    let height = await autoScroll(page);
    let u = url.replace(":", "_").replace(/\./g, "_").replace(/\//g, "");
    // 生成图片
    await page.screenshot({
      path:
        "src/assets/" +
        sc[scarr[0]].width +
        "_" +
        sc[scarr[0]].height +
        "(" +
        u +
        ")" +
        ".jpeg",
      clip: {
        x: 0,
        y: 0,
        width: sc[scarr[0]].width,
        height: height,
      },
      quality,
    });
    pathArr.push({
      src:
        sc[scarr[0]].width +
        "_" +
        sc[scarr[0]].height +
        "(" +
        u +
        ")" +
        ".jpeg",
      size: sc[scarr[0]].width + "*" + sc[scarr[0]].height,
      name: sc[scarr[0]].width + "_" + sc[scarr[0]].height + "(" + u + ")",
    });
    scarr.shift();
    await sh();
  }
  await sh();

  await browser.close();
  return pathArr;
}

// step 1 获取地址参数然后调用 step 2核心方法，然后拼好返回接口数据
async function getJpeg(ctx, id) {
  // 定义返回体(这里写法应该有点不严谨)
  let res;
  // 地址
  let url = ctx.query.url;
  // 质量
  let quality = Number(ctx.query.quality);
  // 尺寸
  let sc = []; // 尺寸索引 传入的值格式为： sc=1，3，5
  ctx.query.sc.split(",").forEach(function (v) {
    sc.push(Number(v));
  });
  let pathArr = await getJpegStart(url, sc, quality);
  console.log(111, url);
  console.log(222, sc);
  console.log(333, quality);
  if (pathArr.length) {
    pathArr.forEach(function (v) {
      v.src = "http://" + ctx.host + "/" + v.src;
    });
    res = {
      status: 200,
      data: pathArr,
    };
  } else {
    res = {
      status: 0,
      data: null,
      msg: "目标链接访问失败",
    };
  }
  return res;
}

// 抛出 getJpeg
module.exports = getJpeg;
