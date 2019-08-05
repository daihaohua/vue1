<template id="">
  <div>
    <el-dialog :title="title | titlee" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item :label="label" :label-width="formLabelWidth">
          <el-input v-model="className" autocomplete="off"></el-input>
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
        name: "AddClass",
      data() {
        return {
          dialogFormVisible: false,
          className:"",
          formLabelWidth: '120px',
          page:1,
          title:"",
          label:'',
          state:""
        };
      },
      methods: {
        headelClose(addUpdate){
          let {page,title,label,state} = addUpdate
          this.dialogFormVisible =true;
          this.page = page;
          this.title = title;
          this.label = label;
          this.state = state;
        },
        async handelClick(){
          this.dialogFormVisible =false;
          let pages = this.page
          let key = this.$route.path
          let className = this.className;
          let old = this.title;
          let modified = this.className;
          let data = {}
          if(this.state === "add") {
              data = await this.$axios.post("/api" + key, {pages, className})
          }else{
              data = await this.$axios.post("/api" + key, {pages,old,modified})
          }
          console.log(data.data)
          this.$emit("classDate",data)
          this.className = "";
        }
      },
      filters:{
        titlee(title){
          return "操作---"+title;
        }
      }

    }
</script>

<style scoped>
  h2{
    text-align: center;
  }
  #addClass{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom: 0;
    margin:auto;
    border-radius: 7px;
    border: 1px solid #ccc;
    box-shadow: 0 0 80px #ccc;
    padding:20px;
    width:600px;
    height:270px;

  }
</style>
