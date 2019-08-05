<template id="navLeft">
    <div>
      <el-row :gutter="20">
        <el-col :span="6" :offset="3"><div class="grid-content bg-purple">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="cornflowerblue"
            id="nav-left"
            router>
            <el-submenu
              v-for="(item,index) in topic"
              :index="index|indexs"
              :key="index"
              @click="handelClicks(index)">
              <template slot="title">
                <i class="el-icon-position"></i>
                <span>{{item.topic}}</span>
              </template>
            </el-submenu>
          </el-menu>
        </div></el-col>
        <el-col :span="12" id="nav-right">
          <div class="grid-content bg-purple">
            <el-card class="box-card"  v-for="(item,index) in article" :key="index">
              <div slot="header" class="clearfix">
                <span>{{item.article}}</span>
              </div>
              <div class="text item">
               {{item.articleContent}}
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "NavLeft",
        data(){
          return{
            topic:[],
            activeName: '1',
            article:[]
          }
        },
        methods: {
          handleOpen(key) {
            let index = +key;
            this.article = this.topic[index].info;
          },
          handleClose(key, keyPath) {
            let index = +key;
            this.article = this.topic[index].info;
          },
          async topicss(){
          }
        },
        watch:{
          "$route":"topicss",
          a(){
            this.topic = this.$store.state.getListData
          }
        },
      computed:{
          a(){
            return this.$store.state.getListData
          },
        },
      filters:{
            indexs(index){
              return index +"";
            }
      },
      activated(){
          this.$router.push("/")
      }
    }
</script>

<style scoped>
  #nav-left{
    height:500px;
  }
  #nav-right{
    width:756px;
    height:500px;
    background:rgb(84, 92, 100);
    overflow-y: auto;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-bottom:10px;
  }
</style>
