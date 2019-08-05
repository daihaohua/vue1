const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  xue: String,
  yuwen: String,
  yinyu: String,
  shuxue: String,
  time:{
    type:String,
    default:new Date()},

})

module.exports = mongoose.model("users",userSchema)
