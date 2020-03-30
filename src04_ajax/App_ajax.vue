<template>
  <div>
    <p v-if="!repoName">正在请求中...</p>
    <p v-else>
      most star repo is 
      <a :href="repoUrl">{{repoName}}</a>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {

    data () {
      return {
        repoName: '',
        repoUrl: ''
      }
    },

    /* 
    执行异步操作: 发送ajax请求/绑定监听/订阅消息/启动定时器
    */
    mounted () {
      // 使用vue-resource发送异步ajax请求
      const url = 'https://api.github.com/search/repositories?q=v&sort=stars'
      /* this.$http.get(url)
        .then(response => {
          const result = response.data
          // console.log(result)
          const {name, html_url} = result.items[0]
          this.repoName = name
          this.repoUrl = html_url
        })
        .catch(error => {
          alert('请求出错')
        }) */
      
      // 使用axios发送异步ajax请求
      axios.get(url)
        .then(response => {
          const result = response.data
          // console.log(result)
          const {name, html_url} = result.items[0]
          this.repoName = name
          this.repoUrl = html_url
        })
        .catch(error => {
          alert('请求出错222')
        })
    }
  }
</script>

<style scoped>

 
</style>
