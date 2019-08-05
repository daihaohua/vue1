<template id="">
  <div class="grid-content bg-purple">
    <el-table
    :data="tableData"
    border>
    <el-table-column
      prop="_id"
      label="_id">
    </el-table-column>
    <el-table-column
      prop="name"
      label="列表名">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" @click="handelUpdate(scope.$index)" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="handelRemove(scope.$index)" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-row :gutter="20" id="page">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-button-group>
            <el-button type="primary" icon="el-icon-arrow-left" @click="pageClickLeft">上一页</el-button>
          </el-button-group>
        </div>
      </el-col>
      <el-col :span="8" :offset="7">
        <div class="grid-content bg-purple">
          {{this.page+1}}/{{this.pages}}
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-button-group>
            <el-button type="primary" id="button" @click="pageClickRight">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>
    <Update ref="xx"></Update>
  </div>
</template>

<script>
  import Update from "./Update"
    export default {
        name: "List",
      data(){
        return{
          tableData:[],
          page:0,
          pages:0
        }
      },
     computed:{
          a(){
            return this.$store.state.listData
          },
          c(){
            return this.$store.state.listDates
          }
     },
      watch:{
          a(data){
            let con = {zData:"listData",dDates:"listDates"};
            con.page = this.page
            this.$store.commit("pageClickRigh",con)
          },
          c(data){
            this.tableData = this.$store.state.listDates;
            let {pageOne,pagess} = this.$store.state
            this.page = pageOne;
            this.pages = pagess;
          }
      },
      methods:{
        handelRemove(index){
          let _id = this.$store.state.listDates[index]._id
          this.$axios.post("/api/remove",{_id }).then((data)=>{
            let listRemove = data.data.data
            this.$store.commit("listClick",listRemove)
          })
        },
        handelUpdate(index){
           this.$refs.xx.headelClose("列表修改",index)
        },
        pageClickRight(){
          this.page = this.page +1
          let con = {zData:"listData",dDates:"listDates"};
          con.page = this.page
          console.log(con)
          this.$store.commit("pageClickRigh",con)
        },
        pageClickLeft(){
          this.page = this.page -1
          let con = {zData:"listData",dDates:"listDates"};
          con.page = this.page
          this.$store.commit("pageClickLeft",con)
        }
      },
      activated(){
        let con = {zData:"listData",dDates:"listDates"};
        con.page = this.page
        this.$store.commit("pageClickLeft",con)
        this.tableData = this.$store.state.listDates;
      },
      components:{
        Update
      }
    }
</script>

<style scoped>
  #button{
    margin-left: 115px;
  }
  #page{
    margin-top:20px;
  }
</style>
