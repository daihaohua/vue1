<template id="">
    <div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="列表名称" :label-width="formLabelWidth">
            <el-input v-model="name" autocomplete="off"></el-input>
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
        name: "Close",
      data() {
        return {
          dialogFormVisible: false,
          name:"",
          formLabelWidth: '120px',
          title:""
        };
      },
      methods:{
          headelClose(title){
            this.dialogFormVisible =true;
            this.title = title
          },
        handelClick(){
            this.dialogFormVisible =false;
            this.$axios.post("/api/addClass",{name:this.name}).then((data)=>{
              const {cause,type,listData}=data.data
              this.$store.commit("listClick",listData)
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
