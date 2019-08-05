const {db,Schema} = require("../db/db")
//创建User模型对象
const SchemaUser = new Schema({
    username:String,
    password:String,
    isAdmin :{
      type:Boolean,
      default:false
    }
},)
const  User = db.model("users",SchemaUser)
//导出
module.exports =  User;
