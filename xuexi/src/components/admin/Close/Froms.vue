<template id="">
  <div>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="所属列表" :label-width="formLabelWidth">
        <el-select v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
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
    name: "Close",
    data() {
      return {
        dialogFormVisible: false,
        topic:"",
        formLabelWidth: '120px',
        options: [],
        value: ''
      };
    },
    methods:{
      headelClose(){
        this.dialogFormVisible =true;
      },
      handelClick(){
        let name = this.value;
        let topic = this.topic
        this.dialogFormVisible =false;
        this.$axios.post("/api/topic",{name,topic}).then((data)=>{
          const {cause,type,listData}=data.data
          this.$store.commit("topicClick",listData)
          this.$message({
            message: cause,
            type
          });
        })
        this.name = "";
      }
    },
    computed:{
      c(){
        return this.$store.state.listData
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
