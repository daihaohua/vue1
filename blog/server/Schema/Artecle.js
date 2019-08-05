const {db,Schema} = require("../db/db")
const ObjectId = Schema.Types.ObjectId;
//创建User模型对象
const SchemaArtecle = new Schema({
  //文章标题
  title:String,
  //文章简介
  brief:String,
  //文章内容
  content:String,
  comment:{
    type:Array,
    default:[]
  },
  //点击数
  hits:{
    type:Number,
    default:0
  },
    //关联分类，
    classId:{
    type:ObjectId,
    ref:"addclasses"
  },
  //关联作者
  author:{
    type:ObjectId,
    ref:"users"
  }
},{versionKey:false,timestamps:{
  createdAt: "created"
  }})
const  Artecle = db.model("artecles",SchemaArtecle)
//导出
module.exports =  Artecle;
