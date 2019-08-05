const Article = require("../../Schema/article")

exports.addArticle = async cxt=>{
  let {topic,article,articleContent} = cxt.request.body
  await new Promise((resolve,reject)=>{
    if(article === "") return resolve(0)
    Article.find({article},(err,data)=>{
      if(err)return reject(err)
      if(data.length !==0){//查到数据了
        return resolve("")
      }
      //没找到就存到数据库中
      new Article({topic,article,articleContent}).save((err)=>{
        if(err){//报错了
          return reject(err)
        }else{
          //拿到后台所有的数据
          Article.find().sort({_id:-1}).then((res)=>{
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
        articleDate:data
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

exports.removeArticle = async cxt =>{
  let {_id} = cxt.request.body
  await new Promise((resolve)=>{
    Article.deleteOne({_id}).then((a)=> {
      Article.find().sort({_id:-1}).then((res)=>{
        resolve(res)
      })

    })
  }).then((data)=>{
    cxt.body ={
      data
    }
  })
}
exports.updateArticle = async cxt =>{
  let {_id,article} = cxt.request.body
  await new Promise((resolve)=>{
    if(article===""){
      cxt.body = {
        cause:"不能为空",
        type:'error',
        articleDate:[],
        state:0
      }
      return resolve()
    }
    Article.find({article}).then((res)=>{
      if(res.length){//找到了，不能修改同样的类名
        cxt.body = {
          cause:"该类名存在",
          type:'error',
          articleDate:[],
          state:0
        }
        return resolve()
      }
      Article.updateOne({_id},{$set:{article}}).then((result)=>{
        if(result.nModified){//修改成功
          Article.find().sort({_id:-1}).then((articleDate)=>{
            cxt.body = {
              cause:"修改成功",
              type:'success',
              articleDate,
              state:result.nModified
            }
            return resolve()
          })
        }else{//修改失败
          cxt.body = {
            cause:"修改失败",
            type:'error',
            articleDate:[],
            state:result.nModified
          }
          return resolve()
        }
      })
    })
  })
}
