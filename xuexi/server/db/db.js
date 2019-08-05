const mongoose = require("mongoose")

//连接数据库
const db = mongoose.createConnection("mongodb://localhost:27018/xuexi",{useNewUrlParser:true})
const Schema = mongoose.Schema
mongoose.Promise = global.Promise;
db.on("error",console.log.bind(console,"连接失败"))
db.on("open",()=>{console.log("连接成功")})


module.exports =  {
  db,Schema
};





