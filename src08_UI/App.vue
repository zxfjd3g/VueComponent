<template>
  <div class="app">
    <el-button type="primary">主要按钮</el-button>
    <el-button type="danger" @click="handleDelete">警告按钮(删除)</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      handleDelete () {
        console.log(this)
        /*
          this.$confirm(): 显示确认框
          this.$message(): 显示提示
        */

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  }
</script>

<style scoped>
.app {
  margin: 20px;
}
</style>
