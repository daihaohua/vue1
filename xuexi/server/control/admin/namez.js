//const {db} = require("../db/db")
//const SchemaName = require("../Schema/name")
//const  User = db.model("names",SchemaName)
const User = require("../../Schema/name")
exports.name = async cxt =>{
  let {name} = cxt.request.body
  //因为是异步的是所有的加上promise对象
  await new Promise((resolve,reject)=>{
      if(name === "") return resolve(0)
     User.find({name},(err,data)=>{
      if(err)return reject(err)
      if(data.length !==0){//查到数据了
        return resolve("")
      }
      //没找到就存到数据库中
      new User({name}).save((err,data)=>{
        if(err){//报错了
          return reject(err)
        }else{
          //拿到后台所有的数据
          User.find().sort({_id:-1}).then((res)=>{
            return resolve(res)
          })
        }
      })
     })
   }).then((data,res)=>{//吧成功的数据处理返回
    if(data){//保存成功
      cxt.body = {
        cause:"输入成功",
        type:'success',
        listData:data
      }
    }else{//空字符串，有类名了
      cxt.body = {
        cause:"该类名以存在或者输入框不能为空",
        type:'error'
      }
    }
  }).catch((err)=>{//吧失败的数据处理返回
    cxt.body = {
      cause:err,
      type:'error'

    }
  })

}
