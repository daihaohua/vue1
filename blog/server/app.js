const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const app = express();

app.use(cookieParser())

app.use(bodyParser.urlencoded({
  extended:true
}))
app.use(bodyParser.json())
//前台数据

//判断cookie
app.use((req,res,next)=>{
 if(req.cookies.userInfo){//如果有cookie，说明你等入了
   req.userInfo = JSON.parse(req.cookies.userInfo);
 }else{
   req.userInfo = {username:''};
 }
  next();
})
//注册
app.use("/mian",require("./routers/mian"))

//后台数据
app.use("/admin",require("./routers/admin"))

app.listen(3000)
