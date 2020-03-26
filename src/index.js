// import Vue from 'vue' // 不做特别配置不可以
// import Vue from 'vue/dist/vue.runtime.common' // 与上面等同 不带编译器的版本 // 不可以
// import Vue from 'vue/dist/vue.esm' // 引入带编译器的版本   esm: es6模块  ==>可以

import Vue from 'vue'  // 通过webpack的配置在打包时查找的是dist/vue.esm.js

// import App from './App'
import App from '@/App'
// import HelloWorld from "./components/HelloWorld.vue"
import HelloWorld from "@components/HelloWorld.vue"

// 全局注册组件
Vue.component('HelloWorld2', HelloWorld)

// 全局配置, 指定不输出prodution的提示
Vue.config.productionTip = false


new Vue({
  el: '#root',
  render: h => h(App), //内部会创建一个App组件对象并渲染到el对应的元素上   后面专门讲
  // render: function (createElement) { // 根据指定的组件创建组件标签对象(自动注册)返回并渲染到页面el
  //   return createElement(App) // 返回的是App组件的实例对象
  // }
}) 



/* new Vue({
  el: '#root',
  components: {
    App   // 对象App进行局部注册  ==> 标签名是App
  },
  template: '<App/>' // 内部会将App组件对象渲染el对应的页面上
}) */

/* 
直接在vm上使用components和template配置会报错:
You are using the runtime-only build of Vue where the template compiler is not available. 
Either pre-compile the templates into render functions, or use the compiler-included build
原因: 当前默认使用的vue是一个运行时的版本(不带模板编译器), 它也不使用vue-template-compiler ==> 不能解析'<App/>'
解决: 1. 使用render函数来对模板进行预编译(内部使用vue-template-compiler)   ==> 更好些  打包文件更小些
      2. 引入vue的版本是一个带编译器的版本      ==> 差一些  打包文件更大


*/