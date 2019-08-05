<template id="">
  <el-dropdown>
    <span class="el-dropdown-link">
      列表<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click="handelData">添加列表</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
    export default {
        name: "ListClick"
    }
</script>

<style scoped>

</style>
