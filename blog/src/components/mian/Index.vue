<template id="index">
  <div>
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="18">
            <div class="grid-content bg-purple header">
              <el-menu :default-active="activeIndex2"
                       class="el-menu-demo"
                       mode="horizontal"
                       @select="handleSelect"
                       background-color="#545c64"
                       text-color="#fff"
                       active-text-color="#ffd04b"
                        router>
                <el-menu-item
                  index="/mian/classify/all"
                  @click="handelClickClassify"
                >首页</el-menu-item>
                <el-menu-item
                  v-for="(item,index) in indexDate"
                  :index="item._id| filt"
                  :key="index"
                  @click="handelClickClassify">{{item.className}}</el-menu-item>
              </el-menu>

            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple header">
              <el-menu :default-active="activeIndex2"
                       class="el-menu-demo"
                       mode="horizontal"
                       @select="handleSelect"
                       background-color="#545c64"
                       text-color="#fff"
                       active-text-color="#ffd04b"
                        router>
                <el-submenu index="2" v-show="this.$store.state.userInfo.username">
                  <template slot="title">{{this.$store.state.userInfo.username}}</template>
                  <el-menu-item @click="quit" v-loading.fullscreen.lock="fullscreenLoading">退出</el-menu-item>
                </el-submenu>
                  <el-menu-item index="/index/login" v-show="!this.$store.state.userInfo.username">登录</el-menu-item>
                  <el-menu-item index="/index/reg" v-show="!this.$store.state.userInfo.username">注册</el-menu-item>
                 <el-menu-item index="/admin" v-show="this.$store.state.userInfo.isAdmin">个人中心</el-menu-item>
              </el-menu>
            </div>
          </el-col>
       </el-row>
      </el-header>
      <el-main>
        <div class="main-left">
          <keep-alive>
              <router-view ref="xxx" v-loading="loading"/>
          </keep-alive>

        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
          return {
            activeIndex: '1',
            activeIndex2: '1',
            indexDate:[],
            fullscreenLoading:false,
            loading:true,
          };
        },
        methods: {
          handleSelect(){
          },
          //退出操作
          async quit(){
            this.fullscreenLoading = true;
            let {data} = await this.$axios.get("/api/mian/loginCookie")
            setTimeout(()=>{
              this.fullscreenLoading = false;
              location.reload()
            },2000)
          },
          handelClickClassify(){
            this.loading=true;

            setTimeout(()=>{
              this.loading=false;
              this.$refs.xxx.getDate();
            },500)

          },
        },
        async activated(){
            let {data} = await this.$axios.get("/api/mian/index")
            this.indexDate = data.data;
            this.$store.commit("loginDate",data.userInfo)
          this.loading=false;
        },
      filters:{
        filt(value){
           return "/mian/classify/" + value
         }
      }
      }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .main-left{
    width:74.5%;
  }
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
