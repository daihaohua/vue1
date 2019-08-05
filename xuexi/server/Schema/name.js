const {db,Schema} = require("../db/db")
//创建模型对象
const SchemaName = new Schema({
  name:String
})
const  User = db.model("names",SchemaName)
//导出
module.exports =  User;
