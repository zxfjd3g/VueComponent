<template>
  <div class="col-md-4">
    <form class="form-horizontal">
      <div class="form-group">
        <label>用户名</label>
        <input type="text" class="form-control" placeholder="用户名" v-model="username">
      </div>
      <div class="form-group">
        <label>评论内容</label>
        <textarea class="form-control" rows="6" placeholder="评论内容" v-model="content"></textarea>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <input type="submit" class="btn btn-default pull-right" 
            @click.prevent="submit" value="提交"></input>
        </div>
      </div>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

    props: {
      addComment: Function, // 指定属性名和属性值的类型
    },

    data () {
      return { // 初始v-model需要用的data数据
        username: '',
        content: ''
      }
    },

    methods: {
      /* 提交/添加评论 */
      submit () {
        // 收集得到输入的数据: username/content
        const username = this.username.trim()
        const content = this.content.trim()

        // 如果没有输入内容或输入的是空格, 直接结束, 不添加
        if (!username || content==='') {
          return
        }

        // 封装成comment对象
        const comment = {
          username,
          content
        }

        // 调用addComment来向父组件添加一个comment对象
        this.addComment(comment)

        // 清除输入数据
        this.username = ''
        this.content = ''
      }
    }
  }
</script>

<style scoped>

 
</style>
