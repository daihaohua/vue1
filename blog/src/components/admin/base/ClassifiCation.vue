<template id="">
    <el-main>
      <div id="input">
        <el-button
          type="primary"
          @click="addclass"
          v-loading.fullscreen.lock="fullscreenLoading">添加按钮</el-button>
      </div>
      <el-table
        :data="classify"
        border>
        <el-table-column
          prop="_id"
          label="_id">
        </el-table-column>
        <el-table-column
          prop="className"
          label="分类名">
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
      <add-class ref="xxx" @classDate="classDate"></add-class>
    </el-main>
</template>

<script>
  import AddClass from "./AddClass"
    export default {
        name: "ClassifiCation",
        data(){
          return{
            classify:[],
            input:"",
            page:1,
            maxPage:1,
            fullscreenLoading:false
          }
        },
        methods:{
          getData(data){
            let {classDate,page,maxPage} = data
            this.classify = classDate;
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
                  let key = this.$route.path;
                  let _id = this.classify[index]._id;
                  let {data} = await this.$axios.post("/api"+key,{pages:this.page,_id})
                  let {type,particulars,maxPage,page,classDate} = data
                  this.classify = classDate;
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
            let pagee = this.page - 1
            let key = this.$route.path
            let {data} = await this.$axios.post("/api"+key,{pages:pagee})
            setTimeout(()=>{
              let {classDate,page,maxPage} = data
              this.classify = classDate;
              this.page = page;
              this.maxPage = maxPage;
              this.fullscreenLoading = false;
            },500)
          },
          //下一页
          async next(){
            this.fullscreenLoading = true;
            let pagee = this.page + 1
            let key = this.$route.path
            let {data} = await this.$axios.post("/api"+key,{pages:pagee})
            setTimeout(()=>{
              let {classDate,page,maxPage} = data
              this.classify = classDate;
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
            addUpdate.title = "分类添加"
            addUpdate.label = "分类名称"
            addUpdate.state = "add"
            this.$refs.xxx.headelClose(addUpdate)
          },
          //获取数据
          classDate(data){
            let {particulars,type,page,maxPage,classDate} = data.data;
            this.classify = classDate;
            this.page = page;
            this.maxPage = maxPage
            this.fullscreenLoading = false;
            this.$message({
              message:particulars ,
              type:type
            });
          },
          //修改数据
          classUpdate(index){
            // this.fullscreenLoading = true;
            let addUpdate = {}
            addUpdate.page = this.page;
            addUpdate.title = this.classify[index].className;
            addUpdate.label = "修改名称";
            addUpdate.state = "update";
            this.$refs.xxx.headelClose(addUpdate)
          }
        },
        components:{
          AddClass
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
