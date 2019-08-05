const express = require("express")

const router = express.Router();

const admin = require("../control/admin/index")
const artecle = require("../control/admin/artecle")

//请求状态
router.get("/index",admin.index)
//拿到user数据
router.post("/user",admin.user)
//拿到class数据
router.post("/classification",admin.classification)
//拿到artecle文章数据数据
router.post("/artecle",artecle.artecles)

module.exports = router;
