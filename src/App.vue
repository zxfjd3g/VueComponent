<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- <header />  -->  <!-- 组件标签写成小写时, 一定不能与html的标签名重名 -->
      <Header :add-todo="addTodo"/> 
      <list :todos="todos" :deleteTodo="deleteTodo"/>
      <Footer :todos="todos" :deleteCompletedTodos="deleteCompletedTodos" :selectAll="selectAll"/>
      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        todos: [
          {id: 1, title: '吃饭', completed: false},
          {id: 3, title: '睡觉', completed: true},
          {id: 5, title: '打代码', completed: false}
        ]
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
