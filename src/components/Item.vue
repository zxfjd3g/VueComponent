<template>
  <li class="list-group-item">
    <div class="handle">
      <a href="javascript:;" @click="deleteItem">删除</a>
    </div>
    <p class="user"><span>{{comment.username}}</span><span>说:</span></p>
    <p class="centence">{{comment.content}}</p>
    <p class="centence">{{sex}}</p>
    <!-- <input type="text"> -->
  </li>
</template>

<script type="text/ecmascript-6">
  export default {
    // 声明接收属性
    props: { // 指定接收属性的属性名和属性值的类型
      comment: Object, 
      deleteComment: Function,
      index: Number,
      sex: { // 指定属性的属性名/属性值的类型 / 默认属性值 / 是否必须的
        type: Number,
        default: 1, // 一般在不是必须时使用
        required: true,  // 即使指定default值, 也必须传递标签属性
      }
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