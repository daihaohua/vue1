const {db,Schema} = require("../db/db")
//创建模型对象
const SchemaTopic = new Schema({
  name:String,
  topic:String
})
const  Topic = db.model("topics",SchemaTopic)
//导出
module.exports =  Topic;
