<template id="">
  <div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="文章名称" :label-width="formLabelWidth">
          <el-input v-model="article" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "UpdateArticle",
    data() {
      return {
        dialogFormVisible: false,
        article:"",
        formLabelWidth: '120px',
        title:"",
        updateArticle:{},
      };
    },
    methods:{
      headelClose(title,index){
        this.dialogFormVisible =true;
        this.title = title
        this.updateArticle = this.$store.state.articleDates[index]
        let {article} = this.$store.state.articleDates[index]
        this.article = article

      },
      handelClick(){
        this.dialogFormVisible =false;
        let {_id} = this.updateArticle
        let article=this.article
        console.log(_id,article)
        this.$axios.post("/api/updateArticle",{_id,article}).then((data)=>{
          const {cause,type,state,articleDate}=data.data
          if(state) {
            this.$store.commit("articleClick",articleDate)
          }
          this.$message({
            message: cause,
            type
          });
        })
        this.name = "";
      },
    }
  }
</script>

<style scoped>

</style>
