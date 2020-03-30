<template>
  <div>
    <h2 v-if="firstView">请输入关键字进行搜索</h2>
    <h2 v-else-if="loading">正在请求中</h2>
    <h2 v-else-if="errorMsg">{{errorMsg}}</h2>
    <div class="row" v-else>
      <div class="card" v-for="user in users" :key="user.username">
        <a :href="user.url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.username}}</p>
      </div>
    </div>
  </div>

  
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
    props: {
      searchName: String   // 一旦传了新的searchName, 说明我点击了Search组件的搜索按钮 ==> 应该去发请求
    },
    data () {
      return {
        firstView: true, // 是否显示第一个界面
        loading: false, // 是否显示请求loading中的界面
        errorMsg: '', // 请求出错需要显示的提示文本
        users: [], // 搜索请求匹配出的用户数组
      }
    },

    watch: {
      searchName (value) { // 监视searchName的变化, 一旦改变了立即发送ajax请求
        // 更新界面(请求中)
        this.firstView = false
        this.loading = true
        // 发送异步ajax请求
        // https://api.github.com/search/users?q=aa
        axios({
          url: 'https://api.github.com/search/users',
          params: {
            q: value
          }
        }).then(response => { // 如果成功了, 更新界面(请求成功)
          // 取出请求返回的数据中的users数据
          let items = response.data.items
          const users = []
          items.forEach(item => {
            users.push({
              username: item.login,
              avatar_url: item.avatar_url,
              url: item.html_url
            })
          })
          /* 
          如果不理解查看MDN文档作为扩展处理
          const users = items.map(item => ({
            username: item.login,
            avatar_url: item.avatar_url,
            url: item.html_url
          })) */

          // 更新数据
          this.loading = false
          this.users = users

        }).catch(error => { // 如果失败了, 更新界面(请求失败)
          this.loading = false
          this.errorMsg = '请求出错: ' + error.message
        })
        

        
      }
    }
  }
</script>

<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: .75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: .75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>
