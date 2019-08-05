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
    name: "Update",
    data() {
      return {
        dialogFormVisible: false,
        name:"",
        formLabelWidth: '120px',
        title:"",
        update:{},
        index:0
      };
    },
    methods:{
      headelClose(title,index){
        this.dialogFormVisible =true;
        this.title = title
        this.update = this.$store.state.listDates[index]
        let {name} = this.$store.state.listDates[index]
        this.name = name

      },
      handelClick(){
        this.dialogFormVisible =false;
        let {_id} = this.update
        let name=this.name
        this.$axios.post("/api/updateClass",{_id,name}).then((data)=>{
          const {cause,type,state,listDate}=data.data
          if(state) {
            this.$store.commit("listClick",listDate)
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
