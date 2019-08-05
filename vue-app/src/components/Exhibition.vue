<template id="">
  <el-dialog title="查找人员" :visible.sync="dialogTableVisible">
    <el-table :data="griddata">
      <el-table-column property="name" label="姓名"></el-table-column>
      <el-table-column property="xue" label="学号"></el-table-column>
      <el-table-column property="yuwen" label="语文"></el-table-column>
      <el-table-column property="yinyu" label="英语"></el-table-column>
      <el-table-column property="shuxue" label="数学"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
    export default {
        name: "Exhibition",
      props:["griddata"],
      data() {
        return {
          dialogTableVisible: false,
          formLabelWidth: '120px'
        }
      },
      methods:{
          handelClick(){
            this.dialogTableVisible = !this.dialogTableVisible
          }
      }
    }
</script>

<style scoped>

</style>
