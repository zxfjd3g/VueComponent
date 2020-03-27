import Vue from 'vue'
import App from '@/App'
import Header from '@components/Header'
import List from '@components/List'
import Footer from '@components/Footer'

// 在 入口js中引入的样式对所有组件界面都有效
import './base.css'  // 引入多个组件都可能需要的样式

//不在console中输出production的提示
Vue.config.productionTip = false

// 注册全局组件
Vue.component('Header', Header)
Vue.component('List', List)
Vue.component('Footer', Footer)

new Vue({
  render: h => h(App)
}).$mount('#root')