const User = require("../../Schema/User")
const AddClass = require("../../Schema/ClassifIcation")
//后台首页
exports.index = (req,res)=>{
  let userInfo = req.userInfo
  res.send(userInfo);
}

//拿到user数据
exports.user = (req,res)=>{
  let {pages,_id} = req.body
  let state={}
  state.page = 0;
  state.pages = pages;
  new Promise((res)=>{
    //有id就说明有删除的值
    if(_id){
      User.deleteOne({_id}).then((data)=>{
        console.log(data)
        res()
        return;
      })
    }
    res()
    return;
  })
    .then(async ()=>{
    //初始页数
    let count =  await User.countDocuments()
      //总页数
      return count
  })
    .then((count)=>{
      state.page = Math.max(state.pages,1)
      state.maxPage = Math.ceil(count/3) || 1;
      state.page = Math.min(state.maxPage,state.page);
      //跳过几页
      let skip = (state.page-1)*3;
      //显示几页
      let limit = 3;
      User.find({}).skip(skip).limit(limit).then((data)=>{

        state.userDate = data;
        res.send(state)
      })
    })
}

//拿到classification数据
exports.classification = (req,res)=>{
  let {pages,_id,className,old,modified} = req.body
  //作者id
  let author = req.userInfo.id;
  let state={}
  state.page = 0;
  state.pages = pages;
  new Promise(async (res)=>{
    //有id就说明有删除的值
    if(_id){
      await AddClass.find({_id}).then((data)=>{
        if(!data.length){//有值就删除
          state.code = 0;
          state.particulars = "该类名不存在";
          state.type= "error";
          res()
          return;
        }
        AddClass.deleteOne({_id}).then((data)=>{
          state.code = 1;
          state.particulars = "删除成功";
          state.type= "success";
          res()
          return;
        })

      })

    }
    //判断有没有className；
    if(className){
      //查找
      await AddClass.find({className}).then(async (data)=>{
        if(data.length){
          state.code = 0;
          state.particulars = "该类名已存在";
          state.type= "error";
          res()
          return;
        }
        //没有该类名就正常保存
        await new AddClass({className,author}).save().then((data)=>{
          state.code = 1;
          state.particulars = "保存成功"
          state.type= "success";
          res()
          return;
        })
      })

    }
    //修改
    if(modified){
      //要修改是值数据库中有没有
      await AddClass.find({className:modified}).then(async (data)=>{
        if(data.length){//有值
          state.code = 0;
          state.particulars = "该分类已经存在";
          state.type= "error";
          res()
          return;
        }
        await AddClass.updateOne({className:old},{$set:{className:modified}}).then((Update)=> {
          state.code = 1;
          state.particulars = "分类修改完成";
          state.type= "success";
          res()
          return;
        })
      })
    }
    res()
    return;
  })
    .then(async ()=>{
      //初始页数
      let count
      count =  await  AddClass.find({})
      return count.length;
    })
    .then((count)=>{
      let counts = count
      state.page = Math.max(state.pages,1)
      state.maxPage = Math.ceil((counts)/3) || 1;
      state.page = Math.min(state.maxPage,state.page);
      // console.log(counts,state.maxPage)
      //跳过几页
      let skip = (state.page-1)*3;
      //显示几页
      let limit = 3;
      AddClass.find({}).skip(skip).limit(limit).sort({"_id":-1}).then((data)=>{
        state.classDate = data;
        res.send(state)
        return;
      })
    })

}
