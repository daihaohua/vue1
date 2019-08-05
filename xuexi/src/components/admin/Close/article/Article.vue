<template id="">
  <div class="grid-content bg-purple">
    <el-table
      :data="articleDate"
      border>
      <el-table-column
        prop="_id"
        label="_id">
      </el-table-column>
      <el-table-column
        prop="topic"
        label="所属">
      </el-table-column>
      <el-table-column
        prop="article"
        label="标题">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="handelUpdate(scope.$index)" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="handelRemove(scope.$index)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20" id="page">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-button-group>
            <el-button type="primary" icon="el-icon-arrow-left" @click="pageClickLeft">上一页</el-button>
          </el-button-group>
        </div>
      </el-col>
      <el-col :span="8" :offset="7">
        <div class="grid-content bg-purple">
          {{this.page+1}}/{{this.pages}}
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-button-group>
            <el-button type="primary" id="button" @click="pageClickRight">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>
    <update-article ref="xx"></update-article>
  </div>
</template>

<script>
  import UpdateArticle from "./UpdateArticle";
  export default {
    name: "Article",

    data(){
      return{
        articleDate:[],
        page:0,
        pages:0
      }
    },
    activated(){//向后台请求数据
      //console.log(this.$store.state)
      let con = {zData:"articleDate",dDates:"articleDates"};
      con.page = this.page
      this.$store.commit("pageClickLeft",con)
      this.articleDate = this.$store.state.articleDates
    },
    //通过监听事件来监测仓库的变化
    computed:{
      a(){
        return this.$store.state.articleDate
      },
      c(){
        return this.$store.state.articleDates
      }
    },
    watch:{
      a(data){
        let con = {zData:"articleDate",dDates:"articleDates"};
        con.page = this.page
        this.$store.commit("pageClickRigh",con)
      },
      c(data){
        this.articleDate = this.$store.state.articleDates;
        let {pageOne,pagess} = this.$store.state
        this.page = pageOne;
        this.pages = pagess;
      }
    },
    methods:{
      handelRemove(index){
        let _id = this.$store.state.articleDates[index]._id
        this.$axios.post("/api/removeArticle",{_id}).then((data)=>{
          console.log(data.data.data)
          let articleDate = data.data.data
          this.$store.commit("articleClick",articleDate)
          this.$message({
            message: "删除成功",
            type:"success"
          });
        })
      },
      handelUpdate(index){
        this.$refs.xx.headelClose("类名修改",index)
      },
      pageClickRight(){
        this.page = this.page +1
        let con = {zData:"articleDate",dDates:"articleDates"};
        con.page = this.page
        console.log(con)
        this.$store.commit("pageClickRigh",con)
      },
      pageClickLeft(){
        this.page = this.page -1
        let con = {zData:"articleDate",dDates:"articleDates"};
        con.page = this.page
        this.$store.commit("pageClickLeft",con)
      }
    },
    components:{
      UpdateArticle
    }
  }
</script>

<style scoped>
  #button{
    margin-left: 115px;
  }
  #page{
    margin-top:20px;
  }
</style>
