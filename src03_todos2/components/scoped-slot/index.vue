<template>
  <div>
    <!-- 
      需求:
        在显示个todo的内容时, 如果todo已经完成, 需要显示特定样式效果的文本内容
        具体的效果不由todo-list内部来决定, 而todo-list外部使用者来决定

    -->
    <todo-list :todos="todos">
      <!-- 
        slotProps: 包含接收到的子组件(todo-list)通过slot标签传递过来的属性
        slotProps: {todo: {id, text, isCompleted}}
      -->
      <template slot-scope="slotProps">
        <!-- 内部的内容会传递给todo-list组件内部的每个slot -->
        <span style="color: red" v-if="slotProps.todo.isComplete">{{slotProps.todo.text}}</span>
      </template>
    </todo-list>

    <br>
    <br>
    <todo-list :todos="todos">
      <template slot-scope="slotProps">
        <span style="color: blue" v-if="slotProps.todo.isComplete">{{slotProps.todo.text}}✓</span>
      </template>
    </todo-list>

  </div>
</template>

<script type="text/ecmascript-6">
  import TodoList from './todo-list'
  export default {
    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: true},
          {id: 3, text: 'CCC', isComplete: false}
        ]
      }
    },

    components: {
      TodoList
    }
  }
</script>

<style scoped>

 
</style>
