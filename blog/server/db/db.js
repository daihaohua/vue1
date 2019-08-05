const mongoose = require("mongoose")

//连接数据库
const db = mongoose.createConnection("mongodb://localhost:27019/blog",{useNewUrlParser:true})
//保存Schema
let Schema = mongoose.Schema

mongoose.Promise = global.Promise;
//判断状态
db.on("error",console.log.bind(console,"连接失败"))
db.on("open",()=>{console.log("连接成功")})
//导出对象
module.exports =  {
  db,Schema
};
