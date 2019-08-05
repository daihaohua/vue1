<template id="mian">
      <div>
        <el-row :gutter="20">
          <el-col :span="18" :offset="3"><div class="grid-content bg-purple">
            <el-menu
              router
              :default-active="activeIndex2"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              >
              <el-menu-item index="/">首页</el-menu-item>
              <el-menu-item
                :index="item.name | filter"
                :key="index"
                v-for="(item,index) in listData"
                @click="listDataClick"
              >{{item.name}}</el-menu-item>
              <el-menu-item id="right" index="/admin">后台处理</el-menu-item>
            </el-menu>
          </div></el-col>
        </el-row>
        <router-view/>
        <el-row :gutter="20" v-show="isShow">
          <el-col :span="18" :offset="3"><div class="grid-content bg-purple">
            <template >
              <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3><img src="../../assets/images/4.jpg"/></h3>
                </el-carousel-item>
              </el-carousel>
            </template>
          </div>
          </el-col>
        </el-row>
      </div>
</template>

<script>
    export default {
        name: "Mian",
        data() {
          return {
            activeIndex: '1',
            activeIndex2: '1',
            listData:[],
            isShow:true
          };
        },
        filters:{
          filter(name){
            return "/mian/"+name
          }
        },
      computed:{
          d(){
            return this.$store.state.listData
          }
        },
        methods: {
          handleSelect(key, keyPath) {
            //console.log(key, keyPath);
          },
          async listDataClick(){
            if(this.$route.params.id){
              let name = this.$route.params.id;
              let {data} = await this.$axios.post("/api/getListDates",{name});
              this.$store.commit("getListData",data.topicDate)
            }
          }
        },
      async activated(){
        let data = await this.$axios.get("/api/listData")
        let {tableData,topicDate,articleDate} = data.data;
        if(this.$route.params.id){
          let name = this.$route.params.id;
          let {data} = await this.$axios.post("/api/getListDates",{name});
          this.$store.commit("getListData",data.topicDate)
        }
        this.$store.commit("listClick",tableData)
        this.$store.commit("topicClick",topicDate)
        this.$store.commit("articleClick",articleDate)
      },
      watch:{
          d(data){
            this.listData = data
        },
        $route:{
            handler(a,b){
              this.isShow = a.path !== "/"?false:true;
              console.log(this.isShow)
            }
        }
      }
    }
</script>

<style scoped>
  #right{
    float:right;
  }
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
  #body{
    width:700px;
    height:500px;
    background-color:#ccc;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
