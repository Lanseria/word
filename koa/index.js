const Koa = require("koa");
const app = new Koa();
const router = require("koa-router")();
const fs = require("fs");

// 返回word文件接口
router.get("/getDoc", async (ctx, next) => {
  const docxUrl = "./static/test.docx";

  // 允许跨域
  ctx.set("Access-Control-Allow-Origin", "*");

  // 设置请求头
  ctx.set(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );

  // 创建可读流
  const readStream = fs.createReadStream(docxUrl);

  // 将读取的结果返回给前端
  ctx.body = readStream;
});

app.use(router.routes(), router.allowedMethods());

app.listen(3000, () => {
  console.log("server is starting at port 3000");
});
