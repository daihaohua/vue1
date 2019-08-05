<template id="">
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleColses">
      <span>你确定删除该人员</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleColse(0)">取 消</el-button>
    <el-button type="primary" @click="handleColse(1)">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "Close",
      props:["dialogVisible"],
      methods:{
        handleColse(remove){
          this.$emit("Closes",remove)
        },
        handleColses(){

          this.$emit("Closess")
        },

      }
    }
</script>

<style scoped>

</style>
