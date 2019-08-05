const User = require("../../Schema/name")
const Topic = require("../../Schema/topic")
const Article = require("../../Schema/article")

//查找列表所有数据
exports.list = async cxt =>{
  await new Promise((resolve)=>{
    let data = {}
      User.find({}).sort({_id:-1}).then((a)=> {
        data.tableData = a
        Topic.find({}).sort({_id:-1}).then((b)=>{
          data.topicDate = b
          Article.find({}).sort({_id:-1}).then((c)=>{
            data.articleDate = c
            resolve(data)
          })
        })
      })
  }).then((data)=>{
    cxt.body =data
  })
}

//删除数据
exports.remove = async cxt =>{
  let {_id} = cxt.request.body
  await new Promise((resolve,reject)=>{
    User.deleteOne({_id}).then((a)=> {
      User.find().sort({_id:-1}).then((res)=>{
        resolve(res)
      })

    })
  }).then((data)=>{
    cxt.body ={
      data
    }
  })
}

//修改列表数据
exports.update = async cxt =>{
  let {_id,name} = cxt.request.body
  await new Promise((resolve,reject)=>{
    if(name===""){
      cxt.body = {
        cause:"不能为空",
        type:'error',
        topicDate:[],
        state:0
      }
      return resolve()
    }
    User.find({name}).then((res)=>{
      if(res.length){
        cxt.body = {
          cause:"该类名存在",
          type:'error',
          listDate:[],
          state:0
        }
        return resolve()
      }
      User.updateOne({_id},{$set:{name}}).then((result)=>{
        if(result.nModified){//修改成功
          User.find().sort({_id:-1}).then((listDate)=>{
            cxt.body = {
              cause:"修改成功",
              type:'success',
              listDate,
              state:result.nModified
            }
            return resolve()
          })
        }else{//修改失败
          cxt.body = {
            cause:"修改失败",
            type:'error',
            listDate:[],
            state:result.nModified
          }
          return resolve()
        }
      })
    })
  })
}
