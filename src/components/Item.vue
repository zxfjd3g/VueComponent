<template>
  <li class="list-group-item">
    <div class="handle">
      <a href="javascript:;" @click="deleteItem">删除</a>
    </div>
    <p class="user"><span>{{comment.username}}</span><span>说:</span></p>
    <p class="centence">{{comment.content}}</p>
  </li>
</template>

<script type="text/ecmascript-6">
  export default {
    // 声明接收属性
    props: { // 指定接收属性的属性名和属性值的类型
      comment: Object, 
      deleteComment: Function,
      index: Number
    },

    methods: {
      deleteItem () {
        // 提示确定框, 点击确定后进入
        if (window.confirm('你确定删除此评论吗?')) {
          // 删除评论
          this.deleteComment(this.index)
        }
      }
    }
  }
</script>

<style scoped>
  li {
    transition: .5s;
    overflow: hidden;
  }

  .handle {
    width: 40px;
    border: 1px solid #ccc;
    background: #fff;
    position: absolute;
    right: 10px;
    top: 1px;
    text-align: center;
  }

  .handle a {
    display: block;
    text-decoration: none;
  }

  .list-group-item .centence {
    padding: 0px 50px;
  }

  .user {
    font-size: 22px;
  }
</style>