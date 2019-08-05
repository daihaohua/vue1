<template id="">

    <div>
      <div v-show="!indexDate.length">
        <p>当前还没有数据，请先添加</p>
      </div>
      <div v-show="indexDate.length">
        <router-link
          v-for="(item,index) in indexDate"
          :key="index"
          :to="{name:'details',params:{id:item._id}}"
          tag="div"
          class="body-content">
          <div class="body-content-img">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </div>
          <div class="body-contents">
            <span>作者:{{item.author.username}}</span><span id="data">时间为：{{item.updatedAt.toString()}}</span>
            <p>
              标题：{{item.title}}
            </p>
            <p>
              简介：{{item.brief}}
            </p>
          </div>
        </router-link>
        <div id="pages">
          <el-button
            type="primary"
            icon="el-icon-arrow-left"
            id="button-left"
            @click="previous"
            v-loading.fullscreen.lock="fullscreenLoading"
            :disabled="page===1?true:false">上一页</el-button>
          <span>{{page}}/{{maxPage}}</span>
          <el-button
            type="primary"
            id="button-right"
            @click="next"
            v-loading.fullscreen.lock="fullscreenLoading"
            :disabled="page===maxPage?true:false">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ClassIfy",
      data(){
          return{
            page:1,
            maxPage:1,
            indexDate:[],
            fullscreenLoading:false
          }
      },
      methods:{
          async getDate(){
            let key = this.$route.path;
            let {data} = await this.$axios.get("/api"+key+"?pages=0");
            this.page = data.page;
            this.maxPage = data.maxPage;
            this.indexDate = data.indexDate;
            console.log(data);
          },
          //上一页
          async previous(){
            this.fullscreenLoading = true;
            let pages = this.page - 1
            let key = this.$route.path
            let {data} = await this.$axios.get("/api"+key+"?pages="+pages)
            setTimeout(()=>{
              this.page = data.page;
              this.maxPage = data.maxPage;
              this.indexDate = data.indexDate;
              this.fullscreenLoading = false;
            },500)
          },
          //下一页
          async next(){
            this.fullscreenLoading = true;
            let pages = this.page + 1
            let key = this.$route.path
            let {data} = await this.$axios.get("/api"+key+"?pages="+pages)
            setTimeout(()=>{
              this.page = data.page;
              this.maxPage = data.maxPage;
              this.indexDate = data.indexDate;
              this.fullscreenLoading = false;
            },500)
          },
      },
      async activated(){
        let key = this.$route.path;
        let {data} = await this.$axios.get("/api"+key+"?pages=0");
        this.page = data.page;
        this.maxPage = data.maxPage;
        this.indexDate = data.indexDate;
      }

    }
</script>

<style scoped>
  #button-left,#button-right{
    float:left;
    margin-top:20px;
  }
  #button-right{
    float:right;
  }
  #pages{
    line-height:70px;
    text-align:center;
    font-size: 20px;
  }
  .body-content{
    display: flex;
    background-color: #fff;
    border-radius: 2px;
    margin-bottom: 5px;
    padding:10px;
    border: 1px solid #ccc;
    cursor: pointer;
    transition:0.5s;
  }
  .body-content:hover{
    box-shadow: 0 0 50px #ccc;
    transform:scale(1.01);
  }
  .body-content-img{
    height:40px;
    margin-top:5px;
  }

  .body-contents>p{
    padding:10px 0px;
    margin: 0px;
  }
  #data{
    margin-left:30px;
  }

</style>
