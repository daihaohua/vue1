<template id="">
  <div>
    <el-dialog title="添加文章" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="所属分类" :label-width="formLabelWidth">
          <el-select v-model="theirClass" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.topic"
              :value="item.topic">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章名" :label-width="formLabelWidth">
          <el-input v-model="article" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="articleContent">
            </el-input>
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
    name: "AddArticle",
    data() {
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        options: [],
        article:"",
        theirClass: '',
        articleContent:""
      };
    },
    methods:{
      headelClose(){
        this.dialogFormVisible =true;
      },
      handelClick(){
        let topic = this.theirClass;
        let article = this.article;
        let articleContent = this.articleContent;
        this.dialogFormVisible =false;
        this.$axios.post("/api/article",{topic,article,articleContent}).then((data)=>{
          const {cause,type,articleDate}=data.data
          console.log(cause,type,articleDate)
          if(articleDate){
            this.$store.commit("articleClick",articleDate)
          }
          this.$message({
            message: cause,
            type
          });

        })
          this.article="";
          this.articleContent="";
      }
    },
    computed:{
      c(){
        return this.$store.state.topicDate
      }
    },
    watch:{
      c(data){
        this.options = data
      }
    }
  }
</script>

<style scoped>

</style>
