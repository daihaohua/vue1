const Topic = require("../../Schema/topic")

exports.add = async cxt=>{
let {name,topic} = cxt.request.body
  await new Promise((resolve,reject)=>{
    if(topic === "") return resolve(0)
    Topic.find({topic},(err,data)=>{
      if(err)return reject(err)
      if(data.length !==0){//查到数据了
        return resolve("")
      }
      //没找到就存到数据库中
      new Topic({name,topic}).save((err,data)=>{
        if(err){//报错了
          return reject(err)
        }else{
          //拿到后台所有的数据
          Topic.find().sort({_id:-1}).then((res)=>{
            return resolve(res)
          })
        }
      })
    })
  }).then((data)=>{//吧成功的数据处理返回
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
exports.topicClasss = async cxt =>{
  let {_id,topic} = cxt.request.body
  await new Promise((resolve,reject)=>{
    if(topic===""){
      cxt.body = {
        cause:"不能为空",
        type:'error',
        topicDate:[],
        state:0
      }
      return resolve()
    }
    Topic.find({topic}).then((res)=>{
      if(res.length){//找到了，不能修改同样的类名
        cxt.body = {
          cause:"该类名存在",
          type:'error',
          topicDate:[],
          state:0
        }
        return resolve()
      }
      Topic.updateOne({_id},{$set:{topic}}).then((result)=>{
        if(result.nModified){//修改成功
          Topic.find().sort({_id:-1}).then((topicDate)=>{
            cxt.body = {
              cause:"修改成功",
              type:'success',
              topicDate,
              state:result.nModified
            }
            return resolve()
          })
        }else{//修改失败
          cxt.body = {
            cause:"修改失败",
            type:'error',
            topicDate:[],
            state:result.nModified
          }
          return resolve()
        }
      })
    })
  })
}

exports.removeClass = async cxt =>{
  let {_id} = cxt.request.body
  await new Promise((resolve)=>{
    Topic.deleteOne({_id}).then((a)=> {
      Topic.find().sort({_id:-1}).then((res)=>{
        resolve(res)
      })

    })
  }).then((data)=>{
    cxt.body ={
      data
    }
  })
}

