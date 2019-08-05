<template id="">
  <div>
    <el-row :gutter="20">
      <el-col :span="18" :offset="3">
        <div class="grid-content bg-purple">
            <el-menu :default-active="activeIndex"
                     class="el-menu-demo"
                     mode="horizontal"
                     id="nav"
                      router>
              <el-menu-item index="/">返回首页</el-menu-item>
              <el-menu-item index="/admin">
                <el-submenu index="1">
                  <template slot="title">添加列表</template>
                  <el-menu-item @click="handelData">添加列表</el-menu-item>
                </el-submenu>
              </el-menu-item>
              <el-menu-item index="/admin/classify">
                <el-submenu index="2">
                  <template slot="title">展示分类</template>
                  <el-menu-item @click="handelForm">添加分类</el-menu-item>
                </el-submenu>
              </el-menu-item>
              <el-menu-item index="/admin/article">
                <el-submenu index="3">
                  <template slot="title">展示文章</template>
                  <el-menu-item @click="handelArticle">添加文章</el-menu-item>
                </el-submenu>
              </el-menu-item>
              <el-menu-item ></el-menu-item>
            </el-menu>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" id="bodys">
      <el-col :span="18" :offset="3">
        <keep-alive>
          <router-view/>
        </keep-alive>

      </el-col>
    </el-row>
    <Close ref="xx"></Close>
    <Froms ref="xxx"></Froms>
    <add-article ref="xxxx"></add-article>
  </div>

</template>

<script>
  import Close from "./Close/Close"
  import Froms from "./Close/Froms"
  import AddArticle from "./Close/AddArticle"
    export default {
        name: "Admin",
        data() {
          return {
            activeIndex: '1',
            activeIndex2: '1',
            input:"",
            tableData:"",
            page:0
          };
        },
        methods: {
          onSubmit() {
            console.log('submit!');
          },
          handelData(){
              this.$refs.xx.headelClose("添加列表")
          },
          handelForm(){
            this.$refs.xxx.headelClose()
          },
          handelArticle(){
            this.$refs.xxxx.headelClose()
          }
        },
      async activated(){//向后台请求数据
        let data = await this.$axios.get("/api/listData")
        let {tableData,topicDate,articleDate} = data.data;
        this.$store.commit("listClick",tableData)
        this.$store.commit("topicClick",topicDate)
        this.$store.commit("articleClick",articleDate)
      },
      components:{
        Froms,
        Close,
        AddArticle
      }
    }
</script>

<style>
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

  #nav{
    border:1px solid #ccc;
    background-color: #ccc;
    border-radius: 5px;
  }
</style>
