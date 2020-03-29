<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckAll"/>
    </label>
    <span>
      <span>已完成{{completedSize}}</span> / 全部{{todos.length}}
    </span>
    <button 
      class="btn btn-danger" 
      v-show="completedSize>0" 
      @click="deleteCompletedTodos"
    >
      清除已完成任务
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      todos: Array,
      deleteCompletedTodos: Function,
      selectAll: Function,
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
    }
  }
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
} 
</style>
