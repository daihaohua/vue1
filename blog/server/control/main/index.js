const User = require("../../Schema/User")
const AddClass = require("../../Schema/ClassifIcation")

//首页
exports.index = async (req,res)=>{
  let indexDate = {};
  indexDate.userInfo = req.userInfo;
  await AddClass.find({}).then((data)=>{
    indexDate.data = data;
    res.send(indexDate)
  })

}

//注册
exports.reg = (req,res)=>{
  let {username,password,confirmPassword} = req.body;
  let state = {
    errer : 0,
    type :"error"
  }
  if(password !== confirmPassword){//密码是否相等
    state.particulars = "密码不一致"
    res.send(state)
    return false;
  }
  //用户名是否存在
  User.find({username},(err,data)=>{
    if(err){//是否报错
      state.particulars = "用户存在或者密码错误"
      res.send(state)
      return false;
    }
    if(data.length){//如果找到了，就不能注册
      state.particulars = "该用户已经存在"
      res.send(state)
      return false;
    }
    new User({username,password})
      .save()
      .then((data)=>{
        state.errer = 1;
        state.type = "success";
        state.particulars = "该用户保存成功,即将跳转"
        res.send(state)
        return false;
      })
  })

}

//登录
exports.login = (req,res)=>{
  let {username,password} = req.body;
  let state = {
    errer : 0,
    type :"error"
  }
  User.findOne({username}).then((data)=>{
    if(!data){//没有知道该用户
      state.particulars = "没有找到该用户请先注册"
      res.send(state)
      return false;
    }
    //找到该用户设置cookie值
    state.errer = 1
    state.type = "success"
    state.particulars = "登入成功即将跳转"
    state.userInfo = {
      isAdmin:data.isAdmin,
      id:data._id,
      username:data.username
    }
    //下发cookie
    res.cookie("userInfo",JSON.stringify(state.userInfo),{
      maxAge:9000000
    })
    res.send(state)
  })
}

//删除cookie
exports.loginCookie = (req,res)=>{
  res.cookie("userInfo","");
  res.send("ok")
}
