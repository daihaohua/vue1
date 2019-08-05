<template id="">
    <div id="form">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="ruleForm.name" autocomplete="off" ></el-input >
        </el-form-item>
        <el-form-item label="学号" prop="xue">
          <el-input type="text" v-model="ruleForm.xue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="语文" prop="yuwen">
        <el-input v-model="ruleForm.yuwen"></el-input>
      </el-form-item>
        <el-form-item label="英语" prop="yinyu">
          <el-input v-model="ruleForm.yinyu"></el-input>
        </el-form-item>
        <el-form-item label="数学" prop="shuxue">
          <el-input v-model="ruleForm.shuxue"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="">
              <el-input v-model="user" placeholder="通过学号查找"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form>
      <Exhibition ref="Exhibitions" :griddata="finddata"></Exhibition>
    </div>
</template>

<script>
    import Exhibition from "./Exhibition"
    export default {
        name: "Header",
      data() {
        return {
          user: '',
          finddata:"",
          ruleForm: {
            name: '',
            xue: '',
            yuwen: '',
            yinyu: '',
            shuxue: '',
          },
          rules: {
            name: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
            ],
            xue: [
              { required: true, message: '请输入学号', trigger: 'blur' },
              { min: 11, max: 13, message: '学号输入不正确', trigger: 'blur' }
            ],
            yuwen: [
              { required: true, message: '请输入语文成绩', trigger: 'blur' },
              { min: 1, max: 3, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            yinyu: [
              { required: true, message: '请输入英文成绩', trigger: 'blur' },
              { min: 1, max: 3, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            shuxue: [
              { required: true, message: '请输入数学成绩', trigger: 'blur' },
              { min: 1, max: 3, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                  this.$axios.post("/api/login",this.ruleForm).then((res)=>{
                    let errer = res.data.errer
                    if(errer){//返回1知道到了，但是没有保存成功
                      this.$message({
                        showClose: true,
                        message: '已存在该用户，无法保存',
                        type: 'error'
                      });
                      this.ruleForm.name = "";
                      this.ruleForm.xue = "";
                      this.ruleForm.yuwen = "";
                      this.ruleForm.yinyu = "";
                      this.ruleForm.shuxue = "";

                    }else{//返回o没有找到，但是保存成功
                      this.$message({
                        message: '输入成功',
                        type: 'success'
                      });
                      this.$emit("Click")
                      this.ruleForm.name = "";
                      this.ruleForm.xue = "";
                      this.ruleForm.yuwen = "";
                      this.ruleForm.yinyu = "";
                      this.ruleForm.shuxue = "";
                    }
                  })

            } else {
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        onSubmit() {
         let _this=this
             this.$axios.post("/api/finds",{xue:this.user}).then((finddata)=>{
               if(!finddata.data.errer){
                 this.$message({
                   showClose: true,
                   message: '没找到该用户',
                   type: 'error'
                 });
                 return;
               }

              this.finddata = finddata.data.data
               _this.$refs.Exhibitions.handelClick()
          })

          this.user=""
        }
      },
      components:{
        Exhibition
      }
    }
</script>

<style scoped>
  #form{
    width:1100px;
    height:500px;
    margin:auto;
  }
  .demo-form-inline{
    float:right;
    widht:600px;
  }
</style>
