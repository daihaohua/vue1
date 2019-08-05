<template >
    <div id="content">
      <el-table
        :data="tableData"
        border
        style="width: 1100px;margin:auto;">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="xue"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="yuwen"
          label="语文">
        </el-table-column>
        <el-table-column
          prop="yinyu"
          label="英语">
        </el-table-column>
        <el-table-column
          prop="shuxue"
          label="数学">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handleUpdates(scope.$index)" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="handleClick(scope.$index)" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <Close :dialogVisible="dialogVisible" @Closes="closes" @Closess="Closess"></Close>
      <Remove ref="updata" :fromdata="fromdata" @updata="updata"></Remove>
    </div>
</template>

<script>
  import Close from "./Close"
  import Remove from "./Remove"
    export default {
      name: "Body",
      props:["tableData"],
      data(){
          return{
            dialogVisible:false,
            index:0,
            fromdata:{},
            isShow:false
          }
      },
      methods: {
        handleClick(row) {
          this.dialogVisible = true;
          this.index = row
        },
        closes(remove){
            if(remove){
                let {xue} = this.tableData[this.index]
                this.$axios.post("/api/remove",{xue}).then((res)=>{
                if(res.data.errer){
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  this.$emit("Click")
                }else{
                  this.$message({
                    showClose: true,
                    message: '该用户不存在，无法删除',
                    type: 'error'
                  });
                }
              })
            }
          this.dialogVisible = false;
        },
        Closess(){
          this.dialogVisible = false;
        },
        handleUpdates(index){
          this.isShow = true;
          this.fromdata = this.tableData[index]
          this.$refs.updata.handelClicks()
        },
        updata(index,updatas){
          if(index){
            this.$axios.post("/api/updata",updatas).then((res)=>{
              if(res.data.errer){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }else{
                this.$message({
                  showClose: true,
                  message: '修改失败',
                  type: 'error'
                });

              }
            })
          }
          this.isShow = false;
        }
      },
      components:{
        Close,
        Remove
      }
    }
</script>

<style scoped>

</style>
