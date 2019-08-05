const Router = require("koa-router")
const router = new Router()
const user = require("../control/admin/namez")
const list = require("../control/admin/list")
const topic = require("../control/admin/topic")
const article = require("../control/admin/article")
const mian = require("../control/mian/maindate")
//创建连接
router.post("/addClass",user.name)
//查找列表
router.get("/listData",list.list)
//删除列表
router.post("/remove",list.remove)
//修改列表
router.post("/updateClass",list.update)

//分类添加
router.post("/topic",topic.add)
//修改分类
router.post("/topicClasss",topic.topicClasss)
//删除分类
router.post("/removeClass",topic.removeClass)

//文章的添加
router.post("/article",article.addArticle)
//文章删除
router.post("/removeArticle",article.removeArticle)
//修改文章名
router.post("/updateArticle",article.updateArticle)

//首页获取标题数据
router.post("/getListDates",mian.getListDates)


module.exports =  router;
