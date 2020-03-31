// import '@babel/polyfill'  // 一上来先加载这个包  => 处理async/await
import Vue from 'vue'
import App from '@/App'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

// 声明使用vue插件
Vue.use(VueResource) // 安装此插件  ==> 给所有组件对象都添加一个$http属性对象(发ajax请求)

new Vue({
  beforeCreate () {
    // 将最外层当前vm对象作为全局事件总线保存
    Vue.prototype.$bus = this
  },

  render: h => h(App)
}).$mount('#root')

