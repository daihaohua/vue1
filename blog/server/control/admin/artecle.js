const Artecle = require("../../Schema/Artecle")
const AddClass = require("../../Schema/ClassifIcation")

exports.artecles = (req,res)=>{
  let {pages,classId,title,brief,content,identification,_id} = req.body
  //作者id
  let author = req.userInfo.id;
  let state={}
  state.page = 0;
  state.pages = pages;
  new Promise(async (res)=>{
    //拿到分类的所有数据
    await AddClass.find({}).then((data)=>{
      state.options = data
    })
    //有id就说明有删除的值
    if(identification === "remove"){
      await Artecle.find({_id}).then((data)=>{
        if(!data.length){//没有有值就return
          state.code = 0;
          state.particulars = "该类名不存在";
          state.type= "error";
          res()
          return;
        }
        //有值就删除
        Artecle.deleteOne({_id}).then((data)=>{
          state.code = 1;
          state.particulars = "删除成功";
          state.type= "success";
          res()
          return;
        })

      })

    }

    //添加；
    if(identification === "add"){
      if(title===""||content===""||brief===""){
        state.code = 0;
        state.particulars = "文章内容或者简介或者标题不能为空";
        state.type= "error";
        res()
        return;
      }
      //查找
      await Artecle.find({title}).then(async (data)=>{
        if(data.length){
          state.code = 0;
          state.particulars = "该文章标题已存在";
          state.type= "error";
          res()
          return;
        }
        //没有该类名就正常保存
        await new Artecle({classId,author,title,brief,content}).save().then((data)=>{
          state.code = 1;
          state.particulars = "保存成功"
          state.type= "success";
          res()
          return;
        })
      })

    }

    //修改
    if(identification === "update"){
      //要修改是值数据库中有没有
      if(title===""||content===""||brief===""){
        state.code = 0;
        state.particulars = "文章内容或者简介或者标题不能为空";
        state.type= "error";
        res()
        return;
      }
      await Artecle.find({title}).then(async (data)=>{
        if(data.length){
          state.code = 0;
          state.particulars = "该文章标题已经存在";
          state.type= "error";
          res()
          return;
        }
        //没有找到相同标题的文章可以保存
        await Artecle.updateOne({_id},{$set:{title,content,brief}}).then((Update)=> {
          state.code = 1;
          state.particulars = "文章修改完成";
          state.type= "success";
          res()
          return;
        })
      })
    }

    //获取所有分类
    res()
    return;
  })
    .then(async ()=>{
      //初始页数
      let count =  await  Artecle.countDocuments();
      return count;
    })
    .then((count)=>{
      let counts = count
      state.page = Math.max(state.pages,1)
      state.maxPage = Math.ceil((counts)/3) || 1;
      state.page = Math.min(state.maxPage,state.page);
      //跳过几页
      let skip = (state.page-1)*3;
      //显示几页
      let limit = 3;
      Artecle.find({})
        .sort({_id:-1})
        .skip(skip)
        .limit(limit)
        .populate([
            {
              path:"author",
              select:"_id username"
            },
            {
              path:"classId",
              select:"_id className"
            }
        ]

        )
        .then((data)=>{
        state.artecleDate = data;

        res.send(state)
        return;
      })
    })
}
