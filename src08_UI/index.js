import Vue from 'vue'
// import ElementUI from 'element-ui' // 完整引入elment-ui定义的所有组件 (element-ui/lib/element-ui.common.js)
// import 'element-ui/lib/theme-chalk/index.css'  // 引入总主题样式

import App from '@/App'
import './elements'  // 引入包含element-ui引入的模块

// 声明使用这个vue的ui插件
// Vue.use(ElementUI)  // 所有的组件都会被注册好, 并在Vue原型对象添加一些方法， 后面可以直接使用


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#root')

/*
对element-ui组件库进行按需要引入打包:
完整引入打包: 7.5M
按需引入打包: 2.9M
*/