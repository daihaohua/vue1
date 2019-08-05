const {db,Schema} = require("../db/db")
//创建User模型对象
const SchemaClassifIcation = new Schema({
  className:String,
  author:{
    type:Schema.ObjectId,
    ref:"Users"
  }
},)
const  AddClass = db.model("addclasses",SchemaClassifIcation)
//导出
module.exports =  AddClass;
