const express = require("express");
const bodyParser = require("body-parser")
const User = require("./schema/users")
const mongoose = require("mongoose")

const app = express();
app.use(bodyParser.urlencoded({
  extended:true
}))
app.use(bodyParser.json())

//输入数据的
app.post("/login",(req,res)=>{
  let {xue} = req.body
  let userss = req.body
  User.findOne({
    xue
  }).then((user)=>{
    if(!user){//如果没找到添加
      User(userss).save()
      res.send({//
        errer:0
      })
    }else{//知道了就返回不能添加
      res.send({
        errer:1
      })
    }
  })
})

//拿到所有的数据
app.get("/data",(req,res)=>{
    User.find().sort({_id:-1}).then((data)=>{
      res.send(data)
    })
})

//删除数据
app.post("/remove",(req,res)=>{
  let {xue} = req.body;
  User.deleteOne({xue}).then((result)=>{
      if(result.ok){
        res.send({
          errer:1
        })
      }else{
        res.send({
          errer:0
        })
      }
  })
})

//修改数据
app.post("/updata",(req,res)=>{
  let {xue} = req.body;
  let data = req.body
  User.updateOne({xue},{$set:data}).then((result)=>{
    if(result.nModified){
      res.send({
        errer:1
      })
    }else{
      res.send({
        errer:0
      })
    }
  })
})

//查找数据
app.post("/finds",(req,res)=>{
  let{xue} = req.body
  User.find({xue}).then((data)=>{
    console.log(data.length)
    if(data.length<1){
      res.send({
        errer:0,
      })
    }else{
      res.send({
        errer:1,
        data
      })
    }
  })
})

//连接数据库
mongoose.connect("mongodb://localhost:27017/users",{useNamedReferences: true},(err)=>{
    if(err){
      console.log("连接失败")
      return
    }
  console.log("连接成功")
})

app.listen(3000)
