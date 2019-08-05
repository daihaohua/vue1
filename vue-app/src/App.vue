
<template>
  <div id="app">
    <Header @Click="Clickdata"></Header>
    <Body :tableData="tableData" @Click="Clickdata"></Body>
  </div>
</template>

<script>
  import Header from "./components/Header"
  import Body from "./components/Body"
export default {
  name: 'App',
  data(){
    return{
      tableData:[]
    }
  },
  async created(){
    let {data} =  await this.$axios.get("/api/data")
    this.tableData = data
  },
  components:{
      Header,
      Body
  },
  methods:{
    async Clickdata(){
      console.log(1)
     let {data} =  await this.$axios.get("/api/data")
      this.tableData = data
    }
  }
}
</script>

<style>

</style>
