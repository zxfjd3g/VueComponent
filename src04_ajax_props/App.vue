<template>
  <div class="container">
    <Search :setSearchName="setSearchName"/>
    <Main :searchName="searchName"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Main from './components/Main'
  import Search from './components/Search'
  export default {

    data () {
      return {
        searchName: ''
      }
    },

    methods: {
      setSearchName (searchName) {
        this.searchName = searchName
      }
    },

    components: {
      Main,
      Search
    }
  }
</script>

<style scoped>
 
</style>
