const {db,Schema} = require("../db/db")
//创建模型对象
const SchemaArticle = new Schema({
  topic:String,
  article:String,
  articleContent:String

})
const  Article = db.model("articles",SchemaArticle)
//导出
module.exports =  Article;
