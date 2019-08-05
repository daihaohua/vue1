const Koa = require("koa");
const router = require("./router/router")
const koaBody = require("koa-body")

const app = new Koa;
app.use(koaBody())//获取post数据的

app.use(router.routes())//给koa设置路由
  .use(router.allowedMethods())
  .listen(3001)

