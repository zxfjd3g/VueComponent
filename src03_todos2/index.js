import Vue from 'vue'
import App from '@/App'
import PubSub from 'pubsub-js'
import Header from '@components/Header'
import List from '@components/List'
import Footer from '@components/Footer'

// 在 入口js中引入的样式对所有组件界面都有效
import './base.css'  // 引入多个组件都可能需要的样式

//不在console中输出production的提示
Vue.config.productionTip = false

// 将PubSub挂到Vue的原型对象上, 这样所有的组件都可见
Vue.prototype.$PubSub = PubSub 

// 注册全局组件
Vue.component('Header', Header)
Vue.component('List', List)
Vue.component('Footer', Footer)

// 创建一个新的vm对象, 作为全局事件总线对象保存到Vue的原型对象上
// Vue.prototype.$globalEventBus = new Vue()

new Vue({
  beforeCreate () { // this是vm对象, 而且执行的相对比较早
    Vue.prototype.$globalEventBus = this // 当前vm对象保存为事件总线
  },

  render: h => h(App)
}).$mount('#root')