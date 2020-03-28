import Vue from 'vue'
// import App from './App.vue'
import App from '@/App'

// console.log('App', App) 

Vue.config.productionTip = false

new Vue({
  // el: '#root',
  /* 
  根据引入的App组件配置生成一个组件函数 => 注册组件(指定组件标签名) ==> 创建组件的实例对象返回 
    ==> 最终将App组件对象的界面渲染到el对应的页面元素上
  */
  render: h => h(App)
}).$mount('#root')