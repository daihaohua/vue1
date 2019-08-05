<template id="">
    <div id="login">
      <el-button
        type="info"
        icon="el-icon-arrow-left"
        circle
      @click="retreat"></el-button>
      <h2>欢迎来到登入界面</h2>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
      <el-button type="primary"
                 @click="submitForm('ruleForm')"
                 v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
      <el-button
        v-loading.fullscreen.lock="fullscreenLoading"
        @click="resetForm('ruleForm')"
      >取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
    export default {
        name: "Login",
      data() {
        return {
          ruleForm: {
            username: '',
            password: ''
          },
          fullscreenLoading:false,
          rules: {
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 5, max: 25, message: '长度在 5 到 25个字符', trigger: 'blur' }
            ],
            username: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 1, max: 7, message: '长度在 1 到 7个字符', trigger: 'blur' }
            ],
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate(async (valid) => {
            if (!valid) {
              return false;
            }
            //登入组件
            this.fullscreenLoading = true;
           let {data} =  await this.$axios.post("/api/mian/login",this.ruleForm)
            this.fullscreenLoading = false;
           console.log(data)
            this.$message({
              message: data.particulars,
              type: data.type
            });
            if(data.errer){//是0保存失败 是1保存成功
              setTimeout(async ()=>{
                let {data} =  await this.$axios.post("/api/mian/login",this.ruleForm)
                let userInfo = data.userInfo
                this.$store.commit("loginDate",userInfo)
                this.$router.push("/")
              },1000)
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
          this.fullscreenLoading = true;
          setTimeout(()=>{
            this.fullscreenLoading = false;
            this.$router.push("/")
          },500)
        },
        retreat(){
          this.$router.go(-1)
        }
      }
    }

</script>

<style scoped>
  h2{
    text-align: center;
    margin-top: 0;
  }
#login{
  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom: 0;
  margin:auto;
  border-radius: 7px;
  border: 1px solid #ccc;
  box-shadow: 0 0 80px #ccc;
  padding:20px;
  width:600px;
  height:270px;

}
</style>
