<template id="">
  <div>
    <el-dialog operation="文章添加" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="文章分类" :label-width="formLabelWidth">
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.className"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
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
    name: "AddArtecle",
    data() {
      return {
        dialogFormVisible: false,
        className:"",
        formLabelWidth: '120px',
        page:1,
        operation:"",
        value:"",
        title:"",
        brief:"",
        content:"",
        state:"",
        options: [],
      };
    },
    methods: {
      headelClose(addUpdate){
        let {page,operation,state,options} = addUpdate
        this.dialogFormVisible =true;
        this.page = page;
        this.options = options;
        this.operation = operation;
        this.state = state;
        console.log(this.operation)
      },
      async handelClick(){
        //文章分类的id值
        this.dialogFormVisible =false;
        let key = this.$route.path
        let artecle = {}
        artecle.pages = this.page
        artecle.classId = this.value;
        artecle.title  = this.title;
        artecle.brief = this.brief;
        artecle.content = this.content;
        console.log(artecle);

        let data = {}
        if(this.state === "add") {
           artecle.identification = "add"
           data = await this.$axios.post("/api" + key,artecle )
        }else{
            artecle.identification = "update"
          data = await this.$axios.post("/api" + key, artecle)
        }
        console.log(data.data)
        this.$emit("classDate",data)
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
