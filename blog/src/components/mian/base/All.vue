<template id="">
  <router-link to="/index/details" tag="div" class="body-content">
    <div class="body-content-img">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
    <div class="body-contents">
      <span>作者:张三</span><span>2019年7月26日14:15:05</span>
      <p>
        这是一段文字
      </p>
    </div>
  </router-link>
</template>

<script>
    export default {
        name: "All"
    }
</script>

<style scoped>
  .body-content{
    display: flex;
    background-color: #fff;
    border-radius: 2px;
    margin-bottom: 5px;
    padding:10px;
    border: 1px solid #ccc;
    cursor: pointer;
    transition:0.5s;
  }
  .body-content:hover{
    box-shadow: 0 0 10px #ccc;
  }
  .body-content-img{
    height:40px;
    margin-top:5px;
  }

  .body-contents>p{
    padding:10px 0px;
    margin: 0px;
  }
</style>
