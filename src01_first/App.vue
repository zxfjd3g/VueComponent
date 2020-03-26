<template>
  <!-- vue组件的模板只能有一个根标签 -->
  <div>
    <h2>{{title}}</h2>
    <img class="logo" src="./assets/imgs/logo.png" alt="logo">
    <hr>
    <!-- 使用局部组件标签 -->
    <HelloWorld />
    <hello-world />
    <!-- 使用全局组件标签 -->
    <HelloWorld2 />
    <HelloWorld2 />
  </div>
</template>

<script>
  // 引入组件
  import HelloWorld from './components/HelloWorld'
  /* 向外默认暴露一个配置对象 */
  export default {
    data () {
      return {
        title: 'App组件标题'
      }
    },
    // 注册组件(局部注册, 只在当前组件内可用)
    components: { // 可以注册多个
      HelloWorld // 指定组件标签名为HelloWorld, 写标签名可以大写也可以小写
    }
  }
</script>

<style>
  .logo {
    width: 300px;
    height: 300px;
  }
</style>