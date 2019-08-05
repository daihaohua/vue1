<template id="">
  <div>
    <el-container>
      <el-header>
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="grid-content bg-purple header">
              <el-menu :default-active="activeIndex2"
                       class="el-menu-demo"
                       mode="horizontal"
                       @select="handleSelect"
                       background-color="#545c64"
                       text-color="#fff"
                       active-text-color="#ffd04b"
                       router>
                <el-menu-item index="/">返回首页</el-menu-item>
                <el-submenu index="2">
                  <template slot="title">用户管理</template>
                  <el-menu-item
                    index="/admin/user"
                    v-loading.fullscreen.lock="fullscreenLoading">展示用户</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">分类管理</template>
                  <el-menu-item
                    index="/admin/classification"
                    v-loading.fullscreen.lock="fullscreenLoading">展示分类</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">文章管理</template>
                  <el-menu-item
                    index="/admin/artecle"
                    v-loading.fullscreen.lock="fullscreenLoading">展示文章</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <keep-alive>
         <router-view ref="xxx"/>
      </keep-alive>
      <ad-index v-show="isImgs"></ad-index>
    </el-container>
  </div>
</template>

<script>
  import AdIndex from "./base/AdIndex"
    export default {
        name: "Admin",
        data() {
          return {
            isImgs:this.$store.state.isImgs,
            activeIndex2: '1',
            fullscreenLoading:false
          };
        },
        methods: {
          async handleSelect(key) {
            this.isImgs = false;
            if(key === "/"){
              return
            }
            this.fullscreenLoading = true;
            // console.log(key);
            let {data} = await this.$axios.post("/api"+key,{pages:0})
              setTimeout(()=>{
                this.$refs.xxx.getData(data)
                this.fullscreenLoading = false;
              },500)
          }
        },
        async activated(){
          this.isImgs = true;
          let key = this.$route.path;

          let {data} = await  this.$axios.get("/api/admin/index")
          if(key !== "/admin"){
            let datas = await this.$axios.post("/api"+key,{pages:0})
            this.$refs.xxx.getData(datas.data)
          }
          //如果不是管理员
            if(!data.isAdmin){
              this.$router.push("/prevent")
              return ;
            }

          this.$store.commit("loginDate",data)
        },
        components:{
          AdIndex
        },
        computed:{
          a(){
            return this.$store.state.isImgs;
          }
        },
        watch:{
          a(value){
            this.isImgs = value;
          }
        }
    }
</script>

<style scoped>

</style>
