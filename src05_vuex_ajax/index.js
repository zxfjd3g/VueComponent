import Vue from 'vue'
import App from './App' // 引入自定义组件
import store from './store'


new Vue({

  render: h => h(App),

  store, // 所有组件都能通过$store看到store对象
}).$mount('#root')