<template>
  <div class="col-md-8">
    <h3 class="reply">评论回复：</h3>
    <h2 v-show="MyComments.length===0">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group">
      <Item v-for="(comment, index) in MyComments" :key="comment.id" :comment="comment" :deleteComment="deleteComment" :index="index" :sex="1"
      />
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Item from './Item'
  export default {
    // 组件内部要想得到传递的标签属性, 必须声明接收
    // 接收的所有标签属性都会自动成为组件对象的属性
    props: ['MyComments', 'deleteComment'], // 指定接收属性的属性名
    /* props: {
      MyComments: Array,  // 指定接收属性的属性名和属性值类型
      deleteComment: Function
    }, */
    /* props: { 
      MyComments: { // 指定接收属性的属性名/属性值的类型/是否是必须/默认
        type: Array,
        required: true,
        default: []
      }
    }, */

    components: {
      Item: Item
    }
  }
</script>

<style scoped>
  .reply {
    margin-top: 0px;
  }
</style>