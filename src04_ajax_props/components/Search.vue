<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="searchName"/>
      <button @click="search">Search</button>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      setSearchName: Function
    },

    data () {
      return {
        searchName: ''
      }
    },

    methods: {
      search () {
        // 得到输入数据searchName
        const searchName = this.searchName.trim()
        if (searchName) {
          // 调用setSearchName将searchName传递给父组件
          this.setSearchName(searchName)
        }
        
      }
    }
  }
</script>

<style scoped>

 
</style>
