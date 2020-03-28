<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- <header />  -->  <!-- 组件标签写成小写时, 一定不能与html的标签名重名 -->
      <Header :add-todo="addTodo"/> 
      <list :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo"/>
      <Footer :todos="todos" :deleteCompletedTodos="deleteCompletedTodos" :selectAll="selectAll"/>
      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      // 读取local中保存的todos, 如果没有null, 此时应该指定为一个[]
      // 读取到todos数据原本是一个json字符串, 需要解析为js
      const todos = JSON.parse(localStorage.getItem('todos_key')) || []
      console.log('data()', todos)
      return {
        todos
      }
    },

    methods: {
      /* 
      向todos第一位添加todo
      */
      addTodo (todo) {
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
