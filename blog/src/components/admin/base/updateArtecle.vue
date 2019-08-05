<template id="">
  <div>
    <el-dialog title="文章修改" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="文章标题" :label-width="formLabelWidth">
          <el-input v-model="title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章简介" :label-width="formLabelWidth">
          <el-input v-model="brief" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="content">
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
        name: "updateArtecle",
      data() {
        return {
          dialogFormVisible: false,
          className:"",
          formLabelWidth: '120px',
          page:1,
          value:"",
          title:"",
          brief:"",
          content:"",
          state:"",
          options: [],
          _id:""
        };
      },
      methods: {
        headelClose(addUpdate){
          let {page,content,title,options,brief,_id} = addUpdate
          this.dialogFormVisible =true;
          this.page = page;
          this.options = options;
          this.content = content;
          this.title = title;
          this.brief = brief;
          this._id = _id
        },
        async handelClick(){
          //文章分类的id值
          this.dialogFormVisible =false;
          let key = this.$route.path
          let artecle = {}
          artecle._id = this._id
          artecle.pages = this.page
          artecle.classId = this.value;
          artecle.title  = this.title;
          artecle.brief = this.brief;
          artecle.content = this.content;
          artecle.identification = "update"
          let {data} = await this.$axios.post("/api" + key, artecle)
          console.log(data)
          this.$emit("classDates",data)
          // this.className = "";
        }
      },
      filters:{
        titlee(title){
          return "文章操作---"+title;
        }
      }
    }
</script>

<style scoped>

</style>
