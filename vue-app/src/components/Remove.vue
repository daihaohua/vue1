<template id="">
  <el-dialog :title="fromdata.name" :visible.sync="dialogFormVisible">
    <el-form :model="fromdata">
      <el-form-item label="语文成绩" :label-width="formLabelWidth">
        <el-input v-model="fromdata.yuwen" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="数学成绩" :label-width="formLabelWidth">
        <el-input v-model="fromdata.shuxue" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="英语成绩" :label-width="formLabelWidth">
        <el-input v-model="fromdata.yinyu" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisiblee(0)">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisiblee(1)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
      name: "Remove",
      props:["fromdata"],
      data() {
        return {
          dialogFormVisible: false,
          formLabelWidth: '120px'
        };
      },
      methods:{
        dialogFormVisiblee(index){
          this.$emit("updata",index,this.fromdata)
          this.dialogFormVisible = false;
        },
        handelClicks(){
          this.dialogFormVisible = true
        }
      }
    }
</script>

<style scoped>

</style>
