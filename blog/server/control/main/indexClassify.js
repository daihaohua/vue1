const Artecle = require("../../Schema/Artecle")

//首页
exports.classIfy = (req,res)=>{
  let {pages} = req.query;
  let classNames = {};
  let state = {}
  state.page = 0;
  state.pages = pages;
  if(req.params.className !== "all"){
    classNames.classId = req.params.className;
  }
  new Promise(async (res)=>{
    res()
  })
    .then(async ()=>{
      //初始页数
      let count =  await  Artecle.find(classNames)
      return count.length;
    })
    .then((count)=>{
      let counts = count
      let n = 5
      state.page = Math.max(state.pages,1)
      state.maxPage = Math.ceil((counts)/n) || 1;
      state.page = Math.min(state.maxPage,state.page);
      //跳过几页
      let skip = (state.page-1)*n;
      //显示几页
      let limit = 5;
      Artecle.find(classNames)
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
          state.indexDate = data;
          res.send(state)
          return;
        })
    })
}

//文章
exports.artecle = (req,res)=>{
  let _id = req.params._id;
  Artecle.updateOne({_id},{$inc:{hits:1}},()=>{
    Artecle.findById(_id).populate([
        {
          path:"author",
          select:"_id username"
        },
        {
          path:"classId",
          select:"_id className"
        }
      ]
    ).then((data)=>{
      res.send(data);
    })
  })
}

//添加评论
exports.comment = (req,res)=>{
  let {comment,_id} = req.body;
  let Comments = {
    userInfo:req.userInfo.username,
    comment
  }
  Artecle.findById(_id).then((data)=>{
    data.comment.unshift(Comments);
    data.save().then((a)=>{
      res.send(a)
    })
  })
}

