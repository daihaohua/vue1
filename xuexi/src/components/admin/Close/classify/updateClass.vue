<template id="">
  <div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="列表名称" :label-width="formLabelWidth">
          <el-input v-model="topic" autocomplete="off"></el-input>
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
    name: "UpdateClass",
    data() {
      return {
        dialogFormVisible: false,
        topic:"",
        formLabelWidth: '120px',
        title:"",
        updateClass:{},
      };
    },
    methods:{
      headelClose(title,index){
        this.dialogFormVisible =true;
        this.title = title
        this.updateClass = this.$store.state.topicDates[index]
        let {topic} = this.$store.state.topicDates[index]
        this.topic = topic

      },
      handelClick(){
        this.dialogFormVisible =false;
        let {_id} = this.updateClass
        let topic=this.topic
        console.log(_id,topic)
        this.$axios.post("/api/topicClasss",{_id,topic}).then((data)=>{
          const {cause,type,state,topicDate}=data.data
          if(state) {
            this.$store.commit("topicClick",topicDate)
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
