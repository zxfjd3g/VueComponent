<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对Vue的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <!-- <Add :addComment="addComment"/> -->
      <!-- <add :addComment="addComment"/> -->
      <comment-add :addComment="addComment"/>
      <!-- 向组件标签传函数属性(属性值为函数) -->
      <!-- <CommentAdd :addComment="addComment"/>   -->
      
      <!-- 通过强制数据绑定向组件内部传递动态的标签属性 -->
      <List :my-comments="comments" :deleteComment="deleteComment"/>
      <!-- <List :my-comments="comments" /> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Add from './components/Add'
  import List from './components/List'
  export default {

    data () {
      return {
        comments: [
          {id: 1, username: 'A', content: 'Vue还不错'},
          {id: 2, username: 'B', content: 'Vue挺好用'},
          {id: 4, username: 'C', content: 'Vue好像有点难'},
          {id: 5, username: 'D', content: 'Vue好像有点难22'},
        ]
      }
    },

    methods: {
      /* 
      添加评论
      */
      addComment (comment) {
        this.comments.unshift(comment) // 将传入的评论对象添加到数组的最前面显示
      },

      /* 
      删除指定下标的评论
      */
      deleteComment (index) {
        this.comments.splice(index, 1)
      }


    },

    components: {
      // Add,
      // add: Add,
      // CommentAdd: Add,
      commentAdd: Add,
      List,
    }
  }
</script>

<style scoped>

 
</style>
