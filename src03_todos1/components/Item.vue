<template>
  <li :style="{background: bgColor}" @mouseenter="handleEnter(true)" 
    @mouseleave="handleEnter(false)">
    <label>
      <input type="checkbox" v-model="isCheck"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteItem">删除</button>
  </li>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      todo: Object,
      deleteTodo: Function,
      index: Number,
      updateTodo: Function
    },
    
    data () {
      return {
        bgColor: 'white',
        isShow: false
      }
    },

    computed: {
      // 是否勾选
      isCheck: {
        get () {
          return this.todo.computed
        },

        set (value) { // value: 标识当前勾选状态的boolean值
          // this.todo.computed = value  // 可以有效果, 但不合规范
          this.updateTodo(this.todo, value)
        }
      }
    },

    methods: {
      handleEnter (isEnter) {
        if (isEnter) { // 进入
          this.bgColor = '#ccc'
          this.isShow = true
        } else { // 离开
          this.bgColor = '#fff'
          this.isShow = false
        }
      },

      deleteItem () {
        const {title} = this.todo
        if (window.confirm(`确定删除${title}吗?`)) {
          this.deleteTodo(this.index)
        }
      }
    }
  }
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

/*footer*/
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
