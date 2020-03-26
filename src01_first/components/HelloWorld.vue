<template>
  <div>
    <h2>{{title}}</h2>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        title: 'HelloWorld组件标题'
      }
    }
  }
</script>

/* scoped: 使样式只对当前组件有效, 不会影响组件外部的界面*/
<style scoped>
h2 {
  color: red;
}
</style>
