<template>
  <ul>
  <li v-for="todo in todos" :key="todo.id">
    <!-- 将当前todo传递给外部父组件 -->
    <slot :todo="todo">
      {{ todo.text }} 
    </slot>
  </li>
</ul>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['todos']
  }
</script>

<style scoped>

 
</style>
