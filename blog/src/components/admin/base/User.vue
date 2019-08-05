<template id="">
    <div>
      <el-main>
        <el-table
          :data="userDate"
          border>
          <el-table-column
            prop="_id"
            label="_id">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
            label="是否管理员">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-check" circle v-if="userDate[scope.$index].isAdmin"></el-button>
              <el-button type="danger" icon="el-icon-close" circle v-if="!userDate[scope.$index].isAdmin"></el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <!--<el-button type="primary" icon="el-icon-edit" circle></el-button>-->
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                v-loading.fullscreen.lock="fullscreenLoading"
                @click="userDelete(scope.$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
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
      </el-main>
    </div>
</template>

<script>
    export default {
        name: "User",
        data(){
          return{
            userDate:[],
            page:1,
            maxPage:1,
            fullscreenLoading:false
          }
        },
        methods:{
          getData(data){
            let {userDate,page,maxPage} = data
            this.userDate = userDate;
            this.page = page;
            this.maxPage = maxPage;
          },
          //分页上一页
          async previous(){
            this.fullscreenLoading = true;
            let pagee = this.page - 1
            let key = this.$route.path
            let {data} = await this.$axios.post("/api"+key,{pages:pagee})
            setTimeout(()=>{
              let {userDate,page,maxPage} = data
              this.userDate = userDate;
              this.page = page;
              this.maxPage = maxPage;
              this.fullscreenLoading = false;
            },500)
          },
          //分页下一页
         async next(){
           this.fullscreenLoading = true;
            let pagee = this.page + 1
            let key = this.$route.path
            let {data} = await this.$axios.post("/api"+key,{pages:pagee})
           setTimeout(()=>{
             let {userDate,page,maxPage} = data
             this.userDate = userDate;
             this.page = page;
             this.maxPage = maxPage;
             this.fullscreenLoading = false;
           },500)
          },
          //删除操作
          async userDelete(index){
            this.fullscreenLoading = true;
            let key = this.$route.path;
            let _id = this.userDate[index]._id
            let {data} = await this.$axios.post("/api"+key,{pages:this.page,_id})
            setTimeout(()=>{
              let {userDate,page,maxPage} = data
              this.userDate = userDate;
              this.page = page;
              this.maxPage = maxPage;
              this.fullscreenLoading = false;
            },500)
          }
        },
        activated(){
          this.$store.commit("handelIsImg",false);
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
</style>
