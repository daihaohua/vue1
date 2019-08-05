<template id="">
    <div>
      <el-main>
        <div id="input">
          <el-button
            type="primary"
            @click="addclass"
            v-loading.fullscreen.lock="fullscreenLoading">添加按钮</el-button>
        </div>
        <el-table
          :data="artecleDate"
          border>
          <el-table-column
            prop="_id"
            label="_id">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="author.username"
            label="作者">
          </el-table-column>
          <el-table-column
            prop="updatedAt"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="classId.className"
            label="所属分类">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                v-loading.fullscreen.lock="fullscreenLoading"
                @click="classUpdate(scope.$index)"></el-button>
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
        <add-artecle ref="xxx" @classDate="classDate"></add-artecle>
        <update-artecle ref="xxxx" @classDates="classDates"></update-artecle>
      </el-main>
    </div>
</template>

<script>
  import AddArtecle from "./AddArtecle"
  import updateArtecle from "./updateArtecle"
    export default {
        name: "Artecle",
      data(){
        return{
          artecleDate:[],
          input:"",
          page:1,
          maxPage:1,
          options:[],
          fullscreenLoading:false
        }
      },
      methods:{
        getData(data){
          let {artecleDate,page,maxPage,options} = data;
          this.artecleDate = artecleDate;
          this.options = options;
          this.page = page;
          this.maxPage = maxPage;
        },
        //删除数据
        userDelete(index){
          this.$alert('确定删除该评论', '提示', {
            confirmButtonText: '确定',
            callback: async action => {
              if(action === "cancel"){
                this.$message({
                  type: "info",
                  message: "取消删除",
                });
                return;
              }
              this.fullscreenLoading = true;
              let datas = {};
              let key = this.$route.path;
              datas._id = this.artecleDate[index]._id;
              datas.identification = "remove";
              datas.pages = this.page
              let {data} = await this.$axios.post("/api"+key,datas)
              let {artecleDate,page,maxPage,options,particulars,type} = data;
              this.artecleDate = artecleDate;
              this.options = options;
              this.page = page;
              this.maxPage = maxPage;
              this.fullscreenLoading = false;
              this.$message({
                type: type,
                message: particulars,
              });
            }
          });
        },
        //上一页
        async previous(){
          this.fullscreenLoading = true;
          let pages = this.page - 1
          let key = this.$route.path
          let {data} = await this.$axios.post("/api"+key,{pages})
          setTimeout(()=>{
            let {artecleDate,page,maxPage,options} = data
            this.artecleDate = artecleDate;
            this.options = options;
            this.page = page;
            this.maxPage = maxPage;
            this.fullscreenLoading = false;
          },500)
        },
        //下一页
        async next(){
          this.fullscreenLoading = true;
          let pages = this.page + 1
          let key = this.$route.path
          let {data} = await this.$axios.post("/api"+key,{pages})
          setTimeout(()=>{
            let {artecleDate,page,maxPage,options} = data;
            this.artecleDate = artecleDate;
            this.options = options;
            this.page = page;
            this.maxPage = maxPage;
            this.fullscreenLoading = false;
          },500)
        },
        //添加类名
        addclass(){
          this.fullscreenLoading = false;
          let addUpdate = {}
          addUpdate.page = this.page;
          addUpdate.operation = "文章添加"
          addUpdate.state = "add";
          addUpdate.options = this.options;
          this.$refs.xxx.headelClose(addUpdate)
        },
        //获取数据
        classDate(data){
          let {artecleDate,page,maxPage,options,particulars,type} = data.data;
          this.artecleDate = artecleDate;
          console.log(artecleDate[0].created.toLocaleString())
          this.options = options;
          this.page = page;
          this.maxPage = maxPage;
          this.fullscreenLoading = false;
          this.$message({
            message:particulars ,
            type:type
          });
        },
        //修改数据
        classUpdate(index){
          let addUpdate = this.artecleDate[index]
          addUpdate.page = this.page;
          addUpdate.options = this.options;
          this.$refs.xxxx.headelClose(addUpdate)
        },
        //修改完之后的数据
        classDates(data){
          let {artecleDate,page,maxPage,options,particulars,type} = data;
          this.artecleDate = artecleDate;
          this.options = options;
          this.page = page;
          this.maxPage = maxPage;
          this.fullscreenLoading = false;
          this.$message({
            message:particulars ,
            type:type
          });
        }
      },
      filters:{
        Date(value){
          console.log(value);
        }
      },
      components:{
        AddArtecle,
        updateArtecle
      },
      activated(){
        this.$store.commit("handelIsImg",false);
      }
    }
</script>

<style scoped>
  #input{
    width:300px;
  }
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
