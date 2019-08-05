const Topic = require("../../Schema/topic")

// exports.getListDates = async cxt=>{
//   let {name} = cxt.request.body
//   await new Promise((resolve)=>{
//     Topic.find({name}).then((data)=>{
//       resolve(data);
//     })
//   }).then((data)=>{
//     cxt.body = {
//       topicDate:data
//     }
//   })
// }
exports.getListDates = async cxt=>{
  let {name} = cxt.request.body
  await new Promise((resolve)=>{
    Topic.aggregate([
      { //是对关联表进行进行赛选
          $match :{name}},
      {
        $lookup:{
                  from:"articles",//被关联的那个表
                  localField: "topic",//这个表的匹配符
                  foreignField:"topic",//那个表的匹配符
                  as:"info"//给这个表设个名字，吧拿到的数据这个数组中是个数组
              },
      },
      {
          $sort:{//排序
              _id:-1
          }
      },
    ],function (err,docs) {
      resolve(docs)
})
  }).then((data)=>{
    cxt.body = {
      topicDate:data
    }
  })
}
