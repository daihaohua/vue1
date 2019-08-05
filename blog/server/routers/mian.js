const express = require("express")
//引入路由
const router = express.Router();
const main = require("../control/main/index")
const classify = require("../control/main/indexClassify")
//首页数据
router.get("/index",main.index)
//注册
router.post("/reg",main.reg)
//登录
router.post("/login",main.login)
//删除cookie
router.get("/loginCookie",main.loginCookie)
//首页数据
router.get("/classify/:className",classify.classIfy)
//文章id
router.get("/details/:_id",classify.artecle)
//添加评论
router.post("/details/comment",classify.comment)
module.exports = router;
