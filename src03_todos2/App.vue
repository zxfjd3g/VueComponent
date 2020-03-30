<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- <header />  -->  <!-- 组件标签写成小写时, 一定不能与html的标签名重名 -->
      <!--
        在父组件中给子组件标签对象绑定自定义事件监听
        给Header组件标签对象(也就是组件对象)绑定自定义事件监听
        事件名: addTodo
        回调函数: addTodo(todo)
       -->
      <!-- <Header @addTodo="addTodo"/>  -->
      <Header ref="header" /> 
      <list :todos="todos" />
      <Footer>
        <template slot="left">
          <input type="checkbox" v-model="isCheckAll"/>
        </template>

        <button 
          class="btn btn-danger" 
          v-show="completedSize>0" 
          @click="deleteCompletedTodos"
          slot="right"
        >
          清除已完成任务
        </button>

        <span>
          <span>已完成{{completedSize}}</span> / 全部{{todos.length}}
        </span>
      </Footer>
      
    </div>

    <hr>

    <ScopedSlot />

  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import ScopedSlot from './components/scoped-slot'
  // import PubSub from 'pubsub-js'
  export default {
    data () {
      // 读取local中保存的todos, 如果没有null, 此时应该指定为一个[]
      // 读取到todos数据原本是一个json字符串, 需要解析为js
      const todos = JSON.parse(localStorage.getItem('todos_key')) || []
      // console.log('data()', todos)
      return {
        todos
      }
    },

    /* 
    在此执行异步操作: 绑定自定义事件监听/启动定时器/发ajax请求
    */
    // beforeMount () {
    mounted () {
      /* 验证vm与组件对象的关系 */
      console.log('组件对象', this)
      console.log('vm对象', this.$root)
      console.log(this.__proto__.__proto__===this.$root.__proto__)  // 组件对象的爷爷就是vm对象的爸爸
      const ComponentFn = Vue.extend({})
      // debugger

      /* 
      const obj = {m: 1}
      const obj2 = Object.create(obj)  // obj2的原型对象就是obj
      console.log(obj2, obj) 
      结论: Object.create(): 用来创建指定对象的子对象
      */

      /* 
      结论: 
          组件函数的原型对象的原型对象是Vue的原型对象
          组件对象的原型对象的原型对象就是vm的原型对象
          组件对象的爷爷就是vm对象的爸爸

      Vue.extend = function () {
        this是Vue, 也就是Super是Vue
        var Super = this;
        
        定义的组件函数, VueComponent/Sub
        var Sub = function VueComponent (options) {
          this._init(options);
        };

        创建Vue原型对象的子对象, 并指定为组件函数的原型对象
        Sub.prototype = Object.create(Super.prototype);

        返回组件函数
        return Sub
      }
      */



      // 给App组件对象绑定了addTodo事件监听  ==> 没有效果
      /* this.$on('addTodo', function (todo) {
        console.log('----')
        this.addTodo(todo)
      }) */

      // 必须给Heder组件标签对象绑定addTodo事件监听
      /* this.$refs.header.$on('addTodo', function (todo) { // 有问题, this是Header组件对象
        console.log('++++', this)
        this.addTodo(todo)
      }) */
      /* this.$refs.header.$on('addTodo', (todo) => { // 没有问题, this用的是mounted()的this
        console.log('++++', this)
        this.addTodo(todo)
      }) */
      this.$refs.header.$once('addTodo', this.addTodo) // 可以, 代码可简洁
      // 原因: methods中所有方法的this都已经通过bind强制指定了函数中的this为当前组件对象

      // 通过全局事件总线绑定事件监听
      this.$globalEventBus.$on('deleteTodo', this.deleteTodo)
      this.$globalEventBus.$on('deleteTodo', () => {  // 同一个事件名上绑定多个回调函数, 分发时都会调用
        console.log('deleteTodo calback()')
      })

      // 订阅消息, 返回消息的标识token
      /* 
      PubSub.subscribe('updateTodo', (msgName, data) => {
        this.updateTodo(data.todo, data.completed)
      }) */
      this.token = this.$PubSub.subscribe('updateTodo', (msgName, {todo, completed}) => {
        this.updateTodo(todo, completed)
      })
    },

    /* 
    在组件对象死亡前执行
    */
    beforeDestroy () {
      // 解绑指定组件对象上的指定名称的自定义事件监听
      this.$refs.header.$off('addTodo')

      // 取消消息订阅
      this.$PubSub.unsubscribe(this.token) // 取消一个
      // this.$PubSub.unsubscribe('updateTodo') // 取消n个同消息名的订阅监视
    },

    computed: {
      /* 
      根据todos来计算已完成的todo的数量
      */
      completedSize () { // 当读取属性值时自动调用返回属性值
        let size = 0
        // 遍历todos, 判断如果已完成, 统计的size加1
        this.todos.forEach(todo => {
          if (todo.completed) {
            size++
          }
        })
        return size
      },

      /* 判断是否需要勾选全选框 */
      isCheckAll: {
        get  () {
          return this.todos.length===this.completedSize && this.completedSize>0
        },

        set (value) {  // 点击全选框, value就是最新的boolean值
          // 更新todos中的所有todo的completed为value
          this.selectAll(value)
          // this.todos.forEach(todo => todo.completed = isCheck)  // 不合规范
        }
      }
    },

    methods: { 
      /* 
      向todos第一位添加todo
      */
      addTodo (todo) {
        console.log('addTodo()', this)
        this.todos.unshift(todo)
      },

      /* 
      删除todos中的某个todo: 根据index指定
      */
      deleteTodo (index) {
        this.todos.splice(index, 1)
      },

      /* 
      删除所有已完成的todo
      */
      deleteCompletedTodos () {
        this.todos = this.todos.filter((todo, index) => !todo.completed)
      },

      /* 
      对所有todo进行全选或全不选
      */
      selectAll (isCheck) {
        this.todos.forEach(todo => todo.completed = isCheck)
      },

      /* 
      用于更新指定todo的completed值
      */
      updateTodo (todo, completed) {
        todo.completed = completed  // todos中就可以看到最的值
      }
    },

    watch: {
      /* 
      一般监视: 
        会调用
          1). 属性值本身发生了改变
          2). 改变数组内部元素
        不会调用
          对象内部的属性
      深度监视: 只要数据本身或内部发生任何变化都会调用
        1). 属性值本身发生了改变
        2). 改变数组内部元素
        3). 对象内部的属性
      */
      /* todos: function (value) {
        console.log('todos', value)
      } */
      todos: {
        deep: true, // 深度监视
        handler (value) { 
          console.log('handler()', value)
          // 保存最新的todos(其json字符串)
          // 不可以, 如果直接保存数组, 内部会调用数组的toString()并保存其返回值(无法复原)
          // window.localStorage.setItem('todos_key', value) 
          window.localStorage.setItem('todos_key', JSON.stringify(value)) 
        },
      }
    },

    components: {
      ScopedSlot
    }
  }
</script>

<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
} 
</style>
